import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';


export async function getSheets() {

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
    keyFile: 'credentials.json'
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}