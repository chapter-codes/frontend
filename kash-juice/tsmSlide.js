'use strict'


const tsmCarousel= document.getElementById('testimonial-carousel')
const tsmTransProp= `transform 2000ms cubic-bezier(0, 1.32, 0.27, 1.19), opacity 1000ms`
const btnsArray= Array.from(document.getElementById('slide-controls').children)
const [prevBtn, nextBtn] =btnsArray

const [modTsmCarousel, tsmCarouselClone, tsmSlidesLength,  tsmTransfromXLen] = ModifyAndCloneCarousel(tsmCarousel, '#testimonial-carousel-wrapper', tsmTransProp)



const tsmSlideMultiplier=[1]
let tsmCarouselInterval = setInterval(()=>{
    handleSlide(modTsmCarousel, tsmCarouselClone, tsmSlidesLength, tsmTransfromXLen, tsmSlideMultiplier, tsmTransProp, {prevBtn, nextBtn} ) 
}, 7000)

//slide with button
const slideButtons= document.getElementById('slide-controls')
slideButtons.addEventListener('click', (event)=>{
    slideWithButton(event, tsmCarouselInterval, modTsmCarousel, tsmCarouselClone, tsmTransfromXLen, tsmSlideMultiplier, tsmSlidesLength, tsmTransProp) 
})  

function ModifyAndCloneCarousel (carouselElement, cloneParentId='#services-carousel-wrapper', transProp='') {
    const cloneParent= document.querySelector(`${cloneParentId}`)
    const carouselArray = Array.from(carouselElement.children)

    carouselElement.style.zIndex = '20'
    carouselElement.style.transition = transProp

    //clone carouselElement to be used when fading out of last slide and fading in of first slide
    const clonedCarousel = carouselElement.cloneNode(true);
    clonedCarousel.id= 'cloned-' + carouselElement.id
    console.log( carouselElement.id, carouselElement.scrollHeight, cloneParent.offsetHeight)    
    clonedCarousel.style.height = carouselElement.firstElementChild.scrollHeight+'px'
    clonedCarousel.style.width = carouselElement.firstElementChild.offsetWidth+'px'
    clonedCarousel.style.transition = transProp
    clonedCarousel.style.position = 'absolute'
    clonedCarousel.style.zIndex = '10'
    clonedCarousel.style.top = '0'
    clonedCarousel.style.left = '0'

    //keep cloned carousel fadded out
    clonedCarousel.style.opacity = 0
    
    //append cloned carousel which is positioned absolute to the carousel-wrapper
    cloneParent.appendChild(clonedCarousel)
    return [carouselElement, clonedCarousel,  carouselArray.length, cloneParent.offsetWidth]
}

function handleSlide(carouselElement, carouselClone, slidesLength, transformxLen, multiplier, transProp="", hasBtnControl=false){
    //if last carousel item is reached, fade out and reset carousel
    if(multiplier[0] ==slidesLength) {
        setTimeout(()=>{
            hasBtnControl.nextBtn.disabled=false
            hasBtnControl.nextBtn.style.opacity=1
            hasBtnControl.prevBtn.disabled=true
            hasBtnControl.prevBtn.style.opacity=0.6
        }, 1000)
        
        // fade out carousel, fade-in cloned cloned carousel 
        carouselClone.style.opacity=1
        carouselElement.style.opacity=0
        hasBtnControl===true? changeSlideBtnColor(0, multiplier[0], slidesLength): null

        //fade-in back the carousel and translate it to the first slide after 1000ms( opacity transition)
        setTimeout(() => {
            carouselElement.style.opacity= 1
            carouselElement.style.transition = 'none'
            carouselElement.style.transform = `translateX(0px)`
           
            //fade out the cloned carousel from the background
            carouselClone.style.opacity=0
        }, 2000);

        //reset
        multiplier[0]=1
    }else{
        //slide carousel
        if( multiplier[0]==1){
            hasBtnControl.prevBtn.disabled=false
            hasBtnControl.prevBtn.style.opacity=1
        }else if (multiplier[0]== slidesLength-1 ){
            hasBtnControl.nextBtn.disabled=true
            hasBtnControl.nextBtn.style.opacity=0.6
        }else{}

        

        carouselElement.style.transition = transProp
        carouselElement.style.transform = `translateX(-${transformxLen * multiplier}px)`
        hasBtnControl===true? changeSlideBtnColor(0, multiplier, slidesLength) : null
        multiplier[0]= multiplier[0] +1
    }   
}





function slideWithButton(event, openInterval, carousel, clonedCarousel, transformxLen, multiplier, slidesLength, transProp) {
    const target = event.target.closest('button')
    if(target != null) {
        clearInterval(tsmCarouselInterval)

        const index = Array.from(target.parentElement.children).indexOf(target)
        const previousMultiplierValue= multiplier[0]

        //fade out the cloned carousel incase its shown, anytime the button is clicked.
        clonedCarousel.style.opacity=0
        carousel.style.transition = transProp

        if(target.parentElement.id.includes('slide-controls')){

            if(target.id=='prev'){
                if(multiplier[0] > 1 ){
                   
                    carousel.style.transform =  `translateX(-${transformxLen * (multiplier[0]-2)}px)`
                    multiplier[0]=previousMultiplierValue-1
                }

            }else if(target.id=='next'){
                if(multiplier[0] < slidesLength ){
                   
                    carousel.style.transform = `translateX(-${transformxLen * multiplier[0]+1}px)`
                    multiplier[0]=previousMultiplierValue +1
                }

            }else{ }
            //
            tsmCarouselInterval= setInterval(()=>{
            handleSlide(carousel, clonedCarousel, slidesLength, transformxLen, multiplier, transProp, {prevBtn, nextBtn})
                }, 7000)

            multiplier[0]==1? (target.disabled=true, target.style.opacity=0.6)
            : multiplier[0]>1 && multiplier <slidesLength ? btnsArray.forEach(btn=>{
                btn.style.opacity=1
                btn.disabled=false
            })
            :multiplier[0]==slidesLength? (target.disabled=true, target.style.opacity=0.6) : (target.disabled=false, target.style.opacity=1)

        }else{

        }
    }
}
