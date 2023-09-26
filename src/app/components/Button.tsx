import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge'

type ButtonProps = ComponentProps<'button'> & {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(`
      w-full 
      bg-blue-300 
      hover:bg-blue-500 
      font-bold 
      py-2 
      px-4 
      rounded-lg 
      text-white
      disabled:opacity-50
      disabled:cursor-not-allowed
      disabled:hover:bg-blue-300
      `, className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  )
}