import React, { useEffect, useState } from 'react'
import { Button, InputNumber, Rate } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { TimestampToDateTime } from '../share/toDateTime'
import {
  useAddToCart,
  useCreateReview,
  useGetBook,
} from '../reactQuery/reactQueryProduct'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserFromLocalStorage } from '../share/localStorage'
import Loading from './Loading'
import { formatPrice } from '../share/formatPrice'
const DetailContainer = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetBook(id)
  const [cartItem, setCartItem] = useState({
    quantity: 1,
    userId: '',
    bookId: '',
  })

  useEffect(() => {
    console.log(cartItem.quantity)
  }, [cartItem])
  const navigate = useNavigate()
  const [review, setReview] = useState({ star: 5, comment: '' })
  const createReview = useCreateReview()
  const user = getUserFromLocalStorage()
  const addToCart = useAddToCart()
  if (isLoading || isError) {
    return <Loading />
  }
  const handleAddToCart = () => {
    if (!user) {
      navigate('/login')
    }
    cartItem.bookId = id
    cartItem.userId = user?.id
    addToCart.mutate(cartItem)
  }
  const handleSendReview = () => {
    review.bookId = id
    review.userId = user?.id
    createReview.mutate(review)
  }
  return (
    <div className="flex items-center my-2 lg:mt-5 flex-col gap-2 lg:gap-5">
      <div className="p-8 w-full lg:w-[80%] lg:rounded-xl overflow-hidden grid grid-cols-1  gap-4 bg-white lg:flex  lg:gap-16 lg:pr-16 ">
        <div className="w-full flex justify-center lg:shrink-0 lg:w-[40%] ">
          <img src={data?.image?.url} alt="" className="h-96" />
        </div>
        <div className="w-full leading-8 text-sm lg:text-base ">
          <h2 className="text-xl lg:text-3xl pb-3">{data?.title}</h2>
          <div className="flex  justify-between ">
            <p>Nhà xuất bản: {`${data?.publisher}`}</p>
            <p>Năm xuất bản: {`${new Date(data?.date).getFullYear()}`}</p>
          </div>

          <div>
            <p className="text-red-700 text-2xl lg:text-3xl py-4">{`${formatPrice(
              data?.price
            )} VNĐ`}</p>
          </div>

          <div className="flex ">
            <p className="basis-36 lg:basis-64">Chính sách đổi trả </p>
            <p>Đổi trả sản phẩm trong 30 ngày</p>
          </div>

          {!(user?.role === 'admin') && (
            <div className="hidden lg:flex ">
              <p className=" basis-36 lg:basis-64">Số lượng: </p>
              <InputNumber
                min="1"
                max="999"
                value={cartItem.quantity}
                onChange={(value) => {
                  setCartItem({ ...cartItem, quantity: value })
                }}
              ></InputNumber>
            </div>
          )}
          {!(user?.role === 'admin') && (
            <div className="hidden lg:block">
              <button
                onClick={handleAddToCart}
                className="bg-red-600 py-3 px-8 rounded-xl mt-6 text-white text-xl hover:bg-red-500"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex fixed bottom-0 z-10 border-t-2 items-center lg:hidden bg-white w-screen h-[4rem] gap-[2px] overflow-hidden">
        <div className="flex gap-5 items-center w-[30%]  justify-center  h-full">
          <button
            onClick={() => {
              if (cartItem.quantity > 1) {
                setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 })
              }
            }}
            className="text-lg h-7 w-7"
          >
            -
          </button>
          <p>{cartItem.quantity}</p>
          <button
            onClick={() => {
              setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 })
            }}
            className="text-lg h-7 w-7"
          >
            +
          </button>
        </div>
        <p
          className="w-[40%] bg-slate-200 flex justify-center items-center h-full"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </p>
        <p
          className="px-4 bg-red-600 w-[30%] flex justify-center items-center h-full"
          onClick={() => {
            handleAddToCart()
            navigate('/cart')
          }}
        >
          Mua hàng
        </p>
      </div>
      <div className="p-8 w-full lg:w-[80%] lg:rounded-xl overflow-hidden bg-white  ">
        <p className="pb-5 font-medium text-xl">Đánh giá</p>
        {user?.role === 'user' && (
          <div className="flex justify-center items-center mb-2 gap-8 lg:mb-8">
            <div className="w-2/3 ">
              <Rate
                className="w-full flex justify-center mb-3"
                id="star"
                // defaultValue={5}
                value={review.star}
                onChange={(value) => setReview({ ...review, star: value })}
              />
              <TextArea
                rows={4}
                minLength={120}
                name="comment"
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, [e.target.name]: e.target.value })
                }
              />
            </div>
            <Button
              type="primary"
              className="bg-blue-600 px-6"
              onClick={handleSendReview}
            >
              Gửi
            </Button>
          </div>
        )}
        {data.reviews?.map((review) => {
          return (
            <div className="" key={review.id}>
              <div className="flex justify-center gap-6">
                {
                  <div className="w-[90%] ">
                    <div className="px-5 py-2 bg-orange-50  mb-3 rounded-lg">
                      <div key={1}>
                        <p className="text-xl font-normal">
                          {review.user.fullName}
                        </p>
                        <p className="text-[12px] text-gray-500">
                          {TimestampToDateTime(review.createAt)}
                        </p>
                        <Rate
                          disabled
                          value={review.star}
                          className="text-[12px] pb-2"
                        />
                        <div className="">
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DetailContainer
