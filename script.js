document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "549891d22c91f78057c3d85fd267e3e3";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBoxBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "kmph";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        // Check for night weather condition
        const isNight = (data.dt > data.sys.sunset || data.dt < data.sys.sunrise);
        weatherIcon.src = isNight ? "images/night.png" : "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Night") {
        weatherIcon.src = "images/night.png";
    }
}

searchBoxBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    checkWeather(searchBox.value);
});

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: Home(),
//     },

//     {
//         path: "/test",
//         element: Test(),
//     }
// ]);

checkWeather(city);
});
