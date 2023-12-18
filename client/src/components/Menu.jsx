import React, { useState } from 'react'
import logo from '../assets/fahasa-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import {
  MenuOutlined,
  CloseOutlined,
  ArrowRightOutlined,
  RightOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { LiaBookSolid } from 'react-icons/lia'
import { RiBillLine } from 'react-icons/ri'
import { getUserFromLocalStorage } from '../share/localStorage'
const Menu = ({ displayMenu, closeMenu, handleLogout }) => {
  const user = getUserFromLocalStorage()
  const navigate = useNavigate()
  return (
    <div
      className={`h-screen w-full md:w-1/2 lg:w-1/4 shadow-xl bg-white z-10 fixed top-0 right-0 transition-all ease-in-out ${displayMenu}`}
    >
      <nav className="flex flex-col p-5">
        <div></div>
        <div className="flex flex-col items-center">
          <div className="py-3 mb-8 flex relative justify-center items-center gap-4  ">
            <button
              className="text-xl absolute right-1 px-4 py4"
              onClick={closeMenu}
            >
              <RightOutlined className="w-full" />
            </button>

            <img src={logo} alt="logo" className="w-[60%]" />
          </div>
          <button
            // to={'/book'}
            onClick={() => {
              navigate('/book')
              closeMenu()
            }}
            className="py-3 hover:bg-slate-200 w-full text-center rounded-xl flex items-center pl-[40%] gap-3"
          >
            <LiaBookSolid style={{ fontSize: '20px' }} />
            Sách
          </button>
          <button
            onClick={() => {
              navigate('/order')
              closeMenu()
            }}
            className="py-3 hover:bg-slate-200 w-full text-center rounded-xl flex items-center pl-[40%] gap-3"
          >
            <RiBillLine style={{ fontSize: '20px' }} />
            Đơn hàng
          </button>
          <button
            onClick={() => {
              navigate('/cart')
              closeMenu()
            }}
            className="py-3 hover:bg-slate-200 w-full text-center rounded-xl flex items-center pl-[40%] gap-3"
          >
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
            Cart
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="py-3 w-3/5 bg-red-500 text-center rounded-xl  items-center  gap-3 mt-6 block"
            >
              Đăng xuất
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="py-3 w-3/5 bg-green-500 text-center rounded-xl  items-center  gap-3 mt-6 block"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Menu
