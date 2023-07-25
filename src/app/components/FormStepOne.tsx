'use client'

import { Input } from "./Input";
import { Button } from "./Button";
import { useForm } from "react-hook-form";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function FormStepOne() {

  const { register, handleSubmit } = useForm<IFormValues>()

  function handleFormSubmit(values: IFormValues) {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 items-center w-full max-w-md m-auto mt-12">
      <Input label="Nome" placeholder="Digite seu primeiro nome" {...register('firstName')} />
      <Input label="Sobrenome" placeholder="Digite seus sobrenomes" {...register('lastName')} />
      <Input label="E-mail" placeholder="Digite seu e-mail principal" {...register('email')} />
      <Input label="Telefone" placeholder="Digite seu telefone para contato" {...register('phone')} />
      <Button className="mt-4">Avançar</Button>
    </form>
  )
}