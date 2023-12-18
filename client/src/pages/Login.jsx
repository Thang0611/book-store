import React, { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import login_img from '../assets/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../reactQuery/reactQueryUser'
import { getUserFromLocalStorage } from '../share/localStorage'
const Login = () => {
  const [input, setInput] = useState()
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const { isLoading, loginUser } = useLogin()

  const handleSubmit = (e) => {
    console.log('login')
    console.log(input)
    e.preventDefault()
    loginUser(input)
  }

  const navigate = useNavigate()
  const user = getUserFromLocalStorage()

  useEffect(() => {
    if (user) {

      navigate('/')
    }
  })

  return (
    <div className="flex h-screen justify-center items-center bg-slate-200">
      <div className="w-[80%] min-h-[80%]  shadow-lg rounded-lg bg-white overflow-hidden grid sm:grid-cols-1 md:grid-cols-5">
        <div className="h-full  capitalize flex flex-col justify-center items-center py-10 col-span-2">
          <h1 className="text-4xl my-3 text-blue-600 font-bold">Login</h1>
          <form className="w-3/4 flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">username</label>
              <Input
                name="username"
                id="username"
                onChange={handleChange}
                value={input?.username || ''}
              />
            </div>

            <div>
              <label htmlFor="password">password</label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={input?.password || ''}
              />
            </div>

            <Button
              type="primary "
              className="w-full bg-blue-600 hover:text-black mt-3 h-10"
              htmlType="submit"
              disabled={isLoading}
            >
              Login
            </Button>

            <p>
              <Link className="text-blue-600 px-2" to={'/register'}>
                Create Account
              </Link>
            </p>
          </form>
        </div>

        <img
          src={login_img}
          alt="login-img"
          className="hidden w-full h-full object-cover md:block md:col-span-3"
        />
      </div>
    </div>
  )
}

export default Login
