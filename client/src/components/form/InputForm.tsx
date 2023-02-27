import React from 'react'
import { useForm } from 'react-hook-form'
import { loginInterface } from '../../types/interface'

interface InputProps {
  name: string
  type: string
  placeholder: string
  register: any
  id?: string
}

const Input: React.FC<InputProps> = (props: InputProps) => {

  const { name, type, placeholder, register, id } = props

  console.log(register)

  return (
    <div className="form-group">
      {
        type === 'textarea' ? <textarea {...register} name={name} id={name} placeholder={placeholder} required></textarea>
        : <input {...register} type={type} name={name} id={id} placeholder={placeholder} required />
      }
    </div>
  )
}

export default Input