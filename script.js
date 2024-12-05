
const apiKey = `daeb775ed94a4c6def5fcbb518163cf2`;

async function fetchWeatherData(city){
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if(!response.ok){
            throw new Error("Failed to fetch weather data");
        }
    
        const data = await response.json();
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // console.log(data.visibility);
        // updateWeatherUI(data);
        updateWeatherUI(data);
    }
    catch (error) {
        console.error(error);
    }
}


const cityElement = document.querySelector(".city");
const temprature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");

const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data){
    cityElement.textContent = data.name;
    temprature.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity} %`;
    visibility.textContent = `${data.visibility/1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    const weathericonName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weathericonName}</i>`;
};
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", function (e){
    e.preventDefault();
    
    const city = inputElement.value;
    if(city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition){
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_n",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help";
};
function updateDateTime() {
    const dateTimeElement = document.getElementById("date-time");
    const now = new Date();

    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);

    // Format time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    // Combine date and time
    dateTimeElement.textContent = `${formattedDate} | ${formattedTime}`;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display date and time immediately on page load
updateDateTime();
