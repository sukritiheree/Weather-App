const apiKey = "784c07f1780052c93436bf4bba3c164f";

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    document.getElementById("cityName").innerHTML = city; //user ne joh submit kra usko daalre in place of city name in the welcome to portion
    const response = await fetch(url);
    const data = await response.json();

    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const pressure = data.main.pressure;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const sunRise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunSet = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    const description = data.weather[0].description;

    document.getElementById("temperature").textContent = `${temperature} °C`;
    document.getElementById("temperature2").textContent = temperature;
    document.getElementById("temp-min").textContent = `${tempMin} °C`;
    document.getElementById("temp-max").textContent = `${tempMax} °C`;
    document.getElementById("humidity").textContent = `${humidity} %`;
    document.getElementById("humidity2").textContent = humidity;
    document.getElementById("wind-speed").textContent = `${windSpeed} m/s`;
    document.getElementById("windSpeed2").textContent = windSpeed;
    document.getElementById("sunrise").textContent = sunRise;
    document.getElementById("sunset").textContent = sunSet;
    document.getElementById("pressure").textContent = `${pressure} hPa`;
    document.getElementById("description").textContent = description;
    document.getElementById("feels-like").textContent = `${feelsLike} °C`;
  } catch (error) {
    console.error("Error fetching weather:", error); //console.error use krte jab we dont want js to show an error in red
  }
}
async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      temperature: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    return null; // Or handle the error as needed
  }
}

async function populateFrequentPlacesTable() {
  const cities = [
    "Abu Dhabi",
    "Shanghai",
    "California",
    "Bali",
    "Mussoorie",
    "Jakarta",
  ];
  const tableBody = document.querySelector(".table tbody");

  for (const city of cities) {
    const weatherData = await getWeatherData(city);
    if (weatherData) {
      for (let i = 0; i < tableBody.children.length; i++) {
        const row = tableBody.children[i];
        const cityNameHeader = row.querySelector("th.text-start");
        if (cityNameHeader && cityNameHeader.textContent === city) {
          row.children[1].textContent = `${weatherData.temperature} °C`;
          row.children[2].textContent = `${weatherData.tempMin} °C`;
          row.children[3].textContent = `${weatherData.tempMax} °C`;
          row.children[4].textContent = `${weatherData.humidity} %`;
          row.children[5].textContent = `${weatherData.windSpeed} m/s`;
          break;
        }
      }
    }
  }
}

// Call this function when the page loads
populateFrequentPlacesTable();

submit.addEventListener("click", (e) => {
  e.preventDefault(); //to prevent reload
  const cityInput = document.getElementById("city").value;
  getWeather(cityInput); //user ne kya submit kra
});
getWeather("Delhi"); //by default ye aaega
