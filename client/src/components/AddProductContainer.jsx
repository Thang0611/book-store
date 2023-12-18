import { Button, Image, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import {
  useCreateBook,
  useGetBook,
  useUpdateBook,
} from '../reactQuery/reactQueryProduct'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserFromLocalStorage } from '../share/localStorage'

const AddProductContainer = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState()
  const [picture, setPicture] = useState(null)
  const [imgData, setImgData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const { id } = useParams()
  const { createBook, isError, isLoading } = useCreateBook()
  const { updateBook } = useUpdateBook(id)
  const { data } = useGetBook(id)
  const user = getUserFromLocalStorage()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    setInput(data)
    if (id) {
      setIsEdit(true)
    }
  }, [data])
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0])
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        setImgData(reader.result)
        setInput((prevState) => ({ ...prevState, image: reader.result }))
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }
  const handleCancel = () => {
    setInput(data)
  }
  const handleUpdate = (id) => {
    const formData = new FormData()
    // formData.append('image', picture)
    formData.append('title', input?.title)
    formData.append('author', input?.author)
    formData.append('publisher', input?.publisher)
    formData.append('category', input?.category)
    formData.append('date', input?.date)
    formData.append('numOfPage', input?.numOfPage)
    formData.append('description', input?.description)
    formData.append('quantity', input?.quantity)
    formData.append('price', input?.price)
    if (!input?.image?.url) {
      formData.append('image', picture)
    }
    updateBook(formData)
  }

  const handleCreateBook = async (input) => {
    console.log(123)
    console.log(input.category)
    const formData = new FormData()

    if (!input.category) {
      formData.append('category', 'anime')
    } else {
      formData.append('category', input?.category)
    }

    formData.append('image', picture)
    formData.append('title', input?.title)
    formData.append('author', input?.author)
    formData.append('publisher', input?.publisher)
    formData.append('date', input?.date)
    formData.append('numOfPage', input?.numOfPage)
    formData.append('description', input?.description)
    formData.append('quantity', input?.quantity)
    formData.append('price', input?.price)
    console.log(input)

    createBook(formData)
  }

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  return (
    <div className="mt-8  flex justify-center">
      <div className="w-4/5  p-8 lg:w-[80%] lg:rounded-xl overflow-hidden bg-white  grid grid-cols-2 gap-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex flex-col gap-1 ">
            <label htmlFor="title" className="">
              Tiêu đề
            </label>
            <Input
              id="title"
              type="text"
              name="title"
              value={input?.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor="author">Tác giả</label>
            <Input
              id="author"
              type="text"
              name="author"
              value={input?.author}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 col-span-2 gap-8">
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="publisher">Nhà xuất bản</label>
              <Input
                id="publisher"
                type="text"
                name="publisher"
                value={input?.publisher}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="category">Thể loại</label>
              <Select
                name="category"
                className="!w-full"
                defaultValue="Anime"
                style={{ width: 120 }}
                onChange={(value) => setInput({ ...input, category: value })}
                options={[
                  { value: 'anime', label: 'Anime' },
                  { value: 'novel', label: 'Tiểu thuyết' },
                  { value: 'horrified', label: 'Kinh dị' },
                  { value: 'detective', label: 'Trinh thám' },
                ]}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 col-span-2 gap-8">
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="date">Ngày xuất bản</label>
              <Input
                id="date"
                type="date"
                name="date"
                value={input?.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="yyyyzz">Số lượng</label>
              <Input
                id="quantity"
                type="number"
                name="quantity"
                value={input?.quantity}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 col-span-2 gap-8">
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="numOfPage">Số trang</label>
              <Input
                id="numOfPage"
                type="number"
                name="numOfPage"
                value={input?.numOfPage}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="price">Giá bán</label>
              <Input
                id="price"
                type="number"
                name="price"
                value={input?.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <label htmlFor="description">Mô tả</label>
            <TextArea
              id="description"
              type="text"
              name="description"
              value={input?.description}
              onChange={handleChange}
            ></TextArea>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center w-full">
            {
              <div className=" flex justify-center items-center w-full my-5">
                <input
                  className="ml-16"
                  type="file"
                  name="file"
                  id="file"
                  accept="image/*"
                  onChange={onChangePicture}
                />
              </div>
            }
            <Image
              className="flex justify-center border-none max-h-[440px] object-contain"
              width={'80%'}
              name="image"
              height={'420px'}
              src={input?.image?.url || input?.image}
              preview={false}
            />

            <div className="flex justify-end py-5 items-center w-full">
              {!isEdit && (
                <Button
                  className="mx-5 bg-red-600 hover:bg-red-500 text-white hover:!text-white"
                  onClick={() => handleCreateBook(input)}
                >
                  Thêm mới
                </Button>
              )}

              {isEdit && (
                <Button
                  className="mx-5 bg-red-600 hover:bg-red-500 text-white hover:!text-white"
                  onClick={() => handleUpdate(id)}
                >
                  Lưu
                </Button>
              )}
              {isEdit && (
                <Button
                  className="mx-5 bg-red-600 hover:bg-red-500 text-white hover:!text-white"
                  onClick={handleCancel}
                >
                  Hủy bỏ
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductContainer
