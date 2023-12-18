import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Switch } from 'antd'
import login_img from '../assets/login.jpg'
import { Link } from 'react-router-dom'
import { useRegister } from '../reactQuery/reactQueryUser'

const Register = () => {
  const [input, setInput] = useState()
    const handleChangeInput = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value })
    }
  const handleSwitchChange = (checked) => {
    setInput({ ...input, role: checked ? 'admin' : 'user' })
  }
  const { data, isLoading, isSuccess, registerUser } = useRegister()
  const handleRegister = (e) => {
    console.log(input)
    e.preventDefault()
    registerUser(input)
  }

  return (
    <div className="flex h-screen justify-center items-center bg-slate-200">
      <div className="w-[80%] min-h-[80%] shadow-lg rounded-lg bg-white overflow-hidden grid sm:grid-cols-1 md:grid-cols-5">
        <div className="h-full  capitalize flex flex-col justify-center items-center py-10 col-span-2">
          <h1 className="text-4xl my-3 text-blue-600 font-bold">Register</h1>
          <form className="w-3/4 flex flex-col gap-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="username">username</label>
              <Input
                name="username"
                id="username"
                value={input?.username || ''}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={handleChangeInput}
                value={input?.password || ''}
              />
            </div>
            <div>
              <label htmlFor="passwordCf">Confirm Password</label>

              <Input
                type="password"
                name="passwordCf"
                id="passwordCf"
                onChange={handleChangeInput}
                value={input?.passwordCf || ''}
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <Input
                name="email"
                id="email"
                value={input?.email || ''}
                onChange={handleChangeInput}
              />
            </div>
            <div>
              <label htmlFor="fullName">fullName</label>

              <Input
                name="fullName"
                id="fullName"
                onChange={handleChangeInput}
                value={input?.fullName || ''}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">PhoneNumber</label>

              <Input
                name="phoneNumber"
                id="phoneNumber"
                onChange={handleChangeInput}
                value={input?.phoneNumber || ''}
              />
            </div>
            <div>
              <label htmlFor="isAdmin">Create Admin Account: </label>
              <Switch
                // className="inline-block"
                id="isAdmin"
                onChange={handleSwitchChange}
                className="isAdmin bg-slate-400"
                name="isAdmin"
              />
            </div>
            <Button
              type="primary"
              className="w-full bg-blue-600 mt-3 h-10"
              htmlType="submit"
              disabled={isLoading}
            >
              Register
            </Button>
            <p>
              Allready have an account?
              <Link className="text-blue-600 px-2" to={'/login'}>
                Login
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

export default Register
