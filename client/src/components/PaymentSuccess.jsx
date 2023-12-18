import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
const PaymentSuccess = () => {
  return (
    <div className='flex justify-center py-12'>
      <div className='w-3/4 bg-white flex flex-col items-center py-10 item-center gap-3'>
        <FaCircleCheck className='text-3xl  t text-green-600' />
        <p className='font-semibold  text-xl'>Payment succesfull</p>
      </div>
    </div>
  )
}

export default PaymentSuccess