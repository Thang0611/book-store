import axios from "axios"
const BASE_URL = 'http://localhost:3001'

const paymentApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})
export const createPaymentUrl = async (paymentInfo) => {
  const data = await paymentApi.post('/vnpay/create_payment_url', paymentInfo)
  return data
}
// export const vnpayReturn = async (param) => {
//  return  paymentApi.get(`/vnpay/vnpay_return/?${param}`)
//   // return data
// }
// export const vnpayIPN = async (param) => {
//   const data = await paymentApi.get(`/vnpay/vnpay_ipn${param}`)
//   return data
// }