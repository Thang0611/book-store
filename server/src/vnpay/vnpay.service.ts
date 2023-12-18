import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as querystring from 'qs';
import { OrderService } from 'src/order/order.service';
import { formatToHHmmss, formatToyyyyMMddHHmmss, sortObject } from 'src/shared/utils';
import { Request, Response } from 'express';
import RequestWithUser from 'src/shared/requestWithUser';
import { PaymentStatus } from 'src/order/enum/payment-status.enum';

@Injectable()
export class VnpayService {
  constructor(private configService: ConfigService, private orderService: OrderService) { }
  async createPaymentURL(req, res: Response) {
    try {
      const order = await this.orderService.createOrder(req.user.id)

      const ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

      const tmnCode = this.configService.get<string>('vnp_TmnCode');
      const secretKey = this.configService.get<string>('vnp_HashSecret');
      var vnpUrl = this.configService.get<string>('vnp_Url');
      const returnUrl = this.configService.get<string>('vnp_ReturnUrl');

      const date = new Date();

      const createDate = formatToyyyyMMddHHmmss(date);
      const orderId = order.id
      const amount = req.body.amount;
      // var bankCode = req.body.bankCode;

      const orderInfo = req.body?.orderDescription || "Thanh toan VNPAY";
      const orderType = req.body.orderType;
      var locale = req.body.language;
      if (locale === null || locale === '') {
        locale = 'vn';
      }
      const currCode = 'VND';
      var vnp_Params = {};
      vnp_Params['vnp_Version'] = '2.1.0';
      vnp_Params['vnp_Command'] = 'pay';
      vnp_Params['vnp_TmnCode'] = tmnCode;
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params['vnp_Locale'] = 'vn';
      vnp_Params['vnp_CurrCode'] = currCode;
      vnp_Params['vnp_TxnRef'] = orderId;
      vnp_Params['vnp_OrderInfo'] = orderInfo;
      vnp_Params['vnp_OrderType'] = orderType;
      vnp_Params['vnp_Amount'] = amount * 100;
      vnp_Params['vnp_ReturnUrl'] = returnUrl;
      vnp_Params['vnp_IpAddr'] = ipAddr;
      vnp_Params['vnp_CreateDate'] = createDate;

      vnp_Params = sortObject(vnp_Params);
      const signData = querystring.stringify(vnp_Params, { encode: false });
      const hmac = crypto.createHmac('sha512', secretKey);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
      vnp_Params['vnp_SecureHash'] = signed;
      vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

      return vnpUrl
    } catch (error) {
    }
  }
  async vpnIpn(req, res: Response) {
    console.log("IPN")
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var secretKey = this.configService.get<string>('vnp_HashSecret');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
    const url_success = this.configService.get<string>('payment_success_page')
    const order = await this.orderService.getOrderById(orderId)
    let paymentStatus = PaymentStatus.Pending; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    // let checkOrderId = (orderId === order.id); // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    // let checkAmount = (vnp_Params['vnp_Amount'] / 100 === order.totalPrice); // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) { //kiểm tra checksum
      if (paymentStatus == order.paymentStatus) { //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
        if (rspCode == "00") {
          //thanh cong
          //paymentStatus = '1'
          // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
          this.orderService.updateStatusPayment(orderId, PaymentStatus.Completed)
          return res.redirect(`${url_success}/?payment=true`)
        }
        else {

          //that bai
          //paymentStatus = '2'
          // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
          this.orderService.updateStatusPayment(orderId, PaymentStatus.Failed)
          return res.redirect(`${url_success}/?payment=false`)
        }
      }
    }
    else {
      res.status(200).json({ RspCode: '97', Message: 'Checksum failed' })
    }
  }


  async vnpayReturn(req: RequestWithUser, res: Response) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = this.configService.get<string>('vnp_TmnCode');
    var secretKey = this.configService.get<string>('vnp_HashSecret');

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {

      res.redirect('https://google.com')
    } else {
      res.redirect("https://facebook.com")

    }
  }
}