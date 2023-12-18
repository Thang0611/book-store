import React from 'react'
import { ListBanner } from '../share/banner'
const BookItem = () => {
  return (
    <div className="flex gap-4 w-full ">
      {ListBanner.map((item) => {
        return (
          <div key={item.id} className="w-ful bg-slate-400">
            <img src={item.img} alt="" className="w-[300px]" />
            <h2 className="pl-4">Tiêu đề</h2>
            <h2 className="pl-4">Giá bán</h2>
          </div>
        )
      })}
    </div>
  )
}

export default BookItem
