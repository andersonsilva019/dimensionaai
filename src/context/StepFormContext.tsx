'use client'

import { createContext, useContext, useState } from 'react'

interface StepFormContextData {
  step: number;
  next: () => void;
  previous: () => void;
}

const StepFormContext = createContext<StepFormContextData>({
  step: 1,
  next: () => { },
  previous: () => { }
})

export function StepFormContextProvider({ children }: { children: React.ReactNode }) {

  const [step, setStep] = useState(0)

  function next() {
    setStep(prev => prev + 1)
  }

  function previous() {
    setStep(prev => prev - 1)
  }

  return (
    <StepFormContext.Provider value={{ next, step, previous }}>
      {children}
    </StepFormContext.Provider>
  )
}

export function useStepForm() {
  const context = useContext(StepFormContext)

  if (!context) {
    throw new Error('useStepForm must be used within a StepFormContextProvider')
  }

  return context
}