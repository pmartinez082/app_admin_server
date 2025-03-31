import * as ep from '../js/epaimahaikidea.js';
import {booleanTxapelketa0} from '../js/txapelketa.js';
import {autentifikatu} from '../js/user.js';
document.addEventListener('DOMContentLoaded', async () => {
    //await autentifikatu();
    const faseak = await loadEpaimahaikideenTaula();
    console.log(faseak);
    await loadFaseaMenua(faseak);
});

document.getElementById('epaimahaikideForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fasea = document.getElementById('faseaMenua').value;
    const username = document.getElementById('epaimahaikideaMenua').value;
    await ep.createNewEpaimahaikidea2(fasea, username);
    window.location.reload();
    
});

document.getElementById('faseaMenua').addEventListener('change', async () => {
    await loadEpaimahaikideenMenua();
});

export async function loadFaseaMenua(faseak){
    console.log(faseak);
    const menua = document.getElementById('faseaMenua');
   
    if(!faseak){
        return false;
    }
    for(const fase of faseak){
        const option = document.createElement('option');
        option.value = fase.idFasea;
        option.textContent = fase.izena;
        menua.appendChild(option);
    }
}

export async function loadEpaimahaikideenMenua(){

    const idFasea  = document.getElementById('faseaMenua').value;
    
    const menua = document.getElementById('epaimahaikideaMenua');
    menua.disabled = false;
    const users = await ep.getAukeratuGabekoEpaimahaikideak(idFasea);
    if(!users){
        return false;
    }
    for(const user of users){
        const option = document.createElement('option');
        option.value = user.username;
        option.textContent = user.username;
        menua.appendChild(option);
    }

}

export async function loadEpaimahaikideenTaula() {
    const epaiDiv = document.getElementById('epaimahaikideaDiv');
    const epaimahaikideak = await ep.getTxapelketarenEpaimahaikideak();
    const izena = await booleanTxapelketa0();
    if(!izena){
        
        const mezua = document.createElement('h1');
        mezua.innerHTML = 'Txapelketa dagoeneko hasi da, ezin duzu epaimahaikide berririk sortu';
        epaiDiv.appendChild(mezua);
        return;
    }
    if(!epaimahaikideak){
        const mezua = document.createElement('h1');
        mezua.innerHTML = 'Oraindik ez da epaimahaikiderik sortu';
        epaiDiv.appendChild(mezua);
        return;
    }

   
   
    return  await sortEpaimahaikideak(izena);
}

export async function sortEpaimahaikideak(izena){
    const h1 = document.createElement('h1');
    h1.textContent = izena+' txapelketaren epaimahaikideak';
    document.getElementById('epaimahaikideaDiv').appendChild(h1);
    const epaimahaikideak = await ep.getTxapelketarenEpaimahaikideak();
    console.log(epaimahaikideak);
    if(!epaimahaikideak){
        return false;
    }
    const faseak = [...new Map(epaimahaikideak.map(e => [e.idFasea, e])).values()];

    const taulaF = document.createElement('table');
    taulaF.className = 'taula';
    const l1 = taulaF.insertRow();
    l1.insertCell().textContent = 'Fasea';
    l1.insertCell().textContent = 'Epaimahaikideak';
    console.log(faseak);
   for ( const fasea of faseak){
        const l = taulaF.insertRow();
        l.insertCell().textContent = fasea.izena;
        const usernameak = await ep.getFasearenEpaimahaikideak(fasea.idFasea);
        l.insertCell().textContent = usernameak.map(e => e.username).join(', ');

        
    }
    console.log(taulaF);

    document.getElementById('epaimahaikideaDiv').appendChild(taulaF); 
    return faseak;  

    }