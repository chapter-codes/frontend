'use strict'
// handle transitions in hero section



const root = document.documentElement
const rootStyles = getComputedStyle(root);


//get hex values of color variables defined in :root, css.
const btnBorderColors=[
    '--btn-border-orange',
    '--btn-border-strawberry',
    '--btn-border-blueberry',
]
const btnBorderHex= btnBorderColors.map(color=>rootStyles.getPropertyValue(color).trim()) //hex values

const heroBgColors=[
    '--hero-bg',
    '--strawberry-text',
    '--blueberry-text',
]
const heroBgHex= heroBgColors.map(color=>rootStyles.getPropertyValue(color).trim()) //hex values

//juice image slides
const juiceSlides= document.querySelector('#juice-slides');
const juiceSlideWidth= juiceSlides.offsetWidth;

// juice text slide 
let textSlides = document.querySelector('#text-slides');
const parentText= document.querySelector('#parent-text');


//alte test
const alte=document.querySelector('.alte')

let newArray;
const height= textSlides?.parentElement?.offsetHeight;
let index=1
let slideIndex=1
setTimeout(() => {
    const textSlidesWidth= Array.from(textSlides.children).map(child=>child.offsetWidth);
    parentText.firstElementChild.style.width= textSlidesWidth[0] + 'px'
    parentText.firstElementChild.innerText=''
}, 2000)

modifyCarousel()

setInterval(handleHeroTransitions
  , 5000);

function modifyCarousel (){
    // append first and last slide to end and start of carousel, respectively.
    const firstItem= juiceSlides.children[0].cloneNode(true)
    const lastItem= juiceSlides.children[juiceSlides.children.length -1].cloneNode(true)
    juiceSlides.append(firstItem);
}

function handleHeroTransitions (){
    const textSlidesWidth= Array.from(textSlides.children).map(child=>child.offsetWidth);
    const juiceSlideWidth= juiceSlides.offsetWidth;
    
    //fade out the current juice slide
    const slidesLen= juiceSlides.children.length
    juiceSlides.children[slideIndex-1].style.opacity=0

    juiceSlides.style.transition=`transform 500ms cubic-bezier(0, 1.32, 0.27, 1.19)`;
    parentText.firstElementChild.style.width= textSlidesWidth[index] + 'px'

    //slide text-slides
    textSlides.style.transform=`translateY(-${height *index}px)`;

    //change colors
    document.documentElement.style.setProperty('--dynamic-hero-bg-color', heroBgHex[index]);
    document.documentElement.style.setProperty('--dynamic-btn-border-color', btnBorderHex[index]);    
    
    //slide the juice 
    juiceSlides.style.transform=`translateX(-${juiceSlideWidth * slideIndex }px)`;

    //set opacity to 1; translate back to slide begining  when reached the end.
    juiceSlides.ontransitionend=()=>{
        setTimeout(()=> {
            //set opacity back to 1
            slideIndex ==1 ? ( juiceSlides.children[slidesLen-2].style.opacity=1): juiceSlides.children[slideIndex-2].style.opacity=1

            //translate slide to start
            if(slideIndex==1){
                juiceSlides.style.transition=`none`;
                juiceSlides.style.transform=`translateX(0)`
            } 
        }, 2000)
    }

    index == 2 ? index=0 :index++;
    slideIndex == 3 ? slideIndex=1 :slideIndex++;
}


