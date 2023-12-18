import { Select, Spin } from 'antd'
import React, { useState } from 'react'
import BookItem from './BookItem'
import { useGetBooks } from '../reactQuery/reactQueryProduct'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchBooksApi } from '../api'
import { formatPrice } from '../share/formatPrice'

const ProductContainer = () => {
  const [order, setOrder] = useState('title_asc')

  const { data, isLoading } = useQuery(['sort', order], () =>
    fetchBooksApi(order)
  )
  const handleChange = (value) => {
    setOrder(value)
  }

  return (
    <div className="my-2 lg:border-none lg:mt-8 h-full flex justify-center ">
      <div className="w-full lg:w-[80%] p-4 md:p-8 bg-white  md:rounded-xl">
        <div className="items-center flex mb-5 gap-4 ">
          <h2>Săp xếp theo: </h2>
          <Select
            defaultValue="Tên sản phẩm A - Z"
            style={{ width: 180 }}
            onChange={handleChange}
            options={[
              { value: 'title_asc', label: 'Tên sản phẩm A-Z' },
              { value: 'title_desc', label: 'Tên sản phẩm Z-A' },
              { value: 'price_asc', label: 'Giá từ thấp tới cao' },
              { value: 'price_desc', label: 'Giá từ cao tới thâp' },
            ]}
          />
        </div>
        <div className=" auto-rows-max grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 overflow-hidden">
          {isLoading && (
            <div className="col-span-5 items-center w-full justify-center">
              <Spin className="w-full" size="large" />
            </div>
          )}
          {data?.map((book) => {
            return (
              <div
                key={book?.id}
                className=" bg-white mt-2 lg:p-2 lg:m-2 rounded-md  transition-all hover:scale-[1.05]"
              >
                <Link
                  className=" w-full h-[320px] flex justify-start items-start flex-col "
                  to={`/book/${book?.id}`}
                >
                  <img className="min-h-[70%] " src={book?.image?.url} alt="" />
                  <div className="px-4 py-1 lg:px-8 ">
                    <h1>{book?.title}</h1>
                    <h2 className="text-gray-400">
                      {formatPrice(book?.price)} vnđ
                    </h2>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductContainer
