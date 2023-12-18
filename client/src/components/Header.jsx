import React, { useEffect, useState } from 'react'
import logo from '../assets/fahasa-logo.png'
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { LiaBookSolid } from 'react-icons/lia'
import { RiBillLine } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { FaRegUser } from "react-icons/fa";
import { Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../share/localStorage'
import { searchBookApi } from '../api/bookApi'
import { useQuery } from '@tanstack/react-query'
import Menu from './Menu'
import { useLogout } from '../reactQuery/reactQueryUser'
const { Search } = Input
const Header = () => {
  const navigate = useNavigate()
  const { LogoutUser } = useLogout()
  const [filter, setFilter] = useState(undefined)

  const { data, isLoading } = useQuery(
    ['search', filter],
    () => searchBookApi(filter),
    { enabled: Boolean(filter) }
  )

  const [displayMenu, setDisplayMenu] = useState('translate-x-[100%]')

  const openMenu = () => {
    setDisplayMenu('translate-x-[0]')
  }
  const closeMenu = () => {
    setDisplayMenu('translate-x-[100%]')
  }

  const handleLogout = () => {
    removeUserFromLocalStorage()
    LogoutUser()
    navigate('/login')
  }
  const dataUser = getUserFromLocalStorage()

  const [user, setUser] = useState(dataUser)

  return (
    <div className="relative">
      <div className="h-[7rem] lg:min-h-[8rem] justify-center items-center w-100% bg-white  flex flex-col ">
        <div className="flex h-full w-full justify-center items-center bg-red-600 lg:min-h-[4rem]">
          <Link to={'/'}>
            <img src={logo} alt="logo" className="h-6 md:h-8" />
          </Link>
        </div>
        <div className="flex h-full w-full items-center justify-between px-4  md:px-8 sm:bg-white lg:min-h-[4rem]">
          <div className="group relative  w-full ms:w-[40%] mx-2 lg:mr-20">
            <Search
              size="large"
              className="w-full relative "
              placeholder="Tìm kiếm sách"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
            />
            <div className=" group-focus-within:block hidden absolute  h-auto w-full z-10 bg-white px-3 rounded-b-lg overflow-hidden">
              {data?.length > 0 ? (
                data.map((book) => {
                  return (
                    <Link
                      to={`/book/${book?.id}`}
                      key={book.id}
                      className="w-full  h-20 flex gap-1 mb-2"
                    >
                      <img src={book?.image?.url} alt="" />
                      <div className="flex items-center">{book.title}</div>
                    </Link>
                  )
                })
              ) : (
                <div className="h-8 flex items-center">Không tìm thấy sách</div>
              )}
            </div>
          </div>

          <div className=" hidden lg:flex gap-2  justify-end items-center">
            {user?.role !== 'admin' && (
              <Link
                to={'/book'}
                className="flex flex-col justify-end items-center px-2 w-full  min-w-[6rem]"
              >
                <LiaBookSolid style={{ fontSize: '20px' }} />
                <p>Sách</p>
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link
                className="flex flex-col justify-end items-center px-2 w-full"
                to={'/dashboard'}
              >
                <RxDashboard className="text-[20px]" />
                <p>Dashboard</p>
              </Link>
            )}
            {user?.role === 'user' && (
              <Link
                to={'/order'}
                className="flex flex-col justify-end items-center px-2 w-full min-w-[6rem]"
              >
                <RiBillLine style={{ fontSize: '20px' }} />
                <p className="text-center ">Đơn hàng</p>
              </Link>
            )}
            {user?.role !== 'admin' && (
              <Link
                to={'/cart'}
                className="flex flex-col justify-end items-center px-2 w-full  min-w-[6rem]"
              >
                <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                <p>Giỏ hàng</p>
              </Link>
            )}
            {user && (
              <Link
                to={'/info'}
                className="flex flex-col justify-end items-center px-2 w-full  min-w-[6rem] grow "
              >
                <FaRegUser style={{ fontSize: '20px' }} />
                <p className='text-green-600 grow'>{user.fullName}</p>
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className=" min-w-[8rem] min-h-[2rem] h-full text-lg bg-green-600 text-white hover:bg-teal-600 py-1 px-4 rounded-md"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="min-w-[8rem] min-h-[2rem]  h-full text-lg bg-green-600 text-white hover:bg-teal-600 py-1 px-4 rounded-md"
              >
                Đăng nhập
              </button>
            )}
          </div>
          <div>
            <button
              className="lg:hidden text-xl  flex justify-center items-center px-3 py-3 ml-3"
              onClick={openMenu}
            >
              <MenuOutlined />
            </button>
          </div>
          <Menu
            displayMenu={displayMenu}
            closeMenu={closeMenu}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
