'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { Input } from './Input'
import { Button } from './Button'

interface ModalAddDeviceProps {
  isOpen: boolean
  closeModal: () => void
}

export function ModalAddDevice({ isOpen, closeModal }: ModalAddDeviceProps) {

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
                  <Input label='Dispositivo' />
                  <Input label='Potência (kW)' />
                  <Input label='Horas em uso' />
                  <Input label='Quantidade' />
                </div>

                <div className="mt-6">
                  <Button>Avançar</Button>
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