import { API_URL } from "./const.js";
import { removePreload } from "./util.js";
import { addPreload } from "./util.js";


const addDisabled=(arr)=>{
    arr.forEach((element)=>{    
     element.disabled= true;
    }) 
 };
 const removeDisabled=(arr)=>{
     arr.forEach((element)=>{
      element.disabled =false;   
     }) 
  };
 
  const renderSpec=(wrapper,data)=>{
     const labels=data.map(element=>{
       const label=document.createElement('label');
       label.classList.add('radio');
       label.innerHTML=`<input type="radio" class="radio__input" name="spec" value="${element.id}">
       <span class="radio__label radio__label_spec" style="--bg-image:url(${API_URL}${element.img})">${element.name}</span>`;
       return label;
     })
     wrapper.append(...labels);
     };
 
     const renderMonth=(wrapper,data)=>{
         const labels=data.map((element)=>{
           const label=document.createElement('label');
           label.classList.add('radio');
           label.innerHTML=`<input type="radio" class="radio__input" name="month" value="${element}">
           <span class="radio__label">${new Intl.DateTimeFormat('ru-RU',{month:'long'})
           .format(new Date(element))}</span>`;
           return label;
         })
         wrapper.append(...labels);
         };
         
         const renderDay=(wrapper,data,month)=>{
             const labels=data.map((day)=>{
               const label=document.createElement('label');
               label.classList.add('radio');
               label.innerHTML=`<input type="radio" class="radio__input" name="day" value="${day}">
               <span class="radio__label">${new Intl.DateTimeFormat('ru-RU',{month:'long',day:'numeric'})
               .format(new Date(`${month}/${day}`))}</span>`;
               return label;
             })
             wrapper.append(...labels);
             };
 
             const renderTime=(wrapper,data)=>{
                 const labels=data.map((time)=>{
                   const label=document.createElement('label');
                   label.classList.add('radio');
                   label.innerHTML=`<input type="radio" class="radio__input" name="time" value="${time}">
                   <span class="radio__label">${time}</span>`;
                   return label;
                 })
                 wrapper.append(...labels);
                 };          

   export const initReserve=()=>{
    const reserveForm =document.querySelector('.reserve__form');
    
    const {fieldspec,fieldmonth,fieldday,fieldtime,btn} =reserveForm;  
    addDisabled([fieldspec,fieldday,fieldmonth,fieldtime,btn]);

    reserveForm.addEventListener('change',async event =>{
       addPreload(fieldspec);
   
      const target =event.target;      
      
      if(target.name==='service'){
        addDisabled([fieldspec,fieldday,fieldmonth,fieldtime,btn]);
              
       fieldspec.innerHTML= '<legend>Специалист</legend>';
       addPreload(fieldspec);
   
       const responce = await fetch(`${API_URL}/api?service=${target.value}`);    
       const data= await responce.json();    
      
       renderSpec(fieldspec,data);
       removePreload(fieldspec);
   
       removeDisabled([fieldspec]);
      }
      if(target.name==='spec'){
       addDisabled([fieldmonth,fieldday,fieldtime,btn]);
      
       addPreload(fieldmonth);
   
       const responce = await fetch(`${API_URL}/api?spec=${target.value}`);            
       const data= await responce.json();
          
       fieldmonth.textContent='';
       renderMonth(fieldmonth,data);
       removePreload(fieldmonth,fieldspec);
   
       removeDisabled([fieldmonth,fieldday]);
      }
      if(target.name==='month'){
       addDisabled([fieldday,fieldtime,btn]);
       
       addPreload(fieldday);
   
       const responce = await fetch(`${API_URL}/api?spec=${reserveForm.spec.value}&month=${target.value}`);    
       const data =await responce.json(); 
         
       fieldday.textContent='';
       renderDay(fieldday,data,target.value);
       removePreload(fieldday);
   
       removeDisabled([fieldday]);
      }
      if(target.name==='day'){
       addDisabled([btn]);
       console.log(target);
       addPreload(fieldtime);
   
       const responce = await fetch(`${API_URL}/api?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}&day=${target.value}`);    
       const data=await responce.json(); 
       
       fieldtime.textContent='';
       renderTime(fieldtime,data);
       removePreload(fieldtime);
       removeDisabled([fieldtime]);    
      }
      if(target.name==='time'){    
       removeDisabled([btn]);    
      }
      
    });
    reserveForm.addEventListener('submit', async (event)=>{
      event.preventDefault();
      const formData=new FormData(reserveForm);
      const json=JSON.stringify(Object.fromEntries(formData));
       const responce =await fetch(`${API_URL}api/order`,{
        method:'post',
        body:json,
      });
      const data= await responce.json();
      const pSuccess=document.createElement('p');
      pSuccess.textContent=`thank you.your booking number is №${data.id}!
      waiting us ${new Intl.DateTimeFormat('ru-RU', { 
      month:'long',
      day:'numeric',
    }).format(new Date(`${data.month}/${data.day}`))},time ${data.time}`;
    reserveForm.append(pSuccess);
    });
   };