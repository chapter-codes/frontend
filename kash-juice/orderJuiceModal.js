'use strict'

// for translate the juice model for visibility


const orderJuiceModal= document.getElementById("order-modal")
const tryItBtn = document.getElementById("juices-tryit-btn")
const closeModal= document.querySelector("#close-modal button")
console.log(orderJuiceModal, tryItBtn)

tryItBtn.onclick= addClass
closeModal.onclick= removeClass
orderJuiceModal.onclick= (event)=> event.target === orderJuiceModal? removeClass() : null

function addClass(){
    document.body.classList.add('modal-open')
}

function removeClass() {
    document.body.classList.remove('modal-open')
}