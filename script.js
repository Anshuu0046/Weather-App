document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "549891d22c91f78057c3d85fd267e3e3";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBoxBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    // Define a default city
    const defaultCity = "London";

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "kmph";

            // Weather icon logic remains the same
            // ...

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Consider displaying an error message to the user
        }
    }

    searchBoxBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission and page reload
        checkWeather(searchBox.value);
    });

    // Call checkWeather with the default city when the page loads
    checkWeather(defaultCity);
});
