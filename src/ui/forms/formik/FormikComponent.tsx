import { Field, useField } from 'formik'
import React from 'react'

interface Props {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'textarea' | 'number'
  placeholder?: string
  [x: string]: any
}

export function FormikComponent({ label, type, ...props }: Props) {
  const [field, meta] = useField(props)
  return (
    <React.Fragment>
      <label className="label-form">{label}</label>
      {
        ['text', 'number'].includes(type as string) &&
        <input type={type} className="input-form" {...field} {...props}/>
      }
      {
        type === 'textarea' &&
        <textarea className="input-form" {...field} {...props}></textarea>
      }
      {
        meta.touched && meta.error && (
          <span> {meta.error}</span>
        )
      }

    </React.Fragment>
  )
}
