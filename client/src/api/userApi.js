import axios from 'axios'

const BASE_URL = 'http://localhost:3001'
// const BASE_URL = 'http://27.118.27.66/'
// const BASE_URL = 'https://project-library-q3go.onrender.com/'
const userApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Content-Type': 'application/json',
  // },
})
export default userApi

userApi.defaults.headers.common['Content-Type'] = 'application/json'
//___________AUTH______________
export const signUpUserFn = async (user) => {
  const { data } = await userApi.post('/user/register', user)
  return data
}

export const loginUserFn = async (user) => {
  const { data } = await userApi.post('/auth/login', user)
  return data
}

export const logoutUserFn = async () => {
  const data = await userApi.post('/auth/logout')
  return data
}
//___________USER______________

export const getAddressFn = async () => {
  const data = await userApi.get('/address')
  return data
}

export const addAddressFn = async (address) => {
  const data = await userApi.post('/address',address)
  return data
}


export const updateAddressFn = async (address) => {
  const data = await userApi.patch('/address',address)
  return data
}


export const updateUserFn = async (user) => {
  const data = await userApi.patch('/user',user)
  return data
}