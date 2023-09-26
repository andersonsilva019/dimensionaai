'use client'

import { Switch } from '@headlessui/react'
import { use, useMemo, useState } from 'react'
import { Input } from '../Input'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Button } from '../Button'
import { ModalAddDevice } from './ModalAddDevice'
import { useStepForm } from '@/context/StepFormContext'
import { useFormContext } from 'react-hook-form'
import { CreateSizingSchemaType } from '.'

const columns = [
  'Dispositivo',
  'Potência (kW)',
  'Horas em uso',
  'Quantidade',
  ''
]

export interface IDevices {
  id: number
  device: string
  power: number
  hours: number
  quantity: number
}

export function StepThree() {
  const { previous, next } = useStepForm()
  const [enabled, setEnabled] = useState(false)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const { register, getValues, setValue } = useFormContext<CreateSizingSchemaType>()
  const [devices, setDevices] = useState<IDevices[]>([])

  function closeModal() {
    setIsVisibleModal(false)
  }

  function openModal() {
    setIsVisibleModal(true)
  }

  const total = useMemo(() => {
    return devices.reduce((acc, { power, hours, quantity }) => {
      return acc + power * hours * quantity
    }, 0)
  }, [devices])

  function handleAddDevice(device: IDevices) {
    setDevices([...devices, device])
  }

  function handleRemoveDevice(id: number) {
    setDevices(devices.filter(device => device.id !== id))
  }

  function handleNextStep() {
    const connectionType = getValues('connectionType')
    if (!connectionType) {
      alert('Você precisa selecionar o tipo de conexão')
      return
    }

    if(!enabled) {
      setValue('averageAnnualConsumption', total)
    }

    next()
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center w-full m-auto mt-12 h-full">
        <h2 className="text-center  text-black-700 text-4xl font-bold">Perfil de consumo</h2>
        <p className="text-base text-gray-300 text-center font-normal max-w-md">
          É fundamental compreender o seu perfil de consumo
          para realizar um dimensionamento preciso
        </p>
        <div className="w-3/4 h-full">
          <h4 className="font-bold text-black-700">Tipo de conexão</h4>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                {...register('connectionType')}
                className="flex items-center justify-center appearance-none w-6 h-6 rounded-full border border-blue-300 cursor-pointer before:w-4 before:h-4 before:rounded-full before:flex before:items-center before:justify-center checked:before:bg-blue-300"
                type="radio"
                id="monofasica"
                value='monofasica'
              />
              <label
                htmlFor="monofasica"
                className="text-black-900 font-normal"
              >
                Monofásica
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                {...register('connectionType')}
                className="flex items-center justify-center appearance-none w-6 h-6 rounded-full border border-blue-300 cursor-pointer before:w-4 before:h-4 before:rounded-full before:flex before:items-center before:justify-center checked:before:bg-blue-300"
                type="radio"
                id="bifasica"
                value='bifasica'
              />
              <label
                htmlFor="bifasica"
                className="text-black-900 font-normal">
                Bifásica
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="flex items-center justify-center appearance-none w-6 h-6 rounded-full border border-blue-300 cursor-pointer before:w-4 before:h-4 before:rounded-full before:flex before:items-center before:justify-center checked:before:bg-blue-300"
                {...register('connectionType')}
                type="radio"
                id="trifasica"
                value='trifasica'
              />
              <label
                htmlFor="trifasica"
                className="text-black-900 font-normal">
                Trifásica
              </label>
            </div>
          </div>

          <h4 className="my-4 font-bold text-black-700">Método de análise</h4>
          <div className="flex items-center gap-2 mb-4">
            <Switch
              id='switch'
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? 'bg-blue-300' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <label className='text-black-900 font-normal' htmlFor="switch">Histórico de consumo</label>
          </div>
          {enabled ? <Input className='max-w-xs' {...register('averageAnnualConsumption')} label='Consumo médio anual (em KWh)' /> : (
            <div className='mt-6'>
              <hr className='w-full h-[1px] my-2 bg-blue-300 border-none' />
              <button onClick={openModal} className='ml-auto flex items-center justify-self-en gap-4 bg-blue-300 py-2 px-3 rounded-lg text-sm text-white'>
                <FaPlus /> Adicionar
              </button>

              {devices.length > 0 && (
                <>
                  {/* Table Header */}
                  <div className='grid grid-cols-table py-2 px-4'>
                    {columns.map(column => (
                      <span key={column} className='text-black-900 font-bold'>{column}</span>
                    ))}
                  </div>
                  
                  {/* Table body */}
                  <div className='flex flex-col gap-2 max-h-80 py-4 overflow-y-auto'>
                    {devices.map(({ id, device, hours, power, quantity }) => (
                      <ul key={id} className='text-gray-700 font-normal grid grid-cols-table border border-gray-200 py-2 px-4 rounded-lg'>
                        <li>{device}</li>
                        <li>{power}</li>
                        <li>{hours}</li>
                        <li>{quantity}</li>
                        <li className='justify-self-end cursor-pointer' onClick={() => handleRemoveDevice(id)}><FaTrash color="#D62828" /></li>
                      </ul>
                    ))}
                  </div>

                  {/* Table footer */}
                  <div className='my-4 w-full flex flex-col'>
                    <strong className='ml-auto flex items-center gap-2'>
                      Consumo total (kWh/mês)
                      <input value={total} className='text-gray-500 font-normal text-right outline-none bg-gray-100 rounded-lg py-1 px-2 max-w-[118px]' type="text" readOnly />
                    </strong>
                  </div>
                </>
              )}

            </div>
          )}
          <div className={`w-full flex items-center gap-4 h-auto mt-12`}>
            <button
              className="text-blue-300 py-2 px-4 w-full rounded-lg border border-blue-300"
              onClick={previous}
            >
              Voltar
            </button>
            <Button onClick={handleNextStep}>Avançar</Button>
          </div>
        </div>
      </div>
      <ModalAddDevice
        closeModal={closeModal}
        isOpen={isVisibleModal}
        handleAddDevice={handleAddDevice}
        totalOfDevices={devices.length}
      />
    </>
  )
}