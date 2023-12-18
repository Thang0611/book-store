import axios from 'axios'
import { getUserFromLocalStorage } from '../share/localStorage'

const baseURL = 'http://localhost:3001'
// const BASE_URL = 'http://27.118.27.66/'
// const baseURL = 'https://project-library-q3go.onrender.com/'

export const bookApi = axios.create({
  baseURL,
  withCredentials: true,
})

const user = getUserFromLocalStorage()

bookApi.defaults.headers.common['Content-Type'] = 'application/json'

bookApi.interceptors.request.use((config) => {
  config.headers['authorization'] = `Bearer ${user?.token}`
  return config
})

//Book

export const searchBookApi = async (title) => {
  console.log('title')
  console.log(title)
  const { data } = await bookApi.get('/book/find', {
    params: {
      title,
    },
  })
  console.log(data)
  return data
}

export const fetchBooksApi = async (param) => {
  if (param) {
    const [order, sort] = param.split('_')
    const { data } = await bookApi.get('/book', { params: { order, sort } })
    return data
  }
  const { data } = await bookApi.get('/book')
  return data
}

export const getBooksApi = async () => {
  const { data } = await bookApi.get('/book')
  return data
}

export const getBookDetailApi = async (id) => {
  const { data } = await bookApi.get(`/book/${id}`)
  return data
}

export const createBookApi = async (book) => {
  const { data } = await bookApi.post('/book', book)
  return data
}

export const updateBookApi = async (id, book) => {
  const { data } = await bookApi.patch(`/book/${id}`, book)
  return data
}

export const deleteBookApi = async (id) => {
  const { data } = await bookApi.delete(`/book/${id}`)
  return data
}

//Review

export const createReviewApi = async (review) => {
  const { data } = await bookApi.post(`/review`, review)
  return data
}

//Cart
export const getCartApi = async () => {
  console.log()
  const { data } = await bookApi.get(`/cart`)
  return data
}

export const addToCartApi = async (item) => {
  const { data } = await bookApi.post(`/cart`, {
    bookId: item.bookId,
    quantity: item.quantity,
  })
  // console.log(data)
  return data
}
export const updateItemFromCartApi = async (item) => {
  const { data } = await bookApi.patch(`/cart`, item)
  return data
}

export const deleteItemFromCartApi = async (itemId) => {
  const { data } = await bookApi.delete(`/cart/${itemId}`)
  return data
}

// ----------------Order---------------

export const createOrderApi = async () => {
  const { data } = await bookApi.post(`/order`)
  return data
}

export const getOrderApi = async () => {
  const { data } = await bookApi.get(`/order`)
  return data
}
