const apiKey = "2aaacbbc621083f30fd71d3cd43828f6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
// Weather display elements
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const feelsLikeElement = document.querySelector(".feels-like");


const weatherImages = {
    Clouds: "images/cloudy.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Snow: "images/snow.png",
    Thunderstorm: "images/thunderstorm.png"
};

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Weather function
async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status === 404){
            alert("City name is not valid");
            weather.style.display = "none";
        }
        else{
            await delay(1000);
            let data = await response.json();
            
            cityElement.innerHTML = data.name;
            tempElement.innerHTML = Math.round(data.main.temp) + "°C";
            humidityElement.innerHTML = data.main.humidity + "%";
            windElement.innerHTML = data.wind.speed + " km/h";
            feelsLikeElement.innerHTML = Math.round(data.main.feels_like) + "°C";

            // updating the images based on the response

            const weatherType = data.weather[0].main;

            if (weatherImages[weatherType]) {
                weatherIcon.src = weatherImages[weatherType];
            }

            weather.style.display = "block";

        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert("error fetching data...");
        
    }
    
}
    


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

})
