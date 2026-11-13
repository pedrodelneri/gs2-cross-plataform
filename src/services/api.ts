export const fetchWeatherForecast = async (lat = -23.5489, lon = -46.6388) => {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=America%2FSao_Paulo`);
    const data = await response.json();
 // Formata os dados logo aqui no serviço para deixar a tela (UI) mais limpa
    const days = data.daily.time.slice(0, 5).map((date: string) => date.substring(5)); 
    const temps = data.daily.temperature_2m_max.slice(0, 5);
    
    return { days, temps };
  } catch (error) {
    console.error("Erro no serviço da API de Clima:", error);
    throw error; // Repassa o erro para a tela tratar
  }
};
