'use client'

import { useStepForm } from "@/context/StepFormContext";
import { Button } from "../Button";
import { useFormContext } from "react-hook-form";
import { CreateSizingSchemaType } from ".";
import { useSizing } from "@/context/IrradianceContext";


const typeConnection = {
  monofasica: 30,
  bifasica: 50,
  trifasica: 100
}

export function StepFour() {

  const { register, watch, getValues } = useFormContext<CreateSizingSchemaType>()
  const { previous, next } = useStepForm()
  const { irradiance, saveWp } = useSizing()

  async function handleNextStep() {

    const averageDailyConsumption = ((getValues('averageAnnualConsumption')- typeConnection[getValues('connectionType')]) / 30).toFixed(2)
    const losses = Number(getValues('losses.temperature')) + 
    Number(getValues('losses.incompatibility')) + 
    Number(getValues('losses.dirt')) + 
    Number(getValues('losses.cableCC')) + 
    Number(getValues('losses.cableCA')) + 
    Number(getValues('losses.inverter'))

    const hsp = parseFloat(irradiance) / 1000

    const response = await fetch('/api/sizing', {
      method: 'POST',
      body: JSON.stringify({
        averageDailyConsumption: Number(averageDailyConsumption) ,
        performance: (100 - losses) / 100,
        hsp
      })
    })

    const result = await response.json()

    if(result) {
      saveWp(result.result)
      next()
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-4xl m-auto mt-12">
      <h2 className="text-black-700 text-4xl font-bold">Perdas do sistema</h2>
      <p className="text-base text-gray-300 text-center font-normal">
        Observe quais são os requisitos necessários para o dimensionamento com base na sua localização e perfil de consumo
      </p>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Perdas por temperatura</label>
          <input
            type="range"
            min={7}
            max={18}
            step={0.1}
            className="appearance-none cursor-pointer w-full  bg-transparent"
            {...register('losses.temperature')}
          />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">7%</span>
          <span className="text-gray-300 font-normal">{watch('losses.temperature')}</span>
          <span className="text-gray-300 font-normal">18%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Incompatibilidade elétrica</label>
          <input
            type="range"
            className="appearance-none cursor-pointer w-full  bg-transparent"
            min={1}
            max={2}
            step={0.1}
            {...register('losses.incompatibility')}
          />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">1%</span>
          <span className="text-gray-300 font-normal">{watch('losses.incompatibility')}</span>
          <span className="text-gray-300 font-normal">2%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Acúmulo de sujeira</label>
          <input
            type="range"
            className="appearance-none cursor-pointer w-full  bg-transparent"
            min={1}
            max={8}
            step={0.1}
            {...register('losses.dirt')}
          />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">1%</span>
          <span className="text-gray-300 font-normal">{watch('losses.dirt')}</span>
          <span className="text-gray-300 font-normal">8%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Cabeamento CC</label>
          <input
            type="range"
            className="appearance-none cursor-pointer w-full  bg-transparent"
            min={0.5}
            max={1}
            step={0.1}
            {...register('losses.cableCC')}
          />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">0.5%</span>
          <span className="text-gray-300 font-normal">{watch('losses.cableCC')}</span>
          <span className="text-gray-300 font-normal">1%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Cabeamento CA</label>
          <input
            type="range"
            className="appearance-none cursor-pointer w-full  bg-transparent"
            min={0.5}
            max={1}
            step={0.1}
            {...register('losses.cableCA')}
          />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">0.5%</span>
          <span className="text-gray-300 font-normal">{watch('losses.cableCA')}</span>
          <span className="text-gray-300 font-normal">1%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-black-900">Inversor</label>
          <input
            type="range"
            className="appearance-none cursor-pointer w-full  bg-transparent"
            min={2.5}
            max={5}
            step={0.1}
            {...register('losses.inverter')}
          />
        </div>
        <div className="mt-4 w-full flex items-center justify-between">
          <span className="text-gray-300 font-normal">2.5%</span>
          <span className="text-gray-300 font-normal">{watch('losses.inverter')}</span>
          <span className="text-gray-300 font-normal">5%</span>
        </div>
      </div>
      <div className="w-full flex items-center gap-4">
        <button
          onClick={previous}
          className="text-blue-300 py-2 px-4 w-full rounded-lg border border-blue-300"
        >
          Voltar
        </button>
        <Button onClick={handleNextStep}>Avançar</Button>
      </div>
    </div>
  )
}