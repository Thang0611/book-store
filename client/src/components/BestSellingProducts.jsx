import React from 'react'
import { Spin } from 'antd'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { useGetBooks } from '../reactQuery/reactQueryProduct.js'
import { formatPrice } from '../share/formatPrice.js'
import { useRef } from 'react'
const BestSellingProducts = () => {
  const windowWidth = useRef(window.innerWidth)
  const windowHeight = useRef(window.innerHeight)
  const { data, isError, isLoading } = useGetBooks()
  console.log(windowWidth, windowHeight)

  const getNumberCart = () => {
    if (windowWidth.current <= 640) {
      return 2
    } else if (windowWidth.current <= 768) {
      return 3
    } else if (windowWidth.current <= 1440) {
      return 4
    } else return 5
  }
  console.log(getNumberCart())

  var settings = {
    infinite: true,
    slidesToShow: getNumberCart(),
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  }
  return (
    <div className="flex w-full justify-center category">
      <div className="lg:mt-8 md:p-8 w-full  lg:w-4/5 bg-white lg:rounded-xl overflow-hidden">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-medium my-4">Sản phẩm bán chạy</h3>
          <div className="w-full py-5  md:px-8   overflow-hidden  bg-emerald-900 md:rounded-lg ">
            {isLoading ? (
              <div className="flex items-center w-full justify-center">
                <Spin size="large" />
              </div>
            ) : (
              <Slider
                {...settings}
                className="flex justify-center items-center"
              >
                {data?.map((book) => {
                  return (
                    <div
                      key={book?.id}
                      className=" bg-white p-2 rounded-md transition-all hover:scale-[1.02]"
                    >
                      <Link
                        className=" w-full h-[300px] flex justify-center items-center flex-col"
                        to={`/book/${book?.id}`}
                      >
                        <img
                          className="min-h-[70%] "
                          src={book?.image?.url}
                          alt=""
                        />
                        <div className="px-3 py-1 w-full ">
                          <h1>{book?.title}</h1>
                          <h2 className="text-gray-400">
                            {formatPrice(book?.price)} vnđ
                          </h2>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </Slider>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default BestSellingProducts
