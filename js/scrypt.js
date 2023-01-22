const removePreload=(elem)=>{
    elem.classList.remove('.preload');
};

const addPreload=(elem)=>{
    elem.classList.add('.preload');
};

const startSlider=(slider)=>{ 
    const sliderItems=document.querySelectorAll('.slider__item');
    console.log(sliderItems) ;
    const sliderList=document.querySelector('.slider__list');
    const btnPrevSlide=document.querySelector('.slider__arrow_left');
    const btnNextSlide=document.querySelector('.slider__arrow_right')
    let slideActiv=1;
    let position =0;
    
    const checkSlider=()=>{
        if(slideActiv +2 === sliderItems.length && document.documentElement.offsetWidth>560 ||
            slideActiv===sliderItems.length){
            btnNextSlide.style.display='none';
        }else{btnNextSlide.style.display='';
        }
        if(slideActiv===1){
            btnPrevSlide.style.display='none';
        }else{btnPrevSlide.style.display='';
        }
        }

        checkSlider();

    const nextSlide=()=>{       
        sliderItems[slideActiv]?.classList.remove('slider__item_active');
        position=-sliderItems[0].clientWidth*slideActiv;
        sliderList.style.transform=`translateX(${position}px)`;
        slideActiv += 1;
        sliderItems[slideActiv]?.classList.add('slider__item_active')
        checkSlider();
    };
    const prevSlide=()=>{
        sliderItems[slideActiv]?.classList.remove('slider__item_active');
        position=-sliderItems[0].clientWidth*(slideActiv -2);
        sliderList.style.transform=`translateX(${position}px)`;
        slideActiv -= 1;
        sliderItems[slideActiv]?.classList.add('slider__item_active')  
        checkSlider();
    };
    btnPrevSlide.addEventListener('click',prevSlide);
    btnNextSlide.addEventListener('click',nextSlide);

    window.addEventListener('resize',()=>{
        if(slideActiv+2>sliderItems.length && document.documentElement.offsetWidth>560){
            slideActiv=sliderItems.length-2;
            sliderItems[slideActiv]?.classList.add('slider__item_active');
        }
        position=-sliderItems[0].clientWidth*(slideActiv-1);
        sliderList.style.transform=`translateX(${position}px)`;
        checkSlider() ; 
    });
};

const initSlider=()=>{    
    const slider=document.querySelector('.slider');
    const sliderConteiner=document.querySelector('.slider__conteiner');
    sliderConteiner.getElementsByClassName.diusplay='none';
    addPreload(slider);
    window.addEventListener('load',()=>{
        console.log('hi'); 
      sliderConteiner.style.diusplay='';
      removePreload(slider);
      startSlider();
    });
}

   window.addEventListener('DomContentLoaded',initSlider());

