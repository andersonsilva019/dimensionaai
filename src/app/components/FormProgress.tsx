import { FaCheck } from 'react-icons/fa'


const stepsContent = [
  {
    title: 'Cadastro',
    description: 'Realize o processo de cadastro para ter acesso aos recursos da nossa plataforma'
  }, {
    title: 'Coordenadas geográficas do local',
    description: 'Selecione no mapa o local que será realizado a instalação dos painéis solares para obtermos a irradiância média do local',
  }, {
    title: 'Perfil de consumo',
    description: 'É fundamental compreender o seu perfil de consumo para realizar um dimensionamento preciso.'
  }, {
    title: 'Perdas do sistema',
    description: 'É imprescindível compreender as perdas às quais o processo de dimensionamento está submetido, a fim de se alcançar uma dimensionamento mais preciso.'
  }, {
    title: 'Resultado',
    description: 'Observe quais são os requisitos necessários para o dimensionamento com base na sua localização e perfil de consumo.'
  }
]

export function FormProgress() {
  return (
    <div className="flex flex-col justify-between bg-gray-100 h-full py-4 px-12">
      <div>
        <strong>DimensionaAI</strong>
      </div>
      <ul className='flex flex-col'>
        {stepsContent.map(({ title, description }, index) => (
          <li key={title} className="flex items-start gap-4 max-h-20 mb-[47px]">
            <span className='relative w-fit h-fit p-1 rounded-full bg-transparent border-2 border-gray-300'>
              <FaCheck className="text-gray-300" />
              {index !== stepsContent.length - 1 && <div className='absolute top-6 left-[10px] w-[2px] h-[100px] bg-gray-300'/>}
            </span>
            <div>
              <h3 className="text-black-700 text-lg font-bold">{title}</h3>
              <p className="text-gray-300 font-normal">{description}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className='flex justify-between items-center'>
        <strong>DimensionaAI</strong>
        <strong className='text-gray-300 font-normal text-sm'>dimensionaai@gmail.com</strong>
      </div>
    </div>
  )
}