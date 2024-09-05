let latitude, longitude;

document.getElementById('fetch-location').addEventListener('click', function() {
  getLocation();
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  window.location.href = `weatherPage.html?lat=${latitude}&lon=${longitude}`;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function showMap(lat, lon) {
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyCUH6Jt2EUC3Q4aifTIt68Ho0nh_E12tjs&center=${lat},${lon}&zoom=14`;
  document.querySelector('.map-container iframe').src = mapUrl;
}

function fetchWeatherData(lat, lon) {
    const apiKey = 'AIzaSyCUH6Jt2EUC3Q4aifTIt68Ho0nh_E12tjs'
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('location').innerText = `Location: ${data.timezone}`;
        document.getElementById('wind-speed').innerText = `Wind Speed: ${data.current.wind_speed} km/h`;
        document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity}%`;
        document.getElementById('timezone').innerText = `Time Zone: ${data.timezone}`;
        document.getElementById('pressure').innerText = `Pressure: ${data.current.pressure} hPa`;
        document.getElementById('wind-direction').innerText = `Wind Direction: ${data.current.wind_deg}°`;
        document.getElementById('uv-index').innerText = `UV Index: ${data.current.uvi}`;
        document.getElementById('feels-like').innerText = `Feels like: ${data.current.feels_like}°C`;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
  
  function getLocationAndFetchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon);
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  
  getLocationAndFetchWeatherData();
