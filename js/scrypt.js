const API_URL ='https://pine-glowing-kicker.glitch.me/';
/*GET /api - получить список услуг
GET /api?service={n} - получить список барберов
GET /api?spec={n} - получить список месяца работы барбера
GET /api?spec={n}&month={n} - получить список дней работы барбера
GET /api?spec={n}&month={n}&day={n} - получить список свободных часов барбера
POST /api/order - оформить заказ
*/
const removePreload=(elem)=>{
    elem.classList.remove('preload');
};

const addPreload=(elem)=>{
    elem.classList.add('preload');
};

const startSlider=(slider)=>{ 
    const sliderItems=document.querySelectorAll('.slider__item');    
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
    sliderConteiner.getElementsByClassName.display='none';

    addPreload(slider);

    window.addEventListener('load',()=>{         
      sliderConteiner.style.display='';
      removePreload(slider);
      startSlider();
    });
};

const renderService=(wrapper,data)=>{
const labels=data.map(element=>{
  const label=document.createElement('label');
  label.classList.add('radio');
  label.innerHTML=`<input type="radio" class="radio__input" name="service" value="${element.id}">
  <span class="radio__label">${element.name}</span>`;
  return label;
})
wrapper.append(...labels);
};

const renderPrice=(wrapper,data)=>{
    data.forEach(element => {
        const priceItem=document.createElement('li');
        priceItem.classList.add('price__item');
        priceItem.innerHTML=`<span class="item__title">${element.name}</span>
        <span class="item__count">${element.price} руб</span>`
        wrapper.append(priceItem);
    });
    
};

const initService=()=>{
    const priceList=document.querySelector('.price__list');
    const renderFielsetService=document.querySelector('.reserve__fieldset_service');

    priceList.textContent='';
    addPreload(priceList);

    renderFielsetService.innerHTML='<legend>Услуга</legend>';
    addPreload(renderFielsetService);

    fetch(`${API_URL}/api`)
    .then(responce=>{
        return responce.json();
    })
    .then(data=>{
     renderPrice(priceList,data);
     removePreload(priceList);
     return data;
    })
    .then(data=>{
    renderService(renderFielsetService,data);
    removePreload(renderFielsetService);
    })
};

const addDisabled=(arr)=>{
   arr.forEach((elem)=>{    
    elem.disabled= true;
   }) 
};
const removeDisabled=(arr)=>{
    arr.forEach((elem)=>{
     elem.disabled =false;   
    }) 
 };
 

 const renderSpec=(wrapper,data)=>{
    const labels=data.map(element=>{
      const label=document.createElement('label');
      label.classList.add('radio');
      label.innerHTML=`<input type="radio" class="radio__input" name="specialist" value="${element.id}">
      <span class="radio__label radio__label_spec" style="--bg-image:url(${API_URL}${elemant.img})">${element.name}</span>`;
      return label;
    })
    wrapper.append(...labels);
    };

    const renderMonth=(wrapper,data)=>{
        const labels=data.map(element=>{
          const label=document.createElement('label');
          label.classList.add('radio');
          label.innerHTML=`<input type="radio" class="radio__input" name="month" value="${element.id}">
          <span class="radio__label">${new Intl.DateTimeFormat('ru-RU',{month:'long'})
          .format(new Data(element))}</span>`;
          return label;
        })
        wrapper.append(...labels);
        };
        
        const renderDay=(wrapper,data,month)=>{
            const labels=data.map(element=>{
              const label=document.createElement('label');
              label.classList.add('radio');
              label.innerHTML=`<input type="radio" class="radio__input" name="day" value="${day}">
              <span class="radio__label">${new Intl.DateTimeFormat('ru-RU',{month:'long',day:'numeric'})
              .format(new Data(`${month}/${element}`))}</span>`;
              return label;
            })
            wrapper.append(...labels);
            };     

const initReserve=()=>{
 const reserveForm =document.querySelector('.reserve__form');
 const{fieldspec,fieldmonth,fieldday,fieldtime,btn}=reserveForm; 

 reserveForm.addEventListener('change',async event =>{
    addPreload(fieldspec);

   const target =event.target;

   if(target.name==='service'){
    addDisabled([fieldspec,fieldmonth,fieldday,fieldtime,btn,]);
    fieldspec.innerHTML= '<legend>Специалист</legend>';
    addPreload(fieldspec);

    const responce = await fetch(`${API_URL}/api?service=${target.value}`);    
    const data=await responce.json;    

    renderSpec(fieldspec,data);
    removePreload(fieldspec);

    removeDisabled([fieldspec]);
   }
   if(target.name==='specialist'){
    addDisabled([fieldspec,fieldday,fieldtime,btn,]);
    
    addPreload(fieldmonth);

    const responce = await fetch(`${API_URL}/api?specialist=${target.value}`);    
    const data= await responce.json;    
    fieldmonth.textContent='';
    renderMonth(fieldmonth,data);
    removePreload(fieldmonth);

    removeDisabled([fieldday,fieldmonth]);
   }
   if(target.name==='month'){
    addDisabled([fieldtime,btn,]);
    
    addPreload(fieldday);

    const responce = await fetch(`${API_URL}/
    api?specialist=${reserveForm.specialist.value} &month=${target.month}`);    
    const data= await responce.json;    
    fieldday.textContent='';
    renderDay(fieldday,data,target.month);
    removePreload(fieldday);

    removeDisabled([fieldday,fieldmonth,fieldtime]);
   }
   if(target.name==='day'){
    addDisabled([btn,]);
    
    addPreload(fieldtime);

    const responce = await fetch(`${API_URL}/
    api?specialist=${reserveForm.specialist.value} &month=${target.month}`);    
    const data= await responce.json;    
    fieldday.textContent='';
    renderDay(fieldday,data,target.month);
    removePreload(fieldday);
    removeDisabled(btn);    
   }
 })
};

   const init=()=>{
    initSlider();
    initService();
    initReserve();
   }
   window.addEventListener('DomContentLoaded',init);

   init();