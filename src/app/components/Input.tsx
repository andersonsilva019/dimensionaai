'use client'

import React from 'react'
import { useId } from "react";

interface InputProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className,...props }: InputProps, ref) => {

    const id = useId()

    return (
      <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="flex flex-col w-full gap-1 font-bold">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type="text"
        className={`placeholder:text-gray-200 border border-gray-300 rounded-lg p-2 w-full text-gray-500 ${className}`}
        {...props}
      />
    </div>
    )
  }
)

Input.displayName = 'Input'