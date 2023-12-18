import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import authApi, {
  addAddressFN,
  addAddressFn,
  getAddressFn,
  loginUserFn,
  logoutUserFn,
  signUpUserFn,
  updateAddressFN,
  updateAddressFn,
  updateUserFn,
} from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { setUserToLocalStorage } from '../share/localStorage'

export const useRegister = () => {
  const navigate = useNavigate()
  const {
    mutate: registerUser,
    data,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: (input) => {
      return signUpUserFn(input)
    },
    onSuccess: () => {
      toast.success('Register success')
      navigate('/login')
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { registerUser, data, isSuccess, isLoading }
}

export const useLogin = () => {
  const navigate = useNavigate()
  const {
    mutate: loginUser,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (user) => {
      return loginUserFn(user)
    },
    onSuccess: (data) => {
      window.location.reload()
      console.log(data.fullName)
      toast.success('Hello ' + data.fullName)
      // Cookies.set('auth-token', data.token)
      setUserToLocalStorage(data)
      navigate('/')
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { loginUser, isLoading, isError }
}

export const useLogout = () => {
  const {
    mutate: LogoutUser,
    data,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: () => logoutUserFn(),
    onSuccess: () => {
      // Cookies.remove('auth-token')
      toast.success('Logging out....')
    },
  })
  return { LogoutUser, data, isLoading, isError }
}

//

export const useGetAddress = () => {
  const { data, isLoading, isError,isSuccess } = useQuery({
    queryKey: ['address'],
    queryFn: async () => await getAddressFn(),
  })
  return { data, isLoading, isError ,isSuccess}
}

export const useAddAddress = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    mutate: addAddress,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (address) => {
      return addAddressFn(address)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['address'] })
      toast.success("Cập nhật địa chỉ thành công")
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { addAddress, isLoading, isError }
}


export const useUpdateAddress = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    mutate: updateAddress,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (address) => {
      return updateAddressFn(address)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['address'] })
      toast.success("Cập nhật địa chỉ thành công")
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { updateAddress, isLoading, isError }
}

export const useUpdateUse = () => {
  const {
    mutate: updateUser,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (user) => {
      return updateUserFn(user)
    },
    onSuccess: (data) => {
      console.log(data)
      setUserToLocalStorage(data.data)
      toast.success("Cập nhật thông tin thành công")
    },
    onError: (error) => {
      toast.error(
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message[0]
      )
    },
  })
  return { updateUser, isLoading, isError }
}