const apiKey = "Your api";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim(); // Remove leading/trailing whitespace
  if (location) {
      fetchWeather(location);
  } else {
      errorMessage.textContent = 'Please enter a city name.';
  }
});


function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  // Show loading spinner
  loadingSpinner.style.display = 'block';

  fetch(url)
      .then((response) => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then((data) => {
          locationElement.textContent = data.name;
          temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
          descriptionElement.textContent = data.weather[0].description;
          errorMessage.textContent = ''; // Clear any previous error message
      })
      .catch((error) => {
          console.error("Error fetching weather data:", error);
          errorMessage.textContent = 'Failed to fetch weather data. Check for typo or you can try again later.';
      })
      .finally(() => {
          // Hide loading spinner regardless of success or failure
          loadingSpinner.style.display = 'none';
      });
}

