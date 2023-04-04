
const $tabContainer = document.querySelector('#tabs')
const $tabList = $tabContainer.querySelectorAll('.tab')

const today = new Date()
let weekDay = today.getDay()

const week = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
]

function nextDay(day) {
    if (day === 6) {
        return 0
    } 
    return day + 1
}

$tabList.forEach(($tab, index) => {
    $tab.addEventListener('click', handleSelectTabClick)
    if(index === 0) {
        $tab.textContent = 'Hoy'
        weekDay = nextDay(weekDay)
        return false
    }

    $tab.textContent = week[weekDay]
    weekDay = nextDay(weekDay)
})

function handleSelectTabClick(event) {
    const $tabSelected = event.target
    const $tabActive = document.querySelector('.tab[aria-selected="true"]')
    $tabActive.removeAttribute('aria-selected')
    $tabSelected.setAttribute('aria-selected', true)

    const id = $tabSelected.id
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}] `)
    const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`)
    if($tabPanel !== $tabPanelSelected){
        $tabPanel.hidden = false
        $tabPanelSelected.hidden = true
    }
    // debugger
}