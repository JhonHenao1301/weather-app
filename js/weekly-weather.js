
import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from '../utils/format-data.js'
import { createDOM } from '../utils/dom.js'
import { createPeriodTime } from './period-time.js'
import { createCurrentWeather } from './current-day-info.js'
import { draggable } from './draggable.js'


function tabPanelTemplate(id) {
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
        <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}">
            </ul>
        </div>
    </div>
    `
}

function createTabPanel(id) {
    const $panel  = createDOM(tabPanelTemplate(id))
    if(id > 0) {
        $panel.hidden = true
    }
    return $panel
}

function configWeeklyWeather(weekList) {
    const $tabs = document.querySelector('.tabs')
    let cont = 0
    weekList.forEach((day, tabIndex) => {
        const $panel  = createTabPanel(tabIndex)
        $tabs.append($panel)
        day.forEach((weather, index) => {
            $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather, tabIndex, index))
            configCurrentDayInfo(weather, tabIndex, index, cont)
            cont++
        })
    })
}

function configCurrentDayInfo(weather, tabIndex, index, cont) {
    const $tabs = document.querySelector('.tabs')
    $tabs.append(createCurrentWeather(weather, tabIndex, index, cont))
}

export default async function weeklyWeather() {
    const $container = document.querySelector('.weeklyWeather')
    debugger
    console.log('yeah') 
    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('Hubo un error ubicandote')
    const { isError: weeklyWeatherError, data:weather } = await getWeeklyWeather(lat, lon)
    if(weeklyWeatherError) return console.log('oh! Ha ocurrido un error trayendo el pronóstico del clima')
    const weekList = formatWeekList(weather.list)
    configWeeklyWeather(weekList)

    const $dayWeatherContainer = document.querySelector('.dayWeather-list')
    const $dayWeatherList = $dayWeatherContainer.querySelectorAll('.dayWeather-item')
    
    $dayWeatherList.forEach(($day) => {
        $day.addEventListener('click', handleSelectWeatherDay)
    })

    function handleSelectWeatherDay(event) {
        const $currentWeatherList = document.querySelectorAll('.currentWeather-item')
    
        $dayWeatherList.forEach(i => i.classList.remove('is-selected'))
        $currentWeatherList.forEach(i => i.classList.remove('item-is-selected'))
    
        const $daySelected = event.currentTarget
    
        const tabId = $daySelected.getAttribute('tab')
        const id    = $daySelected.getAttribute('id')
    
        let weatherItemList = document.querySelectorAll('.currentWeather-item')
        let weatherItemArray = [].slice.call(weatherItemList)
        
        let itemFound = weatherItemArray.find(element => element.attributes.tab.value == tabId && element.attributes.id.value == id)
        const findValue = itemFound.getAttribute('cont')
        $daySelected.classList.add('is-selected')
        
        const $weatherItemFound = document.querySelector(`div[cont = '${findValue}']`)
        $weatherItemFound.classList.add('item-is-selected')
    }

    draggable($container)
}


