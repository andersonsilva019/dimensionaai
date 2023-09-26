'use client'

import { useStepForm } from "@/context/StepFormContext"
import { StepOne } from "./StepOne"
import { StepTwo } from "./StepTwo"
import { StepThree } from "./StepThree"
import { StepFour } from "./StepFour"
import { StepFive } from "./StepFive"
import { FormProvider, useForm } from "react-hook-form"
import { z } from 'zod'

const createSizingSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  lat: z.string(),
  lon: z.string(),
  averageAnnualConsumption: z.number(),
  connectionType: z.enum(['monofasica', 'bifasica', 'trifasica']),
  losses: z.object({
    temperature: z.number(),
    incompatibility: z.number(),
    dirt: z.number(),
    cableCC: z.number(),
    cableCA: z.number(),
    inverter: z.number(),
  })
})

export type CreateSizingSchemaType = z.infer<typeof createSizingSchema>

export function FormContent() {

  const methods = useForm<CreateSizingSchemaType>({
    defaultValues: {
      connectionType: 'monofasica',
      losses: {
        temperature: 12.5,
        incompatibility: 1.5,
        dirt: 4.5,
        cableCC: 1,
        cableCA: 1,
        inverter: 4,
      }
    }
  })
  const { step } = useStepForm()

  function onCreateSizing(values: any) {
    console.log(values)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onCreateSizing)} className="w-full">
        {step === 0 && <StepOne />}
        {step === 1 && <StepTwo />}
        {step === 2 && <StepThree />}
        {step === 3 && <StepFour />}
        {step === 4 && <StepFive />}
      </form>
    </FormProvider>
  )
}