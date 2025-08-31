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
        console.log(i, animatedTexts[i])
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
        'translate-x-10',
        'translateX(0)',
        'translate-x-1/3',
        'translate-x-20',
        'rotate-180',
        'rotate(10deg)',
        ['-translate-y-1/2', 'translate-y-10']
    ]

    if(screenWidth <= '1024'){ //smaller than desktop view
        if(rect.top >= headerHeight && rect.bottom <= window.innerHeight  ){
            console.log('animate', id)
            console.log('ele', element)
            id == 1 ? null : element.classList.remove(animatedTextPropArr[id])
            id == 5 ? element.style.transform = animatedTextPropArr[id] : null
            id == 6 ? element.classList.replace(animatedTextPropArr[id][0], animatedTextPropArr[id][1]) : null
        }else{
            id == 1 ? null : element.classList.add(animatedTextPropArr[id])
            id == 5 ? element.style.transform= '' : null
            id == 6 ? element.classList.replace(animatedTextPropArr[id][1], animatedTextPropArr[id][0]) : null
        }
    }
}



