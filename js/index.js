import { initReserve } from "./modules/initreserve.js";
import { initService } from "./modules/initservice.js";
import { initSlider } from "./modules/initslider.js";

const init=()=>{
    initSlider();
    initService();
    initReserve();
   }
   window.addEventListener('DomContentLoaded',init);
   
   init();