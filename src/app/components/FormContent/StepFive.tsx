'use client'

import { Button } from "../Button";
import { useEffect, useMemo, useState } from "react";
import Select from 'react-select'
import { useStepForm } from "@/context/StepFormContext";
import supabase from "../../../../lib/supabase";
import { FiInfo } from "react-icons/fi";
import { useSizing } from "@/context/IrradianceContext";
import { Input } from "../Input";

type ModelOfPanelType = {
  id: number;
  model: string;
  power: number;
  description: string;
}

type ModelOfPanelOptionType = {
  value: string;
  label: string;
}


export function StepFive() {

  const [modelsOfPanels, setModelsOfPanels] = useState<ModelOfPanelType[]>([])
  const [modelsOfPanelsOptions, setModelsOfPanelsOptions] = useState<ModelOfPanelOptionType[]>([])
  const { next, previous } = useStepForm()
  const { wp } = useSizing()
  const [selectValue, setSelectValue] = useState<string>()
  const [isFinished, setIsFinished] = useState(false)
  const [serviceValue, setServiceValue] = useState('')

  async function onFinish() {
    const modelsOfPanel = modelsOfPanelsOptions.find(model => model.value === selectValue)?.label

    if (!modelsOfPanel) {
      alert('Você precisa selecionar um modelo de painel solar')
      return
    }

    const response = await fetch(`http://localhost:3000/api/get-value-of-panel-and-inverter?modelOfPanel=${modelsOfPanel}`, {
      method: 'GET',
    })

    const { unit_value_panel, value_inverter } = await response.json()

    const budgetValue = (Number(unit_value_panel) * Number(quantityOfPanels)) + Number(value_inverter)

    const responseBudget = await fetch(`http://localhost:3000/api/create-budget-sheets`, {
      method: 'POST',
      body: JSON.stringify({
        budget: Math.round(budgetValue),
        serviceValue,
        wpTotal: Number(wp) * 365,
      })
    })

    const data = await responseBudget.json()

    if (data.ok) {
      setIsFinished(true)
    }
  }

  useEffect(() => {
    async function getModelsOfPanels() {
      const { data } = await supabase.from('panels').select('*')

      if (data) {
        const models = data?.map(model => ({
          id: model.id,
          model: model.model,
          power: model.power,
          description: model.description
        }))

        const options = data?.map(model => ({
          value: model.id,
          label: model.model
        }))

        setModelsOfPanelsOptions(options)

        setModelsOfPanels(models)
      }
    }

    getModelsOfPanels()
  }, [])

  const quantityOfPanels = useMemo(() => {

    const panel = modelsOfPanels.find(model => model.id === Number(selectValue))

    if (!panel) return 0

    const total = (Number(wp) * 1000) / panel?.power

    return total
  }, [wp, modelsOfPanels, selectValue])

  return (
    <div className=" flex flex-col gap-4 items-center w-full max-w-4xl m-auto mt-12 h-full">
      <h2 className="text-black-700 text-4xl font-bold">Resultado</h2>
      <p className="max-w-md text-base text-gray-300 text-center font-normal">
        Observe quais são os requisitos necessários para o dimensionamento com base na sua localização e perfil de consumo
      </p>
      <div className="mt-6 bg-gray-100 w-full p-8 text-center rounded-lg flex flex-col">
        <strong className="text-2xl">Potência de pico ideal: <span className="text-blue-300">{wp} kWp</span></strong>
        <strong className="text-2xl">Potência ideal do inversor: <span className="text-blue-300">{(Number(wp) * 1000) * 1.3} W</span></strong>
        {isFinished && <strong className="text-2xl">
          Análise financeira do projeto: <a className="font-normal text-blue-300 decoration-solid underline" target="_blank" href="https://docs.google.com/spreadsheets/d/1AKaPKM4R6MYJt3kn51h4rDUQdQ-hv9TJeHWUp9f7i9Q/edit?usp=sharing">aqui</a>
        </strong>}
      </div>

      <div className="mt-6 flex items-center w-full justify-between gap-6">
        <label className="font-bold text-black-900 w-full">
          Selecione o modelo de painel solar
          <div className="flex items-center gap-4">
            <Select
              placeholder="Escolha um modelo de painel solar"
              isSearchable={false}
              options={modelsOfPanelsOptions}
              onChange={(e) => setSelectValue(e?.value)}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  width: '320px',
                })
              }}
            />
            <span title={modelsOfPanels.find(model => model.id === 1)?.description}>
              <FiInfo />
            </span>
          </div>
        </label>
        {!!quantityOfPanels && (
          <label htmlFor="qtd-panels" className="flex flex-col w-full gap-1 font-bold">
            Quantidade de painéis solares
            <input value={Math.round(quantityOfPanels)} className='text-gray-500 font-normal  outline-none bg-gray-100 rounded-lg py-1 px-2 max-w-[64px]' type="text" readOnly />
          </label>
        )}
      </div>
      <label className="font-bold text-black-900 w-full flex flex-col">
        Valor do serviço
        {/* <Select placeholder="Escolha um modelo de inversor" className="max-w-[436px]" isSearchable={false} options={modelsOfPanelsOptions} /> */}
        <input
          className="placeholder:text-gray-200 border border-gray-300 rounded-lg p-2 w-full text-gray-500 max-w-xs"
          onChange={e => setServiceValue(e.target.value)}
          value={serviceValue}
          placeholder="Digite o valor do serviço"
        />
      </label>
      <div className="w-full flex items-center gap-4 h-full">
        <button
          className="text-blue-300 py-2 px-4 w-full rounded-lg border border-blue-300"
          onClick={previous}
        >
          Voltar
        </button>
        <Button onClick={onFinish} disabled={isFinished}>Finalizar</Button>
      </div>
    </div>
  )
}