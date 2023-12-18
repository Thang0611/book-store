import React, { useRef } from 'react'
import { ListBanner } from '../share/banner'
import { Carousel } from 'antd'

import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
const Banner = () => {

  const ref = useRef()
  return (
    <div className="flex justify-center lg:mt-5 ">
      <div className="relative w-full lg:w-[80%] lg:rounded-xl overflow-hidden  bg-white ">
        <Carousel
          autoplay
          className="w-full"
          pauseOnHover
          pauseOnDotsHover
          draggable
          ref={ref}
          touchMove
          dots={false}
          adaptiveHeight={true}
        >
          {ListBanner.map((item) => {
            return (
              <div key={item.id} className="w-full ">
                <img src={item.img} alt="" className="w-full" />
              </div>
            )
          })}
        </Carousel>

        <button
          className="absolute top-[50%] left-0 transform -translate-y-1/2"
          onClick={() => ref.current.prev()}
        >
          <LeftOutlined className=" mt-[-50%] hidden lg:w-10 lg:h-10 bg-slate-500/50 rounded-[50%] lg:flex justify-center items-center ml-2" />
        </button>
        <button
          onClick={() => ref.current.next()}
          className="absolute top-[50%] right-0 transform -translate-y-1/2"
        >
          <RightOutlined className="mt-[-50%] hidden lg:w-10 lg:h-10 bg-slate-500/50 rounded-[50%] lg:flex justify-center items-center mr-2" />
        </button>
      </div>
    </div>
  )
}

export default Banner
