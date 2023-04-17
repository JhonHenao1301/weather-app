
import { createDOM } from "../utils/dom.js";
import { formatTemp } from "../utils/format-data.js";

export function currentWeatherTemplate({ tempMax, tempMin, wind, humidity }, tabId, id, cont) {
    return `<div class="currentWeather-item" tab="${tabId}" id="${id}" cont="${cont}">
            <span class="currentMaxWeather-temp">Max: ${tempMax}</span>
            <span class="currentMinWeather-temp">Min: ${tempMin}</span>
            <span class="currentWindWeather">Viento: ${wind} Km-h</span>
            <span class="currentHumidityWeather">Humedad: ${humidity}%</span>
    </div>
    `
}

export function createCurrentWeather(weather, tabIndex, index, cont) {
    // debugger
    const tempMax = formatTemp(weather.main.temp_max)
    const tempMin = formatTemp(weather.main.temp_min)
    const config = {
        tempMax: tempMax,
        tempMin: tempMin,
        wind: Math.floor(weather.wind.speed * 3.6),
        humidity: weather.main.humidity
    }
    
    return createDOM(currentWeatherTemplate(config, tabIndex, index, cont))
}

//max temp = weather.main.temp_max
//min temp = weather.main.temp_min
//humidity = weather.main.humidity
//wind speed = weather.wind.speed * 3.6 to km/h