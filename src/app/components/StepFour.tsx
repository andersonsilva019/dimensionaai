'use client'

import { Button } from "./Button";
import { useState } from "react";

export function StepFour() {

  const [inputs, setInputs] = useState('')

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-4xl m-auto mt-12">
      <h2 className="text-black-700 text-4xl font-bold">Perdas do sistema</h2>
      <p className="text-base text-gray-300 text-center font-normal">
        Observe quais são os requisitos necessários para o dimensionamento com base na sua localização e perfil de consumo
      </p>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Perdas por temperatura</label>
          <input value={inputs} onChange={e => setInputs(e.target.value)} type="range" min={7} max={18} step={0.1} className="appearance-none cursor-pointer w-full  bg-transparent" />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">7%</span>
          <span className="text-gray-300 font-normal">{inputs}</span>
          <span className="text-gray-300 font-normal">18%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Perdas por temperatura</label>
          <input type="range" className="appearance-none cursor-pointer w-full  bg-transparent" />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">1%</span>
          <span className="text-gray-300 font-normal">2%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Acúmulo de sujeira</label>
          <input type="range" className="appearance-none cursor-pointer w-full  bg-transparent" />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">1%</span>
          <span className="text-gray-300 font-normal">8%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Cabeamento CC</label>
          <input type="range" className="appearance-none cursor-pointer w-full  bg-transparent" />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">0.5%</span>
          <span className="text-gray-300 font-normal">1%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Cabeamento CA</label>
          <input type="range" className="appearance-none cursor-pointer w-full  bg-transparent" />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">0.5%</span>
          <span className="text-gray-300 font-normal">1%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Inversor</label>
          <input type="range" className="appearance-none cursor-pointer w-full  bg-transparent" />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">2.5%</span>
          <span className="text-gray-300 font-normal">5%</span>
        </div>
      </div>
      <div className="w-full flex items-center gap-4">
        <button className="text-blue-300 py-2 px-4 w-full rounded-lg border border-blue-300">Voltar</button>
        <Button>Avançar</Button>
      </div>
    </div>
  )
}