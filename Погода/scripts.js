const api = '8d2b23833b2282cc7e34989c52989413';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');

document.addEventListener('DOMContentLoaded', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            fetch(base)
                .then(response => response.json())
                .then((data) => {
                    const { temp } = data.main;
                    const place = data.name;
                    const { description, icon } = data.weather[0];
                    const { sunrise, sunset } = data.sys;

                    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    iconImg.src = iconURL;
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(2)} °C`;
                    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                });
        });
    }

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value;
        if (city.trim() !== '') {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        } else {
            alert('Please enter a city name');
        }
    });

    function displayWeather(data) {
        weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
    }
    const citySelect = document.getElementById('city-input');

    fetch('https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=8d2b23833b2282cc7e34989c52989413') // здесь вам нужно вставить свой личный ключ API вместо "demo"
        .then(response => response.json())
        .then(data => {
            data.geonames.forEach(city => {
                const option = document.createElement('option');
                option.textContent = `${city.name}, ${city.countryName}`;
                option.value = city.name;
                citySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching city data:', error);
        });
});





