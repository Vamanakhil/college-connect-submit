// utils/nocoApi.js

const BASE_URL = process.env.NOCODB_API_URL; // from .env.local
const API_TOKEN = process.env.NOCODB_API_TOKEN;
const PROJECT = process.env.NOCODB_PROJECT;
const TABLE = process.env.NOCODB_TABLE;

export async function submitToNoCoDB(data) {
  const url = `${BASE_URL}/api/v1/db/data/v1/${PROJECT}/${TABLE}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "xc-token": API_TOKEN,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to submit data to NoCoDB");
  }

  return response.json();
}