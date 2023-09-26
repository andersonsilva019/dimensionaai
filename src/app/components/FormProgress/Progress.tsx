'use client'

import { useStepForm } from "@/context/StepFormContext";
import { FaCheck } from "react-icons/fa";

interface ProgressProps {
  index: number;
  total: number;
}

export function Progress({ index, total }: ProgressProps) {

  const { step } = useStepForm()

  const isActive = (step > index)

  return (
    <span className={`relative w-fit h-fit p-1 rounded-full ${isActive ? 'bg-green-300 border-green-300' : 'bg-transparent border-gray-300'} border-2 `}>
      <FaCheck className={`${isActive ? 'text-white' : 'text-gray-300'}`} />
      {index !== total - 1 && <div className={`absolute top-6 left-[10px] w-[2px] h-[100px] ${isActive ? 'bg-green-300' : 'bg-gray-300'}`} />}
    </span>
  )
}