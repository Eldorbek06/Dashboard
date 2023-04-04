let addTask = document.querySelector('.right button')
let closeBtn = document.querySelector('.close_area')
let popup = document.querySelector('.popup')
let B_url = 'http://localhost:9120/tasks'
let tasks_list = document.querySelector('.tasks_list')
let form = document.forms.popup_form
let table_view = document.querySelector('.show_type .table_type')
let tile_view = document.querySelector('.show_type .tile_type')
let tasks = document.querySelector('.tasks')
let inps = form.querySelectorAll('input')
let searchInp = document.querySelector('header .left input')

searchInp.onkeyup = () => {
    let key = searchInp.value.trim().toLowerCase()
    let data = []
    fetch(B_url)
    .then(res => res.json())
    .then(res => {
        res.filter(el => {
            let title = el.title.toLowerCase()
            if(title.includes(key)){
                data.push(el)
            }
        })
    })
    .then(() => reload(data, tasks_list))
}

showTypeColor()
table_view.onclick = () => {
    tasks.className = 'tasks'
    showTypeColor()
}
tile_view.onclick = () => {
    tasks.className = 'tasks tile'
    showTypeColor()
}
addTask.onclick = () => modalToggle()
closeBtn.onclick = () => modalToggle()

form.onsubmit = (e) => {
    e.preventDefault()
    let count = 0
    let obj = {}
    let fm = new FormData(form)
    fm.forEach((v, k) => {
        if (v === '') {
            count = 0
        } else {
            obj[k] = v
            count++
        }
    })
    if (count < 4) {
        inps.forEach(el => el.value === '' ? el.style.borderColor = 'red' : el.style.borderColor = 'black')
        return
    } else {
        fetch(B_url, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" }
        }).then(() => reFetch())
        modalToggle()
    }
    // form.reset()
}

function reload(arr, place) {
    place.innerHTML = ''
    for (let item of arr) {
        let task = document.createElement('div')
        let title = document.createElement('h3')
        let descr = document.createElement('p')
        let date_time = document.createElement('div')
        let date = document.createElement('div')
        let time = document.createElement('div')
        let state = document.createElement('div')

        task.classList.add('task')
        title.classList.add('title')
        descr.classList.add('descr')
        date_time.classList.add('date_time')
        date.classList.add('date')
        time.classList.add('time')
        state.classList.add('state')

        title.innerHTML = item.title
        descr.innerHTML = item.descr
        date.innerHTML = item.date.slice(2).replaceAll('-', '.')
        time.innerHTML = item.time
        state.innerHTML = item.state
        if (item.state === 'new') {
            state.style.color = '#FF3F3F'
        } else if (item.state === 'progress') {
            state.style.color = '#007FFF'
        } else {
            state.style.color = '#000000'
        }

        place.append(task)
        task.append(title, descr, date_time, state)
        date_time.append(date, time)
    }
}

reFetch()

function modalToggle() {
    popup.classList.contains('popup_act') ? popup.classList.remove('popup_act') : popup.classList.add('popup_act')
}
function reFetch() { fetch(B_url).then(res => res.json()).then(res => reload(res, tasks_list)) }

function showTypeColor() {
    if (tasks.classList.contains('tile')) {
        table_view.style.color = null
        tile_view.style.color = '#007FFF'
    } else {
        table_view.style.color = '#007FFF'
        tile_view.style.color = null
    }
}