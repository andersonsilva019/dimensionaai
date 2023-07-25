interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className ,...props }: ButtonProps) {
  return (
    <button
      className={`w-full bg-blue-300 hover:bg-blue-500 font-bold py-2 px-4 rounded-lg text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}