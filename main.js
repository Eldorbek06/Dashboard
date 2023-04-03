let btn = document.querySelector('.right button')
let popup = document.querySelector('.popup')

console.log(btn, popup);

btn.onclick = () => {
    popup.classList.add('popup_act')
}

popup.onclick = () => {
    popup.classList.remove('popup_act')
}