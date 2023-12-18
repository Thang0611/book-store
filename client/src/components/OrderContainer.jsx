import React, { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { useGetOrder } from '../reactQuery/reactQueryProduct'
import { formatPrice } from '../share/formatPrice'
import Loading from './Loading'
import { getUserFromLocalStorage } from '../share/localStorage'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import orderEmpty from '../assets/order-empty.png'
import { toast } from 'react-toastify'
const OrderContainer = () => {
  const user = getUserFromLocalStorage()
  const navigate = useNavigate()
  const [item, setItem] = useState('1')
  const { data, isError, isLoading } = useGetOrder()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentValue = queryParams.get('payment');

  console.log(data)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    console.log(paymentValue)
    if (paymentValue == 'true') {
      toast.success("Thanh toan thanh cong")
    }
    else if (paymentValue == 'false') {
      toast.error("Thanh toan that bai")
    }

  }, [paymentValue])
  if (isLoading) return <Loading />
  return (
    <div className="lg:mt-8 h-full flex justify-center ">
      <div className=" p-full lg:w-[80%] p-8  md:rounded-xl">
        <h2 className="text-lg mb-4">
          Lịch sử đã đặt ({data?.length || 0} đơn hàng)
        </h2>
        {!!data?.length < 1 ? (
          <div className="w-full flex justify-center">
            {/* <img className="h-96" src={orderEmpty} alt="" /> */}
            <h2 className="text-xl p-5">No item in order</h2>
          </div>
        ) : (
          data?.map((order) => {
            return (
              <div
                key={order.id}
                className="w-full flex justify-center flex-col bg-white p-4  rounded-xl mb-5"
              >
                <div className="flex justify-between border-b-2 border-gray-400">
                  <p>Mã đơn hàng: {order.id}</p>
                  <p className="text-lg text-red-500">
                    {(order.paymentStatus === 'pending' && 'Chua thanh toán') ||
                      (order.paymentStatus === 'failed' && 'Da huy') ||
                      (order.paymentStatus === 'completed' && 'Đã hoàn thành')}
                  </p>
                </div>
                {order.orderItems.map((orderItem) => {
                  console.log(orderItem)
                  return (
                    <div key={orderItem.id} className="flex gap-5 w-full">
                      <div className="w-full  ">
                        <div className="grid grid-cols-10 min-h-[120px] w-full bg-white p-2   border-b-2 border-gray-400">
                          <div className=" flex w-full h-full col-span-8 gap-4 justify-start items-start ">
                            <img
                              className="h-[150px]"
                              src={orderItem?.image}
                              alt=""
                            />
                            <div className="h-full  flex flex-col justify-around">
                              <p>{orderItem.title}</p>
                              <p className="text-gray-500">
                                {formatPrice(orderItem.initPrice)} vnđ
                              </p>
                              <p className="text-gray-500">
                                x {orderItem.quantity}
                              </p>
                            </div>
                          </div>

                          <div className="col-span-2  flex justify-end items-center">
                            {formatPrice(orderItem.subTotalPrice)} vnđ
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex justify-end text-red-500 text-xl mt-2">
                  Thành tiền: {formatPrice(order.totalPrice)} vnđ
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default OrderContainer
