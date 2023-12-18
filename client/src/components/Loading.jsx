import { Spin } from 'antd'
import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Spin className="w-full" size="large" />
    </div>
  )
}

export default Loading
