import React from 'react'
import logo from '../assets/fahasa-logo.png'
import boCongThuong from '../assets/logo-bo-cong-thuong-da-thong-bao1.png'
import { Link } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import { BsTelephoneFill } from 'react-icons/bs'
import { MailFilled } from '@ant-design/icons'
const Footer = () => {
  return (
    <div className="flex justify-center">
      <div className=" text-sm lg:my-8 p-8 lg:w-4/5  lg:rounded-xl bg-white  grid grid-cols-1 gap-5  md:grid-rows-2 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-1 ">
        <div className="col-span-full lg:col-span-2 ">
          <img src={logo} alt="" className="w-1/2 mb-3 lg:w-1/3" />
          <div>
            <p>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</p>
            <p>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</p>
            <p>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</p>
            <p className="my-2">
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ
              trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả
              Hệ Thống Fahasa trên toàn quốc.
            </p>
          </div>
          <img src={boCongThuong} alt="" className="w-[8rem]" />
        </div>

        <div>
          <h2 className="uppercase font-bold mb-2 text-base">DỊCH VỤ</h2>
          <ul className="flex flex-col  gap-5">
            <li>
              <Link>Điều khoản sử dụng</Link>
            </li>
            <li>
              <Link>Chính sách bảo mật thông tin cá nhân</Link>
            </li>
            <li>
              <Link>Chính sách bảo mật thanh toán</Link>
            </li>
            <li>
              <Link>Giới thiệu Fahasa</Link>
            </li>
            <li>
              <Link>Hệ thống trung tâm - nhà sách</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="uppercase font-bold mb-2 text-base">HỖ TRỢ</h2>
          <ul className="flex flex-col gap-5">
            <li>
              <Link>Chính sách đổi - trả - hoàn tiền</Link>
            </li>
            <li>
              <Link>Chính sách bảo hành - bồi hoàn</Link>
            </li>
            <li>
              <Link>Chính sách vận chuyển</Link>
            </li>
            <li>
              <Link>Chính sách khách sỉ</Link>
            </li>
            <li>
              <Link>Phương thức thanh toán và xuất HĐ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="uppercase font-bold mb-2 text-base">
            TÀI KHOẢN CỦA TÔI
          </h2>
          <ul className="flex flex-col gap-5">
            <li>
              <Link>Đăng nhập/Tạo mới tài khoản</Link>
            </li>
            <li>
              <Link>Thay đổi địa chỉ khách hàng</Link>
            </li>
            <li>
              <Link>Chi tiết tài khoản</Link>
            </li>
            <li>
              <Link>Lịch sử mua hàng</Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-start-3 lg:col-span-full lg:auto-rows-min">
          <h2 className="uppercase font-bold mb-2 text-base">LIÊN HỆ</h2>
          <div className="flex gap-5 flex-col lg:grid lg:grid-cols-3">
            <div className="flex  items-center gap-2">
              <FaLocationDot />
              <p className="block">60-62 Lê Lợi, Q.1, TP. HCM</p>
            </div>

            <div className="flex items-center gap-2">
              <MailFilled />
              <p> cskh@fahasa.com.vn</p>
            </div>
            <div className="flex items-center gap-2">
              <BsTelephoneFill />
              <p> 1900636467</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
