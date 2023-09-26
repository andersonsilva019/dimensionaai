'use client'

import { FaMap, FaMapMarkerAlt, FaMarker, FaSun } from "react-icons/fa";
import { Button } from "../Button";
import { useStepForm } from "@/context/StepFormContext";
import { Input } from "../Input";
import { useFormContext } from "react-hook-form";
import { CreateSizingSchemaType } from ".";
import supabase from "../../../../lib/supabase";
import { useState } from "react";
import { useSizing } from "@/context/IrradianceContext";
import { Map } from "../Map";


export function StepTwo() {

  const { saveIrradiance } = useSizing()
  const { next, previous } = useStepForm()
  const { register, getValues, setValue } = useFormContext<CreateSizingSchemaType>()
  const [irradiance, setIrradiance] = useState('')


  async function getIrradiance(lat: string, lon: string) {

    const { data } = await supabase.from('irradiances')
      .select('annual')
      .like('lat', `%${Number(lat).toFixed(1)}%`)
      .like('lon', `%${Number(lon).toFixed(1)}%`)
      .limit(10)

    if (data) {
      const annual = data[0]?.annual as string
      setIrradiance(annual)
      saveIrradiance(annual)
    }
  }

  function handleNextStep() {
    if (!irradiance) {
      alert('Você precisa obter a irradiância do local')
      return
    }
    next()
  }

  async function saveLatLonFromGoogleMaps(lat: string, lon: string) {
    setValue('lat', lat)
    setValue('lon', lon)

    await getIrradiance(lat, lon)
  }

  return (
    <div className="flex flex-col gap-4 items-center w-full m-auto mt-12 h-full">
      <h2 className="text-center  text-black-700 text-4xl font-bold">Coordenadas geográficas do local</h2>
      <p className="text-base text-gray-300 text-center font-normal max-w-md">
        Selecione no mapa o local que será realizado a
        instalação dos painéis solares para obtermos a irradiância média do local
      </p>
      <div
        className="flex flex-col gap-4 items-center w-full mt-12"
      >
        <Map saveLatLonFromGoogleMaps={saveLatLonFromGoogleMaps} />
        {/* <Input
          label="Latitude"
          className="w-full"
          placeholder="Digite a latitude do local"
          {...register('lat')}
        />
        <Input
          label="Longitude"
          className="w-full"
          placeholder="Digite a longitude do local"
          {...register('lon')}
        />
        <Button
          onClick={getIrradiance}
        >
          Obter irradiância
        </Button> */}

        <ul className="flex items-center justify-between w-full max-w-[1000px] gap-4">
          {getValues('lat') && (
            <li className="mt-4 w-full flex-1 text-black-700 border border-gray-300 p-2 flex flex-col items-center rounded-lg">
              <strong className="flex items-center gap-2">
                <FaMapMarkerAlt color="#8D99AE" />
                <span className="text-gray-300 font-normal">Latitude</span>
              </strong>
              {getValues('lat')}
            </li>
          )}
          {getValues('lon') && (
            <li className="mt-4 w-full flex-1 text-black-700 border border-gray-300 p-2 flex flex-col items-center rounded-lg">
              <strong className="flex items-center gap-2">
                <FaMapMarkerAlt color="#8D99AE" />
                <span className="text-gray-300 font-normal">Longitude</span>
              </strong>
              {getValues('lon')}
            </li>
          )}
          {irradiance && <li className="mt-4 w-full flex-1 text-black-700 border border-gray-300 p-2 flex flex-col items-center rounded-lg">
            <strong className="flex items-center gap-2">
              <FaSun color="#8D99AE" />
              <span className="text-gray-300 font-normal">Irradiância</span>
            </strong>
            {parseFloat(irradiance) / 1000} kWh/m²
          </li>}
        </ul>
      </div>
      <div className="w-3/4 h-full flex items-center gap-4">
        <button
          className="text-blue-300 py-2 px-4 w-full rounded-lg border border-blue-300"
          onClick={previous}
        >
          Voltar
        </button>
        <Button disabled={!irradiance} onClick={handleNextStep}>Avançar</Button>
      </div>
    </div>
  )
}