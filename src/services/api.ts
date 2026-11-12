src/services/ api.ts 



export const fetchWeatherForecast = async (lat = -23.5489, lon = -46.6388) => {
  try {
    const response = await fetch(https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=America%2FSao_Paulo);
    const data = await response.json();
