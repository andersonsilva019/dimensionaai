import { Input } from "../Input";
import { Button } from "../Button";
import { FormStepOne } from "../FormStepOne";

export function StepOne() {

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-4 items-center w-full m-auto pt-12 pb-12">
      <h2 className="text-black-700 text-4xl font-bold">Cadastro</h2>
      <p className="text-base text-gray-300 text-center font-normal max-w-md">
        Realize o processo de cadastro para ter acesso aos recursos da nossa plataforma
      </p>
      <FormStepOne />
    </div>
  )
}