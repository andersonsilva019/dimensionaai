import { NextResponse } from 'next/server'
import supabase from '../../../../lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = Number(searchParams.get('lat'))
  const lon = Number(searchParams.get('lon'))
  const { data } = await supabase.from('irradiances')
    .select('annual')
    .like('lat', `%${lat.toFixed(1)}%`)
    .like('lon', `%${lon.toFixed(1)}%`)
    .limit(10)

  return NextResponse.json({ data })
}