const apiKey = "2aaacbbc621083f30fd71d3cd43828f6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Weather function
async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status === 404){
            alert("City name is not valid");
            document.querySelector(".weather").style.display = "none";
        }
        else{
            await delay(1000);
            let data = await response.json();
            console.log(data);
            // updating the body based in the response

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";

            // updating the images based on the response

            if(data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/cloudy.png";
            }else if(data.weather[0].main === "Clear"){
                weatherIcon.src = "images/clear.png";
            }else if(data.weather[0].main === "Rain"){
                weatherIcon.src = "images/rain.png";
            }else if(data.weather[0].main === "Drizzle"){
                weatherIcon.src = "images/drizzle.png"
            }else if(data.weather[0].main === "Snow"){
                weatherIcon.src = "images/snow.png"
            }else if(data.weather[0].main === "Thunderstorm"){
                weatherIcon.src = "images/thunderstorm.png";
            }

            document.querySelector(".weather").style.display = "block";


        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert("error fetching data...");
        
    }
    
}
    


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);

})
