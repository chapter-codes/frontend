'use strict'
//handle animations for about section and juices id-section


const about = document.getElementById('about')

//parent elment that contains texts we are animating
const animatedTexts= about.children[1].children
const animatedBottle = about.children[0].children[1]


//animate juices
const juices= document.getElementById('juices')

window.onscroll = handleScroll

function handleScroll(){
    for(let i=0; i<5; i++){
        handleAnimation(animatedTexts[i], i, window.innerWidth)
    }
    
    //animated juice bottle
    handleAnimation(animatedBottle, 5, window.innerWidth )
    handleAnimation(juices.children[0].children[1].firstElementChild, 6, window.innerWidth)
}

function handleAnimation (element, id, screenWidth){
    const rect = element.getBoundingClientRect()
    const headerHeight= document.getElementById('header').offsetHeight
    const animatedTextPropArr=[
        'translateX(0)',
        'translateX(0)',
        'translateX(0)',
        'translateX(0)',
        'rotate(0deg)',
        'rotate(10deg)',
        'translateY(1.5rem)'
    ]

    if(screenWidth <= '1024'){ //smaller than desktop view
        if(rect.top >= headerHeight && rect.bottom <= window.innerHeight  ){
            id == 1 ? null : element.style.transform= animatedTextPropArr[id]
        }else{
            id == 1 ? null : element.style.transform = ''
        }
    }
}



