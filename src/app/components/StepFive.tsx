'use client'

import { Button } from "./Button";
import { useState } from "react";
import Select from 'react-select'
import { Input } from "./Input";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


export function StepFive() {

  const [inputs, setInputs] = useState('')

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-4xl m-auto mt-12 h-full">
      <h2 className="text-black-700 text-4xl font-bold">Resultado</h2>
      <p className="max-w-md text-base text-gray-300 text-center font-normal">
        Observe quais são os requisitos necessários para o dimensionamento com base na sua localização e perfil de consumo
      </p>
      <div className="mt-6 bg-gray-100 w-full p-8 text-center rounded-lg">
        <strong className="text-2xl">Potência de pico ideal: <span className="text-blue-300">4.32 kWp</span></strong>
      </div>

      <div className="mt-6 flex items-center w-full justify-between gap-6">
        <label className="font-bold text-black-900 w-full">
          Selecione o modelo de painel solar
          <Select placeholder="Escolha um modelo de painel solar" isSearchable={false} options={options} />
        </label>
        <label htmlFor="qtd-panels" className="flex flex-col w-full gap-1 font-bold">
          Quantidade de painéis solares
          <input value="10" className='text-gray-500 font-normal  outline-none bg-gray-100 rounded-lg py-1 px-2 max-w-[64px]' type="text" readOnly />
        </label>
      </div>
      <label className="font-bold text-black-900 w-full">
        Inversor
        <Select placeholder="Escolha um modelo de inversor" className="max-w-[436px]" isSearchable={false} options={options} />
      </label>
      <div className="w-full flex items-center gap-4 h-full">
        <button className="text-blue-300 py-2 px-4 w-full rounded-lg border border-blue-300">Voltar</button>
        <Button>Avançar</Button>
      </div>
    </div>
  )
}