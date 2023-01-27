import { API_URL } from "./const.js";
import {addPreload, removePreload} from "./util.js";

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
            <span class="item__count">${element.price}</span>`
            wrapper.append(priceItem);
        });        
    };    

export const initService=()=>{
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