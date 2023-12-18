import { Button, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import Popup from 'reactjs-popup';
import { useAddAddress, useGetAddress, useUpdateAddress } from '../reactQuery/reactQueryUser';

const PopupEditInfo = () => {
  const [input, setInput] = useState()
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const [isExitsAddress, setIsExitsAddress] = useState(false)
  const { UpdateAddress } = useUpdateAddress(false)
  const { data, isLoading, isError, isSuccess } = useGetAddress()
  const { updateAddress } = useUpdateAddress()
  const { addAddress } = useAddAddress()

  const handleUpdateAddress = (e) => {
    e.preventDefault()
    UpdateAddress(input)
  }
  useEffect(() => {
    if (isSuccess) {
      console.log(123)
      setInput(data?.data)
      console.log(data.data)
      setIsExitsAddress(true)
    }
  }, [data])

  return (
    <Popup
      trigger={<Button type="ghost" className=" bg-red-600 text-white  hover:bg-red-500 w-32"> Cập nhật địa chỉ </Button>}
      modal
      nested
    >
      {close => (
        <div className="modal ">
          <div className='flex justify-end'>
            <button className="close mb-8" onClick={close}>
              <IoMdClose className='text-xl' />
            </button>
          </div>
          <div className='flex justify-center mb-3'>
            <label htmlFor="province" className='w-96'>Tỉnh/Thành Phố</label>
            <Input
              id="province"
              type="text"
              name="province"
              value={input?.province}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-center mb-3'>
            <label htmlFor="district" className='w-96'>Quận/Huyện</label>
            <Input
              id="district"
              type="text"
              name="district"
              value={input?.district}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-center mb-3'>
            <label htmlFor="ward" className='w-96'>Xã/Phường</label>
            <Input
              id="ward"
              type="text"
              name="ward"
              value={input?.ward}
              onChange={handleChange}
            />
          </div>
          <div className='flex justify-center mb-3' >
            <label htmlFor="addressLine" className='w-96'>Số nhà, Đường,..</label>
            <Input
              id="addressLine"
              type="text"
              name="addressLine"
              value={input?.addressLine}
              onChange={handleChange}
            />
          </div>




          <div className="actions flex justify-center  mt-8 ">

            <Button
              className="text-white bg-red-600 hover:bg-red-500"
              type='ghost'
              onClick={() => {
                if (isExitsAddress) {
                  updateAddress(input)
                }
                else {
                  addAddress(input)
                }
                close()
              }}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      )}
    </Popup>

  )
}



export default PopupEditInfo
