import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastProps {
  message: string
  type: string
}

export const notify = (message: string, type: string) => {
  switch(type) {
    case 'success':
      toast.success(message)
      break
    case 'error':
      toast.error(message)
      break
    default:
      toast.error(message)
  }
}

const Toast: React.FC = (props) => {

  const { message, type } = props as ToastProps

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    /> 
  )
}

export default Toast