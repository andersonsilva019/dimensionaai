'use client'

import { Input } from "./Input";
import { Button } from "./Button";
import { useForm, useFormContext } from "react-hook-form";
import { useStepForm } from "@/context/StepFormContext";
import supabase from "../../../lib/supabase";
import { CreateSizingSchemaType } from "./FormContent";

export function FormStepOne() {

  const { register, getValues } = useFormContext<CreateSizingSchemaType>()
  const { next } = useStepForm()

  async function handleNextStep() {

    const email = getValues('email')

    const userAlreadyExists = await supabase.from('users').select('id').eq('email', email)

    if (userAlreadyExists.data) {
      if (userAlreadyExists.data.length > 0) {
        alert(`Usuário com o e-mail ${email} já existe`)
        return
      }
    }
    next()
  }

  return (
    <div className="flex flex-col items-center gap-4 max-h-96 h-full w-full mt-12 pb-12 mb-12">
      <fieldset className="flex w-full max-w-5xl gap-4 flex-col">
        <legend className="text-2xl font-bold mb-4">Dados pessoais</legend>
        <div className="flex gap-4 pl-4">
          <Input label="Nome completo" placeholder="Digite seu primeiro nome" />
          <Input label="E-mail" placeholder="Digite seu e-mail principal" />
          <Input label="Telefone" placeholder="Digite seu telefone para contato" />
        </div>
        <div className="w-full max-w-2xl flex gap-4 pl-4">
          <Input label="CPF" placeholder="Digite um CPF válido" />
          <Input label="RG" placeholder="Digite um RG válido" />
        </div>
      </fieldset>
      <fieldset className="flex w-full max-w-5xl gap-4 flex-col">
        <legend className="text-2xl font-bold mb-4">Endereço</legend>
        <div className="flex gap- pl-4 gap-4">
          <Input label="CEP" placeholder="Digite o CEP" />
          <Input label="Cidade" placeholder="Digite seu o nome da sua cidade" />
          <Input label="Estado" placeholder="Ex: CE" />
        </div>
        <div className="flex gap-4 pl-4">
          <Input label="Logradouro" placeholder="Digite o seu logradouro" />
          <Input label="Bairro" placeholder="Digite o seu bairro" />
          <Input label="Número" placeholder="Digite a numeração da moradia" />
        </div>
        <div className="pl-4">
          <Input label="Complemento" placeholder="Digite um complemento" />
        </div>
      </fieldset>
      <Button className="mt-4 max-w-xs" onClick={handleNextStep}>Avançar</Button>
    </div>
  )
}