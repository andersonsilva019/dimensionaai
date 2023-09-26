'use client'

import { createContext, useContext, useState } from 'react'

interface SizingContextData {
  irradiance: string;
  saveIrradiance: (value: string) => void;
  wp: string;
  saveWp: (value: string) => void;
}

const SizingContext = createContext<SizingContextData>({
  irradiance: '',
  saveIrradiance: () => { },
  wp: '',
  saveWp: () => { }
})

export function SizingContextProvider({ children }: { children: React.ReactNode }) {

  const [irradiance, setIrradiance] = useState('')
  const [wp, setWp] = useState('')

  function saveIrradiance(value: string) {
    setIrradiance(value)
  }

  function saveWp(value: string) {
    setWp(value)
  }

  return (
    <SizingContext.Provider value={{
      irradiance,
      saveIrradiance,
      wp,
      saveWp
    }}>
      {children}
    </SizingContext.Provider>
  )
}

export function useSizing(){
  const context = useContext(SizingContext)

  if(!context){
    throw new Error('useSizing must be used within SizingContextProvider')
  }

  return context
}