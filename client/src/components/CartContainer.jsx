import React, { useEffect, useState } from 'react'
import cartEmpty_img from '../assets/empty-cart.png'
import { BsTrash } from 'react-icons/bs'
import { getUserFromLocalStorage } from '../share/localStorage'
import { Link, useNavigate } from 'react-router-dom'
import {
  useGetCart,
  useRemoveItem,
} from '../reactQuery/reactQueryProduct'
import { formatPrice } from '../share/formatPrice'
import Loading from './Loading'
import { createPaymentUrl } from '../api/paymentApi'
import axios from 'axios'

const CartContainer = () => {
  const navigate = useNavigate()
  const user = getUserFromLocalStorage()
  const { data, isLoading, isError } = useGetCart()
  console.log(data)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  useEffect(() => { }, [data])

  const removeItem = useRemoveItem()
  // const { createOrder, data: dataCart, error } = useCreateOrder()
  const handleCheckout = async () => {  
   const paymentUrlResponse= await createPaymentUrl({ amount: data.totalPrice, orderDescription: 'Thanh toan VNPAY', orderType: '150000' })
    window.location.href = paymentUrlResponse.data
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="mt-8 h-full flex justify-center ">
      <div className="w-full p-2  lg:w-[80%] lg:p-8   md:rounded-xl">
        <h2 className="text-lg">GIỎ HÀNG ({data?.totalItem || 0} sản phẩm)</h2>
        <div className="w-full flex justify-center text-sm lg:text-base">
          {!!data?.totalItem < 1 ? (
            <img className="h-96 " src={cartEmpty_img} alt="" />
          ) : (
            <div className="flex gap-5 w-full">
              <div className="w-full  ">
                <div className="grid grid-cols-10 min-h-[60px] w-ful bg-white px-5 my-5 rounded-xl">
                  <div className="w-full h-full col-span-5  flex justify-center items-center">
                    Sản phẩm
                  </div>
                  <div className="col-span-2  flex justify-center items-center">
                    Số lượng
                  </div>
                  <div className="col-span-2  flex justify-center items-center">
                    Giá bán
                  </div>
                  <div className="col-span-1 items-center"></div>
                </div>
                <div>
                  {data?.items?.map((item) => {
                    // console.log(item)
                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-10 min-h-[120px] w-full bg-white p-5  my-2 rounded-xl "
                      >
                        <Link
                          className=" flex w-full h-full col-span-5 justify-start items-start"
                          to={`/book/${item.book.id}`}
                        >
                          <img
                            className=" max-h-[100px] lg:max-h-[140px] lg:pr-8"
                            src={item.book?.image?.url}
                            alt=""
                          />
                          <div className="h-full pt-4">
                            <p className="pb-4">{item.book.title}</p>
                            <p className="text-gray-500">
                              {formatPrice(item.book.price)} vnđ
                            </p>
                          </div>
                        </Link>
                        <div className="col-span-2  flex justify-center items-center">
                          <p>{formatPrice(item.quantity)}</p>
                        </div>
                        <div className="col-span-2 flex justify-center items-center">
                          <p>{formatPrice(item.subTotalPrice)} vnđ</p>
                        </div>
                        <div className="col-span-1 flex justify-center  items-center">
                          <button
                            onClick={() => {
                              removeItem.mutate(item.id)
                            }}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className=" hidden lg:block bg-white max-h-56 w-[500px] rounded-xl p-5  my-5">
                <div className="w-full flex justify-between border-b-2">
                  <p>Thành tiền</p>
                  <p>{formatPrice(data?.totalPrice)} d</p>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="text-lg">Tổng Số Tiền (gồm VAT)</p>
                  <p className="text-lg text-red-600">
                    {formatPrice(data?.totalPrice)} vnđ
                  </p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="flex w-full text-white text-xl bg-red-600 h-10 justify-center items-center rounded-xl mt-4"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          )}
          <div className="fixed bottom-0  flex justify-end w-screen bg-white border-t-2 h-[4rem] lg:hidden">
            <div className="flex items-center text-sm">
              <p>Thành tiền: </p>
              <p className="text-sm text-red-600">
                {formatPrice(data?.totalPrice)} vnđ
              </p>
            </div>
            <button className="w-1/3 text-white text-base ml-3 items-center bg-red-600">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartContainer
