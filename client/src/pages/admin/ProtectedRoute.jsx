import React from 'react'
import { getUserFromLocalStorage } from '../../share/localStorage'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const user = getUserFromLocalStorage()
  return user.role === 'admin' ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedRoute
