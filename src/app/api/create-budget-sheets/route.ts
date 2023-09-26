import { getSheets } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const { budget, serviceValue, wpTotal } = await request.json()

  const service = await getSheets()

  await service.spreadsheets.values.update({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'G3',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[budget]]
    },
  })

  await service.spreadsheets.values.update({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'G6',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[serviceValue]]
    },
  })

  const resWpTotal = await service.spreadsheets.values.update({
    spreadsheetId: process.env.SPREADSHEET_ID,
    valueInputOption: 'RAW',
    range: 'B3:B27',
    requestBody: {
      values: Array(25).fill([wpTotal]),
    },
  })


  return NextResponse.json({ ok: true })
}