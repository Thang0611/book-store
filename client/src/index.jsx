import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools /> */}
      <App />
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  </BrowserRouter>
)
