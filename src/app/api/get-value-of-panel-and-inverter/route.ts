import { getSheets } from '@/lib/googleSheets'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

  // http://localhost:3000/api/get-value-of-panel?modelOfPanel=LG%20NeON%202%20345W

  const { searchParams } = new URL(request.url)

  const modelOfPanel = searchParams.get('modelOfPanel')

  const service = await getSheets()

  const resInverter = await service.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Inversores!B4',
    valueRenderOption: 'UNFORMATTED_VALUE',
  })

  const resModelOfPanel = await service.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Paineis!A7:A11',
  })
  const resValueOfPanel = await service.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Paineis!B7:B11',
    valueRenderOption: 'UNFORMATTED_VALUE',
  })

  const row = resModelOfPanel.data.values?.findIndex((row) => row.includes(modelOfPanel)) ?? 0
  const col = resModelOfPanel.data.values?.[row]?.indexOf(modelOfPanel) ?? 0

  return NextResponse.json({
    unit_value_panel: resValueOfPanel.data.values?.[row][col],
    value_inverter: resInverter.data.values?.[0][0],
  })
}