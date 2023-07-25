import { FaMapMarkerAlt, FaSun } from "react-icons/fa";
import { Button } from "./Button";

const cards = [
  {
    title: 'Latitude',
    icon: <FaMapMarkerAlt color="#8D99AE" />,
    value: '-23.5505199'
  },
  {
    title: 'Longitude',
    icon: <FaMapMarkerAlt color="#8D99AE" />,
    value: '-23.5505199'
  },
  {
    title: 'Irradiância',
    icon: <FaSun color="#8D99AE" />,
    value: '-23.5505199'
  }
]

export function StepTwo() {
  return (
    <div className="flex flex-col gap-4 items-center w-full m-auto mt-12 h-full">
      <h2 className="text-center  text-black-700 text-4xl font-bold">Coordenadas geográficas do local</h2>
      <p className="text-base text-gray-300 text-center font-normal max-w-md">
        Selecione no mapa o local que será realizado a
        instalação dos painéis solares para obtermos a irradiância média do local
      </p>
      <div className="w-3/4 bg-gray-100 h-[476px]">MAP</div>
      <ul className="flex items-center justify-between gap-4 w-3/4">
        {cards.map(({ title, icon, value }) => (
          <li key={title} className="flex-1 text-black-700 border border-gray-100 p-2 flex flex-col items-center rounded-lg">
            <strong className="flex items-center gap-2">
              {icon}
              <span className="text-gray-300 font-normal">{title}</span>
            </strong>
            {value}
          </li>
        ))}
      </ul>
      <div className="w-3/4 flex items-center gap-4">
        <button className="text-blue-300 py-2 px-4 w-full rounded-lg border border-blue-300">Voltar</button>
        <Button>Avançar</Button>
      </div>
    </div>
  )
}