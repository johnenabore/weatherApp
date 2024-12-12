class Weather {
  apiKey: string;
  cityInput: HTMLInputElement;
  constructor() {
    this.cityInput = document.getElementById("text") as HTMLInputElement;
    this.apiKey = "442aaf9af77a1d59eb8b81d858ce57d4";
  }
  async getAPI() {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput.value}&appid=${this.apiKey}`
      );
      if (!response.ok) {
        console.log("failed to fetch");
        return;
      }
      const data = await response.json();
      this.updateUI(data);
    } catch (err) {
      console.log(err);
    }
  }
  updateUI(data: any) {
    console.log(data);
    this.setHumid(data);
    this.setCityName(data);
    this.setTempCelsius(data);
    this.setWind(data);
    this.setWeatherEmoticon(data);
    this.setFeelsLike(data);
    this.setCountryName(data)
    this.setSunrise(data);

    this.addZoomEffect('sunRiseSetContainer')
    this.addZoomEffect("emoticonWeather");
    this.addZoomEffect("temp");
    this.addZoomEffect("cityName");
    this.addZoomEffect("humidContainer");
    this.addZoomEffect("windContainer");
    this.addZoomEffect("feelsLikeContainer");

    this.addSlideDownEffect("card");
  }
  addZoomEffect(elements: any) {
    const element = document.getElementById(elements);
    const dummy = document.getElementById('dummyPrompt') as HTMLInputElement
    dummy.style.display = 'none'
    const bgVideo = document.getElementById("background-video") as HTMLInputElement
    bgVideo.style.display = 'none'

    if (element) {
      element.style.display = "flex";
      element.classList.add("zoom-in");
      element.addEventListener("animationend", () => {
        element.classList.remove("zoom-in");
      });
    }
  }
  addSlideDownEffect(elementId: any) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add("slide-down");
      element.addEventListener("animationend", () =>
        element.classList.remove("slide-down")
      );
    }
  }
  setTempCelsius(temp: any) {
    const convertedCelsius = temp.main.temp - 273.15;
    const tempDisplay = document.getElementById("temp") as HTMLParagraphElement;
    tempDisplay.innerHTML = convertedCelsius.toFixed(1) + "℃";
  }
  setCityName(city: any) {
    const nameDisplay = document.getElementById(
      "cityName"
    ) as HTMLParagraphElement;
    nameDisplay.innerHTML = city.name;
  }
  setHumid(humid: any) {
    const humidDisplay = document.getElementById(
      "humid"
    ) as HTMLParagraphElement;
    humidDisplay.innerHTML = humid.main.humidity + "%";
    const humidText = document.getElementById(
      "humidText"
    ) as HTMLParagraphElement;
    humidText.innerHTML = "Humidity";
    const humidImage = document.getElementById(
      "humidImage"
    ) as HTMLImageElement;
    humidImage.src = "images/humid.png";
  }
  setWind(wind: any) {
    const windDisplay = document.getElementById("wind") as HTMLParagraphElement;
    windDisplay.innerHTML = wind.wind.speed;
    const windSpeedText = document.getElementById(
      "windSpeedText"
    ) as HTMLParagraphElement;
    windSpeedText.innerHTML = "Wind Speed";
    const windImage = document.getElementById("windImage") as HTMLImageElement;
    windImage.src = "images/wind.png";
  }
  setWeatherEmoticon(data: any) {
    const displayEmoticon = document.getElementById(
      "emoticonWeather"
    ) as HTMLParagraphElement;
    const id = data.weather[0].id;
    const isDaytime = data.dt > data.sys.sunrise && data.dt < data.sys.sunset; // Check if it's day or night
    let emoticon = "";

    if (isDaytime) {
      if (id >= 200 && id <= 299) {
        emoticon = "⛈️"; // Thunderstorm
      } else if (id >= 300 && id <= 399) {
        emoticon = "🌧️"; // Light rain
      } else if (id >= 500 && id <= 599) {
        emoticon = "🌧️"; // Rain
      } else if (id >= 600 && id <= 699) {
        emoticon = "❄️"; // Snow
      } else if (id >= 700 && id <= 799) {
        emoticon = "🌫️"; // Mist/fog
      } else if (id === 800) {
        emoticon = "🌞"; // Clear sky (Day)
      } else if (id === 801) {
        emoticon = "🌤️"; // Few clouds (Day)
      } else if (id === 802) {
        emoticon = "⛅"; // Scattered clouds (Day)
      } else if (id === 803) {
        emoticon = "☁️"; // Broken clouds (Day)
      } else if (id === 804) {
        emoticon = "☁️"; // Overcast clouds (Day)
      }
    } else {
      if (id >= 200 && id <= 299) {
        emoticon = "🌩️"; // Thunderstorm (Night)
      } else if (id >= 300 && id <= 399) {
        emoticon = "🌧️"; // Light rain (Night)
      } else if (id >= 500 && id <= 599) {
        emoticon = "🌧️"; // Rain (Night)
      } else if (id >= 600 && id <= 699) {
        emoticon = "❄️"; // Snow (Night)
      } else if (id >= 700 && id <= 799) {
        emoticon = "🌫️"; // Mist/fog (Night)
      } else if (id === 800) {
        emoticon = "🌙"; // Clear sky (Night)
      } else if (id === 801) {
        emoticon = "🌙"; // Few clouds (Night)
      } else if (id === 802) {
        emoticon = "🌙"; // Scattered clouds (Night)
      } else if (id === 803) {
        emoticon = "☁️"; // Broken clouds (Night)
      } else if (id === 804) {
        emoticon = "☁️"; // Overcast clouds (Night)
      }
    }

    if (displayEmoticon) {
      displayEmoticon.innerHTML = emoticon;
    }
  }
  setFeelsLike(data: any) {
    const feelsLikeText = document.getElementById(
      "feelsLikeText"
    ) as HTMLParagraphElement;
    feelsLikeText.innerHTML = "FEELS LIKE";

    const feelsLikeimg = document.getElementById(
      "feelsLikeimg"
    ) as HTMLImageElement;
    feelsLikeimg.src = "images/temp.png";

    const feelsLike = document.getElementById(
      "feelsLike"
    ) as HTMLParagraphElement;
    const convertedCelsius = data.main.feels_like - 273.15;
    feelsLike.innerHTML = convertedCelsius.toFixed(1) + "°";

    const feelsLikeDescription = document.getElementById(
      "feelsLikeDescription"
    ) as HTMLParagraphElement;
    let description = "";

    if (data.main.feels_like >= data.main.temp) {
      description = "It feels warmer than the actual temperature.";
    } else if (data.main.feels_like <= data.main.temp) {
      description = "It feels cooler than the actual temperature.";
    } else if (data.main.feels_like == data.main.temp) {
      description = "Similar to the actual temparature.";
    }

    if (description) {
      feelsLikeDescription.innerHTML = description;
    }
  }
  async setCountryName(data: any){
    const getName = await fetch('codes.json')
    const returnName = await getName.json();

    const countryCode = data.sys.country;
    returnName.forEach((element: any) => {
      if(countryCode !== element.code){
        return;
      }
    const displayCountry = document.getElementById('countryName') as HTMLParagraphElement
    displayCountry.innerHTML = '(' + element.name + ')';
    });
  }
  setSunrise(data: any){
    const riseSetimg = document.getElementById('riseSetimg') as HTMLImageElement
    riseSetimg.src = 'images/sunrise.png'

    const sunriseText = document.getElementById('riseSetText') as HTMLParagraphElement
    sunriseText.innerHTML = 'Sunrise'

    const timeRise = document.getElementById('timeRise') as HTMLParagraphElement;

    const sunriseTimeUTC = data.sys.sunrise * 1000;
    
    const date = new Date(sunriseTimeUTC);
    
    // Format the time to 12-hour format with timezone
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const readableTime = date.toLocaleTimeString('en-US', options);
    
    timeRise.innerHTML = readableTime;

    const sunset = document.getElementById("sunset") as HTMLParagraphElement
    
    const sunsetTimeUTC = data.sys.sunset * 1000;

    const date2 = new Date(sunsetTimeUTC);

    const readableTime2 = date2.toLocaleTimeString('en-US', options);

    sunset.innerHTML = 'Sunset: ' + readableTime2;

    const PST = document.getElementById('pst') as HTMLParagraphElement
    PST.innerHTML = '(Philippine Standard Time)'
  }
}
const cityInput = document.getElementById("button") as HTMLInputElement;
const weather = new Weather();
if (cityInput) {
  cityInput.addEventListener("click", () => weather.getAPI());
}