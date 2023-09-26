import { NextResponse } from 'next/server'
import supabase from '../../../../lib/supabase'

export async function POST(request: Request) {

  const { averageDailyConsumption, performance, hsp } = await request.json()

  const power = averageDailyConsumption / (performance * hsp)

  return NextResponse.json({
    result: power.toFixed(2)
  })
}