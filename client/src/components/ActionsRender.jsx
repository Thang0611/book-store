import { Button } from 'antd'
import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDeleteBook } from '../reactQuery/reactQueryProduct'
const ActionsRender = ({ data }) => {
  const { deleteBook, data: book } = useDeleteBook()
  const navigate = useNavigate()
  return (
    <div className="flex items-center h-full gap-3">
      <Button
        className="bg-blue-600"
        type="primary"
        onClick={() => {
          navigate(`/product/${data.id}`)
        }}
      >
        Sửa
      </Button>
      <Button
        className="bg-red-600 hover:bg-red-500 hover:text-black text-white"
        onClick={() => {
          console.log(book)
          deleteBook(data?.id)
        }}
      >
        Xóa
      </Button>
    </div>
  )
}

export default ActionsRender
