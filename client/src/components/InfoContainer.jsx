import { Button, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PopupEditInfo from './PopupEditInfo'
import { getUserFromLocalStorage } from '../share/localStorage'
import { useGetAddress, useUpdateUse } from '../reactQuery/reactQueryUser'

const InfoContainer = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({})
  const user = getUserFromLocalStorage()
  const [address, setAddress] = useState()
  const { data, isLoading, isError, isSuccess } = useGetAddress()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const { updateUser } = useUpdateUse()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    setInput(user)
    if (isSuccess) {
      setAddress(data?.data)
    }
  }, [data])
  return (
    <div className='flex justify-center mt-12 '>
      <div className='w-3/4 bg-white px-20 py-20 rounded-2xl'>
        <div className='grid-cols-3 grid '>
          <div className='flex justify-end px-3 mb-4'>Tên đăng nhập:</div>
          <p>{input?.username}</p>

        </div>
        <div className='grid-cols-3 grid mb-3'>
          <div className='flex justify-end px-4'>Tên:</div>
          <Input
            id="fullName"
            type="text"
            name="fullName"
            value={input?.fullName}
            onChange={handleChange}
          />

        </div>
        <div className='grid-cols-3 grid mb-4'>
          <div className='flex justify-end px-3'>Email:</div>

          <Input
            id="email"
            type="text"
            name="email"
            value={input?.email}
            onChange={handleChange}
          />
        </div><div className='grid-cols-3 grid mb-4'>
          <div className='flex justify-end px-3'>SĐT:</div>
          <Input
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={input?.phoneNumber}
            onChange={handleChange}
          />
        </div><div className='grid-cols-3 grid mb-4'>
          <div className='flex justify-end px-3'>Địa chỉ:</div>
          <p>{isSuccess && (address?.addressLine + ', ' + address?.ward + ", " + address?.district + ", " + address?.province)}</p>
          <PopupEditInfo className='' />
        </div><div className='flex justify-center '>

        </div>
        <div className='flex justify-center mt-12'>
          <Button type="ghost" className=" bg-red-600 text-white  hover:bg-red-500" onClick={() => updateUser(input)}>Save</Button>

        </div>
      </div>

    </div>
  )
}

export default InfoContainer
