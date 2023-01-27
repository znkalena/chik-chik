import { API_URL } from "./const.js";
/*import { removePreload } from "./util.js";
import { addPreload } from "./util.js";*/


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
           label.innerHTML=`<input type="radio" class="radio__input" name="month" value="${element.id}">
           <span class="radio__label">${new Intl.DateTimeFormat('ru-RU',{month:'long'})
           .format(new Date(element))}</span>`;
           return label;
         })
         wrapper.append(...labels);
         };
         
         const renderDay=(wrapper,data,month)=>{
             const labels=data.map((element)=>{
               const label=document.createElement('label');
               label.classList.add('radio');
               label.innerHTML=`<input type="radio" class="radio__input" name="day" value="${element}">
               <span class="radio__label">${new Intl.DateTimeFormat('ru-RU',{month:'long',day:'numeric'})
               .format(new Date(`${month}/${element}`))}</span>`;
               return label;
             })
             wrapper.append(...labels);
             };
 
             const renderTime=(wrapper,data)=>{
                 const labels=data.map((element)=>{
                   const label=document.createElement('label');
                   label.classList.add('radio');
                   label.innerHTML=`<input type="radio" class="radio__input" name="time" value="${element}">
                   <span class="radio__label">${element}</span>`;
                   return label;
                 })
                 wrapper.append(...labels);
                 };          

   export const initReserve=()=>{
    const reserveForm =document.querySelector('.reserve__form');
    const btn=reserveForm.querySelector('#btn');
      
    const{fieldspec,fieldmonth,fieldday,fieldtime}=reserveForm;  
    console.log(fieldspec);

    reserveForm.addEventListener('change',async event =>{
      /* addPreload(fieldspec);*/
   
      const target =event.target;      
   
      if(target.name==='service'){
       addDisabled(fieldmonth,fieldday,fieldtime,btn,);
              
       fieldspec.innerHTML= '<legend>Специалист</legend>';
      /* addPreload(fieldspec);*/
   
       const responce = await fetch(`${API_URL}/api?service=${target.value}`);    
       const data= await responce.json();    
      console.log(data);
       renderSpec(fieldspec,data);
       /*removePreload(fieldspec);*/
   
       removeDisabled(fieldspec);
      }
      if(target.name==='spec'){
       addDisabled(fieldspec,fieldday,fieldtime,btn);
       
       /*addPreload(fieldMonth);*/
   
       const responce = await fetch(`${API_URL}/api?spec=${target.value}`);            
       const data= await responce.json();
          
       fieldmonth.textContent='';
       renderMonth(fieldmonth,data);
      /* removePreload(fieldMonth);*/
   
       removeDisabled(fieldday,fieldmonth);
      }
      if(target.name==='month'){
       addDisabled(fieldtime,btn,);
       
       /*addPreload(fieldDay);*/
   
       const responce = await fetch(`${API_URL}/
       api?specialist=${reserveForm.spec.value}&month=${target.name}`);    
       const data =await responce.json();    
       fieldday.textContent='';
       renderDay(fieldday,data,target.name);
       /*removePreload(fieldDay);*/
   
       removeDisabled(fieldday,fieldmonth,fieldtime);
      }
      if(target.name==='day'){
       addDisabled([btn,]);
       
       /*addPreload(fieldTime);*/
   
       const responce = await fetch(`${API_URL}/
       api?spec=${reserveForm.spec.value}&month=${target.month}&day=${target.value}`);    
       const data=await responce.json(); 
       
       fieldtime.textContent='';
       renderTime(fieldtime,data);
       /*removePreload(fieldTime);*/
       removeDisabled(btn);    
      }
      if(target.name==='time'){    
       removeDisabled(btn);    
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