'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { Input } from '../Input'
import { Button } from '../Button'
import { IDevices } from './StepThree'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ModalAddDeviceProps {
  isOpen: boolean
  closeModal: () => void
  handleAddDevice: (device: IDevices) => void
  totalOfDevices: number
}

const addDeviceSchema = z.object({
  name: z.string().min(3),
  power: z.number(),
  hours: z.number(),
  quantity: z.number(),
})

export function ModalAddDevice({
  isOpen,
  closeModal,
  handleAddDevice,
  totalOfDevices
}: ModalAddDeviceProps) {

  const { register, handleSubmit, reset } = useForm<z.infer<typeof addDeviceSchema>>()

  function handleAddDeviceSubmit(values: z.infer<typeof addDeviceSchema>) {
    handleAddDevice({
      id: totalOfDevices + 1,
      device: values.name,
      power: values.power,
      hours: values.hours,
      quantity: values.quantity
    })
    reset()
    closeModal()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black-900 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="w-full text-right">
                  <button onClick={closeModal}>
                    <AiOutlineClose />
                  </button>
                </Dialog.Title>
                <div className="mt-2 flex flex-col gap-4">
                  <Input label='Dispositivo' {...register('name')} />
                  <Input label='Potência (kW)' {...register('power')} />
                  <Input label='Horas em uso' {...register('hours')} />
                  <Input label='Quantidade' {...register('quantity')} />
                </div>
                <div className="mt-6">
                  <Button onClick={handleSubmit(handleAddDeviceSubmit)}>Adicionar</Button>
                  <button className="text-blue-300 py-2 px-4 w-full mt-2 rounded-lg border border-blue-300">Cancelar</button>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}