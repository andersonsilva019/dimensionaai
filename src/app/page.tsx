import { FormProgress } from "./components/FormProgress/FormProgress";
import { FormContent } from "./components/FormContent";

export default async function Home() {

  
  //const { data } = await supabase.from('irradiances').select('annual').like('lat', '%-5.7%').like('lon', '%-39.0%').limit(10)

  //console.log(data)

  return (
    <div className="grid grid-cols-layout gap-8 w-full h-full">
      <FormProgress />
      <FormContent />
    </div>
  )
}
