import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'react-toastify'

import {
  addToCartApi,
  createBookApi,
  createReviewApi,
  deleteBookApi,
  getBookDetailApi,
  updateBookApi,
} from '../api'
import { useNavigate, useParams } from 'react-router-dom'
import {
  createOrderApi,
  deleteItemFromCartApi,
  getBooksApi,
  getCartApi,
  getOrderApi,
  searchBookApi,
} from '../api/bookApi'
import { getUserFromLocalStorage } from '../share/localStorage'
import { createPaymentUrl } from '../api/paymentApi'
const user = getUserFromLocalStorage()

// ------------------BOOK-----------------------

export const useSearchBook = () => {
  const searchBook = useQuery({
    queryKey: ['bookSearch'],
    queryFn: (search) => searchBookApi(search),
  })
  return searchBook
}

export const useGetBooks = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: async () => await getBooksApi(),
  })
  return { data, isLoading, isError }
}

export const useCreateBook = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    mutate: createBook,
    data,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (book) => {
      console.log(book)
      return createBookApi(book)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success('Thêm sách thành công')
      navigate('/dashboard')
    },
    onError: (error) => {
      console.log(error)
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { createBook, data, isLoading, isError }
}

export const useGetBook = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookDetailApi(id),
  })
  return { data, isLoading, isError }
}

export const useDeleteBook = () => {
  const queryClient = useQueryClient()
  const {
    mutate: deleteBook,
    data,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (id) => {
      return deleteBookApi(id)
    },
    onSuccess: (id) => {
      toast.success('Xóa sách thành công')
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { deleteBook, data, isLoading, isError }
}

export const useUpdateBook = (id) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    mutate: updateBook,
    data,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (book) => {
      console.log(id)
      console.log(book)
      return updateBookApi(id, book)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success('Cập nhật sách thành công')
      navigate('/dashboard')
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { updateBook, data, isLoading, isError }
}

export const useCreateReview = () => {
  const clientQuery = useQueryClient()
  const useCreateReview = useMutation({
    mutationFn: (review) => createReviewApi(review),
    onSuccess: (data) => {
      toast.success(data?.message)
      clientQuery.invalidateQueries({ queryKey: ['book'] })
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return useCreateReview
}

//---------------CART-----------------

export const useGetCart = () => {
  const getCart = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartApi(),
  })
  return getCart
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()
  const navigate=useNavigate()
  const useAddItemToCart = useMutation({
    mutationFn: (item) => {
      addToCartApi(item)
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      // navigate('/cart ')
      toast.success('Đã thêm sản phẩm vào giỏ')
    },
    onError: (error) => {
      console.log(error)
      toast.error('Có lỗi khi thêm vào giỏ hàng')
    },
  })
  return useAddItemToCart
}

export const useRemoveItem = () => {
  const queryClient = useQueryClient()
  const removeItem = useMutation({
    mutationFn: (itemId) => deleteItemFromCartApi(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Xóa sản phẩm thành công')
    },
    onError: () => {
      toast.error('Xóa sản phẩm thất bại')
    },
  })
  return removeItem
}
//------------ORDER------------

export const useGetOrder = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrderApi(),
  })
  return { data, isLoading, isError }
}

// export const useCreateOrder = () => {
//   const queryClient = useQueryClient()
//   const createOrder = useMutation({
//     mutationFn: () => createOrderApi(),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['orders'] })
//       toast.success('create order success')
//     },
//     onError: (error) => {
//       console.log(error)
//       toast.error('Co loi xay ra.')
//     },
//   })
//   return createOrder
// }

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  const {
    mutate: createOrder,
    data,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: () => createOrderApi(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Đặt hàng thành công')
      queryClient.removeQueries(['cart'])
    },
    onError: () => {
      toast.error('Đặt hàng thất bại')
    },
  })
  return { createOrder, data, isLoading, isError }
}


//PAYMENT
