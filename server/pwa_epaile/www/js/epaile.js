import * as f from "./fasea.js";
import * as eb from "./ebaluazioa.js";
import * as t from "./taldea.js";
import * as ep from "./epaimahaikidea.js"

export async function ebaluazioaSortu(event,idEpaimahaikidea){
    event.preventDefault();
    const h1 = document.getElementById('ebaluazioaTaula').querySelector('h1');
    if(h1) document.getElementById('ebaluazioaTaula').removeChild(h1);
    const e = await eb.createNewEbaluazioa(event, idEpaimahaikidea);
    if(!e){
        const abisua = document.createElement('h1');
        abisua.innerHTML = "Balorazioak puntu minimo eta maximoen artean egon behar du";
        document.getElementById('ebaluazioaTaula').appendChild(abisua);
        return;
    }
 
   console.log("a");
    const modal = document.createElement('div');
    modal.id = "modal";
    document.getElementById('content').hidden = true;
    modal.innerHTML = `<div class="modal-content">
        <span class="close">&times;</span>
        <p>Ebaluazioa sortu da</p>
        </div>`;
       
        document.body.appendChild(modal);
        const span = document.getElementsByClassName("close")[0];
        console.log("aa");

        span.addEventListener("click", function() {
            document.getElementById("modal").style.display = "none";
            document.getElementById('content').classList.remove("blur");
           window.location.reload();
        });


    


}

export async function ebaluazioaForm(){
   //document.getElementById("divBozkatu").hidden = true;

    const fase = await f.getFaseAktiboa();
    //console.log(fase);
    if (fase.length === 0) {
        const abisua = document.createElement('h1');
        const itxaron = document.createElement('img');
        itxaron.src = "../pics/itxaron.svg";
        abisua.innerHTML = "Oraindik ez da fasea hasi";
        document.body.appendChild(abisua);
        document.body.appendChild(itxaron);
        return;
    }
    const idEpaimahaikidea = await ep.getEpailearenEpaimahaiak();
    
    const taulaContainer = document.getElementById('ebaluazioak');

    if(!idEpaimahaikidea){
        taulaContainer.innerHTML = "";
        
        const abisua = document.createElement('h1');
  
        abisua.textContent = "Fase honetan ezin duzu bozkatu";
        const img = document.createElement('img');
        img.src = "../pics/debekatuta.svg";
        img.alt = "Debekatuta";
        img.style.width = "200px";
        img.style.height = "200px";
        
       taulaContainer.appendChild(abisua);
       document.body.appendChild(img);
        return;
      }
    
    const h1 = document.getElementById('h1');
    h1.textContent = `${fase.izena} ebaluatu`;
    const fasearenEzaugarriak = await f.getFasearenEzaugarriak(); 
    const baloratzekoTaldeak = await t.getBaloratuGabekoTaldeak();
    
    
    if(baloratzekoTaldeak === null){
        const abisua = document.createElement('h1');
        abisua.innerHTML = "Talde guztiak baloratu dira";
        document.body.appendChild(abisua);
        document.getElementById('ebaluazioak').innerHTML = "";
    
        return;
    }
    document.getElementById('menuTaldea').innerHTML = "";
    document.getElementById('menuTaldea').appendChild(taldeenMenua(baloratzekoTaldeak));
    document.getElementById('taldeaMenua').addEventListener('change', (event) => {
        event.preventDefault();
        const aux = document.getElementById('aux');
        aux.hidden = false;
 } );
    const taula = document.getElementById('ebaluazioaTaula');
    taula.innerHTML = "";
    
    const zutabe = taula.insertRow();
    zutabe.insertCell().textContent = "Ezaugarria";
    zutabe.insertCell().textContent = "Balorazioa";
    
    const lerroa = taula.insertRow();
    lerroa.insertCell().appendChild( ezaugarrienTaula(fasearenEzaugarriak));
    lerroa.insertCell().appendChild( balorazioenTaula(fasearenEzaugarriak));
    
    document.getElementById('ebaluazioaForm').addEventListener('submit', (event) => ebaluazioaSortu(event, idEpaimahaikidea));

}


function ezaugarrienTaula(ez) {
    const div = document.createElement('div');
    div.className = 'inputContainer';
    const table = document.createElement('table');
    table.id = "balorazioenTaula";
    table.className = "inputTaula";
    
    ez.forEach(ezaugarria => {
        const tr = table.insertRow();
        tr.className = "ilara";
        tr.dataset.idezaugarria = ezaugarria.idEzaugarria;
        
      
        const tdName = tr.insertCell();
        tdName.textContent = ezaugarria.izena;
        
        tr.appendChild(tdName);
        table.appendChild(tr);
    });
    
    div.appendChild(table);
    return div;
}




function balorazioenTaula(fasearenEzaugarriak) {
    const div = document.createElement('div');
    div.className = 'inputContainer';
    const table = document.createElement('table');
    table.id = "ezaugarrienTaula";
    table.className = "inputTaula";
    
   
    fasearenEzaugarriak.forEach(ezaugarria => {
        const tr = table.insertRow();
        const td = tr.insertCell();
        const inpt = document.createElement('input');
        
        inpt.type = "number";
        inpt.name = "balorazioa";
        inpt.placeholder = `${ezaugarria.puntuakMin}-${ezaugarria.puntuakMax} arteko balioa`;
        inpt.required = true;
        inpt.step = "any";
        td.appendChild(inpt);
        tr.appendChild(td);
        table.appendChild(tr);
    });
    div.appendChild(table);
    return div;
}



function taldeenMenua(baloratzekoTaldeak) {
        const menu = document.createElement('div');
        const izenburua = document.createElement('h1');
        izenburua.textContent = `Taldea`;
       const select = document.createElement('select');
       select.id = 'taldeaMenua';
       const defaultOption = document.createElement('option');
       defaultOption.value = '';
       defaultOption.textContent = 'Aukeratu talde bat';
       select.appendChild(defaultOption);

        baloratzekoTaldeak.forEach(taldea => {
            const option = document.createElement('option');
            option.value = taldea.idTaldea;
            option.textContent = taldea.izena;
            select.appendChild(option);
            
        });
        menu.appendChild(izenburua);
        menu.appendChild(select);
        return menu;

}


