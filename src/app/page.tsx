import supabase from "../../lib/supabase";
import { Button } from "./components/Button";
import { FormProgress } from "./components/FormProgress";
import { StepFive } from "./components/StepFive";
import { StepFour } from "./components/StepFour";
import { StepThree } from "./components/StepThree";
import { StepTwo } from "./components/StepTwo";

export default async function Home() {


  //const { data } = await supabase.from('irradiances').select('annual').like('lat', '%-5.7%').like('lon', '%-39.0%').limit(10)

  //console.log(data)

  return (
    <div className="grid grid-cols-layout gap-8 w-full h-full">
      <FormProgress />
      <div className="p-4 w-full">
        <StepFive />
      </div>
    </div>
  )
}
