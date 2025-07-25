const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBody = document.querySelector('.weather-body');
const locationNotFound = document.querySelector('.location-not-found');

searchButton.addEventListener('click', async () => {
  const location = searchInput.value.trim();
  if (location) {
    try {
      const api_key = "0d633b2c837ccb0a74cbef9fcb0d1ba6";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;


      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`);
      const data = await response.json();
      const weatherIcon = data.weather[0].icon;
      let imageUrl = '';
      switch (weatherIcon) {
        case 'Clouds':
            imageUrl = 'weather-icons/default(3).png';
            break;
        case 'Clear':
            imageUrl= 'weather-icons/default(2).png';
            break;
        case 'Rain':
            imageUrl = 'weather-icons/default.png';
            break;
        case 'Mist':
            imageUrl= 'weather-icons/default(4).png';
            break;
        case 'Snow':
            imageUrl = 'weather-icons/default(5).png';
            break;
            default:
          imageUrl = 'weather-icons/default.png';
      }

      weatherBody.style.display = 'flex';
      weatherBody.innerHTML = `
        <img src="${imageUrl}" alt="${data.weather[0].description}">
        <div class="weather-box">
          <h2 class="temperature">${data.main.temp}°C <sup>°C</sup></h2>
          <p class="description">${data.weather[0].description}</p>
        </div>
        <div class="weather-details">
          <div class="humidity">
            <i class="fa-sharp fa-solid fa-droplet"></i>
            <span class="text">Humidity: ${data.main.humidity}%</span>
          </div>
          <div class="wind">
            <i class="fa-solid fa-wind"></i>
            <span class="text">Wind: ${data.wind.speed} m/s</span>
          </div>
        </div>
      `;
      locationNotFound.style.display = 'none';
    } catch (error) {
      console.error(error);
      locationNotFound.style.display = 'flex';
      weatherBody.style.display='none';
      locationNotFound.innerHTML = `
        <h1>Location not found</h1>
        <img src="404.jpg" alt="Location not found">
      `;
    }
  } else {
    alert('Please enter a location');
  }
});