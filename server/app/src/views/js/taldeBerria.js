import * as u from "./user.js";
import * as ta from "./taldea.js";
import {taldeenTaula} from "./admin.js";
   
window.addEventListener('DOMContentLoaded', () => {
   
    taldeaForm(2);
});

 export async function  taldeaSortu(event){
    const  taulaDiv = document.getElementById('taulaDiv');
    event.preventDefault();
        const data = {
            izena: document.getElementById('izena').value,
            email: document.getElementById('email').value,
            telefonoa: document.getElementById('telefonoa').value,
            puntuakGuztira: 0,
            egoera: 0
        };
    const idTaldea = await ta.createNewTaldea(data);
    taulaDiv.innerHTML = "";
    
    if(idTaldea){
      
        const mezua = document.createElement('h1');
        mezua.textContent = 'Taldea ondo sortu da';
        document.body.appendChild(mezua);
       
        
    }
    else{
    
        const mezua = document.createElement('h1');
        mezua.textContent = 'Errorea, saiatu berriro';
        document.body.appendChild(mezua);
    }
    taldeaForm();
 }


 export async function taldeaForm(i){

    const taulaDiv = document.getElementById('taulaDiv');
    const titulua = document.createElement('h1');
    titulua.textContent = "Taldea berria sortu ezazu";
    taulaDiv.appendChild(titulua);
    const taula = document.createElement('table');
    const row1 = taula.insertRow();
    row1.insertCell().textContent = "Taldearen izena";
    row1.insertCell().innerHTML = "<input type='text' id='izena' placeholder='Taldearen izena'></input>";
    const row2 = taula.insertRow();
    row2.insertCell().textContent = "Eposta kontua";
    row2.insertCell().innerHTML = "<input type='email' id='email' placeholder='Eposta kontua'></input>";
    const row3 = taula.insertRow();
    row3.insertCell().textContent = "Telefono zenbakia";
    row3.insertCell().innerHTML = "<input type='number' id='telefonoa' placeholder='Telefono zenbakia'></input>";

    taulaDiv.appendChild(taula);
    const button = document.createElement('button');
    button.setAttribute('type', 'click');
    button.textContent = 'Taldea sortu';
    button.addEventListener('click', async (event) => taldeaSortu(event));
    
    taulaDiv.appendChild(button);
    taldeakBistaratu2(i);
 }

 export async function taldeakBistaratu2(i){
  
    const taldeak = await ta.getTaldeak();
    taldeak.sort((a, b) => {
        if (a.egoera < b.egoera) return -1;
        if (a.egoera > b.egoera) return 1;
        return 0;
    });
    const taulaDiv = document.getElementById('taldeenTaula');
    taulaDiv.innerHTML = "";
    taldeenTaula(taulaDiv, taldeak,i);

   
 }

