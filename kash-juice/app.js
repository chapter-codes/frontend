'use strict'
const root = document.documentElement
const rootStyles = getComputedStyle(root);


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
    alte.firstElementChild.style.width= textSlidesWidth[0] + 'px'
    alte.firstElementChild.innerText=''

}, 2000)
modifyCarousel()
setInterval(() => {
    const textSlidesWidth= Array.from(textSlides.children).map(child=>child.offsetWidth);
    console.log('textSlidesWidth', textSlidesWidth)
    const juiceSlideWidth= juiceSlides.offsetWidth;
    

    juiceSlides.style.transition=`transform 500ms `;
    console.log('juiceSlideWidth', textSlides.children[index].textContent)
    alte.firstElementChild.style.width= textSlidesWidth[index] + 'px'

    //slide the text slides
    textSlides.style.transform=`translateY(-${height *index}px)`;

    //change colors
    document.documentElement.style.setProperty('--dynamic-hero-bg-color', heroBgHex[index]);
    document.documentElement.style.setProperty('--dynamic-btn-border-color', btnBorderHex[index]);

    //fade out the current juice slide
    

    //slide the juice 
    juiceSlides.style.transform=`translateX(-${juiceSlideWidth * slideIndex }px)`;


    juiceSlides.ontransitionend=()=>{
        // parentText.style.transition=`padding 700ms ease-in-out`;
        if(slideIndex==1){
            juiceSlides.style.transition=`none`;
            juiceSlides.style.transform=`translateX(0px)`;

        }   
    }
    index == 2 ? index=0 :index++;
    slideIndex == 3 ? slideIndex=1 :slideIndex++;

}, 5000);



setTimeout(() => {
}, 6000)
function modifyCarousel (){
    // append first and last slide to end and start of carousel, respectively.
    const firstItem= juiceSlides.children[0].cloneNode(true)
    const lastItem= juiceSlides.children[juiceSlides.children.length -1].cloneNode(true)
    juiceSlides.append(firstItem);

}