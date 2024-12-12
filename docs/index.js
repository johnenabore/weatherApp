"use strict";
class Weather {
    constructor() {
        this.cityInput = document.getElementById("text");
        this.apiKey = "442aaf9af77a1d59eb8b81d858ce57d4";
    }
    async getAPI() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput.value}&appid=${this.apiKey}`);
            if (!response.ok) {
                console.log("failed to fetch");
                return;
            }
            const data = await response.json();
            this.updateUI(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    updateUI(data) {
        console.log(data);
        this.setHumid(data);
        this.setCityName(data);
        this.setTempCelsius(data);
        this.setWind(data);
        this.setWeatherEmoticon(data);
        this.setFeelsLike(data);
        this.setCountryName(data);
        this.setSunrise(data);
        this.addZoomEffect('sunRiseSetContainer');
        this.addZoomEffect("emoticonWeather");
        this.addZoomEffect("temp");
        this.addZoomEffect("cityName");
        this.addZoomEffect("humidContainer");
        this.addZoomEffect("windContainer");
        this.addZoomEffect("feelsLikeContainer");
        this.addSlideDownEffect("card");
    }
    addZoomEffect(elements) {
        const element = document.getElementById(elements);
        const dummy = document.getElementById('dummyPrompt');
        dummy.style.display = 'none';
        const bgVideo = document.getElementById("background-video");
        bgVideo.style.display = 'none';
        if (element) {
            element.style.display = "flex";
            element.classList.add("zoom-in");
            element.addEventListener("animationend", () => {
                element.classList.remove("zoom-in");
            });
        }
    }
    addSlideDownEffect(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add("slide-down");
            element.addEventListener("animationend", () => element.classList.remove("slide-down"));
        }
    }
    setTempCelsius(temp) {
        const convertedCelsius = temp.main.temp - 273.15;
        const tempDisplay = document.getElementById("temp");
        tempDisplay.innerHTML = convertedCelsius.toFixed(1) + "℃";
    }
    setCityName(city) {
        const nameDisplay = document.getElementById("cityName");
        nameDisplay.innerHTML = city.name;
    }
    setHumid(humid) {
        const humidDisplay = document.getElementById("humid");
        humidDisplay.innerHTML = humid.main.humidity + "%";
        const humidText = document.getElementById("humidText");
        humidText.innerHTML = "Humidity";
        const humidImage = document.getElementById("humidImage");
        humidImage.src = "images/humid.png";
    }
    setWind(wind) {
        const windDisplay = document.getElementById("wind");
        windDisplay.innerHTML = wind.wind.speed;
        const windSpeedText = document.getElementById("windSpeedText");
        windSpeedText.innerHTML = "Wind Speed";
        const windImage = document.getElementById("windImage");
        windImage.src = "images/wind.png";
    }
    setWeatherEmoticon(data) {
        const displayEmoticon = document.getElementById("emoticonWeather");
        const id = data.weather[0].id;
        const isDaytime = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;
        let emoticon = "";
        if (isDaytime) {
            if (id >= 200 && id <= 299) {
                emoticon = "⛈️";
            }
            else if (id >= 300 && id <= 399) {
                emoticon = "🌧️";
            }
            else if (id >= 500 && id <= 599) {
                emoticon = "🌧️";
            }
            else if (id >= 600 && id <= 699) {
                emoticon = "❄️";
            }
            else if (id >= 700 && id <= 799) {
                emoticon = "🌫️";
            }
            else if (id === 800) {
                emoticon = "🌞";
            }
            else if (id === 801) {
                emoticon = "🌤️";
            }
            else if (id === 802) {
                emoticon = "⛅";
            }
            else if (id === 803) {
                emoticon = "☁️";
            }
            else if (id === 804) {
                emoticon = "☁️";
            }
        }
        else {
            if (id >= 200 && id <= 299) {
                emoticon = "🌩️";
            }
            else if (id >= 300 && id <= 399) {
                emoticon = "🌧️";
            }
            else if (id >= 500 && id <= 599) {
                emoticon = "🌧️";
            }
            else if (id >= 600 && id <= 699) {
                emoticon = "❄️";
            }
            else if (id >= 700 && id <= 799) {
                emoticon = "🌫️";
            }
            else if (id === 800) {
                emoticon = "🌙";
            }
            else if (id === 801) {
                emoticon = "🌙";
            }
            else if (id === 802) {
                emoticon = "🌙";
            }
            else if (id === 803) {
                emoticon = "☁️";
            }
            else if (id === 804) {
                emoticon = "☁️";
            }
        }
        if (displayEmoticon) {
            displayEmoticon.innerHTML = emoticon;
        }
    }
    setFeelsLike(data) {
        const feelsLikeText = document.getElementById("feelsLikeText");
        feelsLikeText.innerHTML = "FEELS LIKE";
        const feelsLikeimg = document.getElementById("feelsLikeimg");
        feelsLikeimg.src = "images/temp.png";
        const feelsLike = document.getElementById("feelsLike");
        const convertedCelsius = data.main.feels_like - 273.15;
        feelsLike.innerHTML = convertedCelsius.toFixed(1) + "°";
        const feelsLikeDescription = document.getElementById("feelsLikeDescription");
        let description = "";
        if (data.main.feels_like >= data.main.temp) {
            description = "It feels warmer than the actual temperature.";
        }
        else if (data.main.feels_like <= data.main.temp) {
            description = "It feels cooler than the actual temperature.";
        }
        else if (data.main.feels_like == data.main.temp) {
            description = "Similar to the actual temparature.";
        }
        if (description) {
            feelsLikeDescription.innerHTML = description;
        }
    }
    async setCountryName(data) {
        const getName = await fetch('codes.json');
        const returnName = await getName.json();
        const countryCode = data.sys.country;
        returnName.forEach((element) => {
            if (countryCode !== element.code) {
                return;
            }
            const displayCountry = document.getElementById('countryName');
            displayCountry.innerHTML = '(' + element.name + ')';
        });
    }
    setSunrise(data) {
        const riseSetimg = document.getElementById('riseSetimg');
        riseSetimg.src = 'images/sunrise.png';
        const sunriseText = document.getElementById('riseSetText');
        sunriseText.innerHTML = 'Sunrise';
        const timeRise = document.getElementById('timeRise');
        const sunriseTimeUTC = data.sys.sunrise * 1000;
        const date = new Date(sunriseTimeUTC);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const readableTime = date.toLocaleTimeString('en-US', options);
        timeRise.innerHTML = readableTime;
        const sunset = document.getElementById("sunset");
        const sunsetTimeUTC = data.sys.sunset * 1000;
        const date2 = new Date(sunsetTimeUTC);
        const readableTime2 = date2.toLocaleTimeString('en-US', options);
        sunset.innerHTML = 'Sunset: ' + readableTime2;
        const PST = document.getElementById('pst');
        PST.innerHTML = '(Philippine Standard Time)';
    }
}
const cityInput = document.getElementById("button");
const weather = new Weather();
if (cityInput) {
    cityInput.addEventListener("click", () => weather.getAPI());
}
