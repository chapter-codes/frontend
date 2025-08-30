'use strict'

// for translating the juice modal for visibility


const orderJuiceModal= document.getElementById("order-modal")
const tryItBtns = document.querySelectorAll(".try-it")
const closeModal= document.querySelector("#close-modal button")

tryItBtns.forEach(btn=> btn.onclick=addClass)
closeModal.onclick= removeClass
orderJuiceModal.onclick= (event)=> event.target === orderJuiceModal? removeClass() : null

function addClass(){
    document.body.classList.add('modal-open')
}

function removeClass() {
    document.body.classList.remove('modal-open')
}