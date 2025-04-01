import * as tx from "./txapelketa.js";
import * as ez from "./ezaugarria.js";
import * as eb from "./ebaluazioa.js";
import * as ta from "./taldea.js"
import * as f from "./fasea.js";
import {taldeenTaula} from "./admin.js";        
window.addEventListener('DOMContentLoaded', () => {
    faseakBistaratu();
});

export async function faseakBistaratu() {
   
    
    const faseakTaula = document.getElementById("faseakTaula");
    faseakTaula.classList.add("taula");
    const faseak = await tx.getTxapelketaAktiboarenInfo();
    if(faseak.length === 0){
        const mezua = document.createElement('h1');
        mezua.textContent = 'Ez dago txapelketa aktiborik';
        document.body.appendChild(mezua);
        return false;
    }
    console.log(faseak);
    const row1 = faseakTaula.insertRow();
    row1.insertCell().textContent = "Fase Izena";
    row1.insertCell().textContent = "Hasiera";
    row1.insertCell().textContent = "Amaiera";
    row1.insertCell().textContent = "Egoera";
    row1.insertCell().textContent = "Irizpidea";
    row1.insertCell().innerHTML = "<div class = 'ezaugContainer'><table ><tr><td>Ezaugarria</td><td>Ponderazioa</td></tr></table></div>";
    row1.insertCell().textContent = "Parte hartzen duten epaileak";
    row1.insertCell().innerHTML = "Fasearen ebaluazioak";
    faseak.forEach((fase) => {
        const row = faseakTaula.insertRow();
        if (parseInt(fase.egoera) === 1) {
            row.classList.add('highlight');
        }
        const eza = fase.ezaugarriak || [];
        //console.log(eza);
        const ep = fase.epaimahaikideak || [];
        
        row.insertCell().textContent = fase.izena || "";
        if(fase.hasiera === null){
            row.insertCell().textContent = "-";
        }
        else{
        row.insertCell().textContent = fase.hasiera.split('T')[0]+" "+fase.hasiera.split('T')[1].split('.')[0]|| "";
    }
        if(fase.amaiera === null){
            row.insertCell().textContent = "-";
        }
        else{
        row.insertCell().textContent = fase.amaiera.split('T')[0]+" "+fase.amaiera.split('T')[1].split('.')[0]|| "";}
        const buttonEgoera = document.createElement('button');
        buttonEgoera.id = `buttonEgoera-${fase.idFasea}`;
        //console.log(fase.egoera);
        if (parseInt(fase.egoera) === 0) {
            buttonEgoera.textContent = "Hasi";
        } else if (parseInt(fase.egoera) === 1) {
            buttonEgoera.textContent = "Bukatu";
        } else {
            buttonEgoera.hidden = true;
        }
        row.insertCell().innerHTML = fase.egoera ===0 ?  buttonEgoera.outerHTML : fase.egoera ===1 ? buttonEgoera.outerHTML : "<div>Amaituta</div>";
        row.insertCell().textContent = fase.irizpidea || "-";
        row.insertCell().innerHTML = eza.map(item => `<div class = 'ezaugContainer' ><table id ="ezaugarria-${item.idEzaugarria}"><tr><td>${item.izena || "-"}</td></tr></table></div>`).join('\n');
        row.insertCell().innerHTML = ep.map(item => `<div class = 'epaimahaikideaContainer'><table id = "epaimahaikidea-${item.idEpaimahaikidea}"><tr><td>${item.username || ""}</td></tr></table></div>`).join('\n');
        row.insertCell().innerHTML = "<button id = 'fasearenEbaluazioak-"+fase.idFasea+"'>ikusi</button>";
        const buttonEg = document.getElementById(`buttonEgoera-${fase.idFasea}`);
        const buttonEb = document.getElementById(`fasearenEbaluazioak-${fase.idFasea}`);
        if(buttonEb !== null){
            buttonEb.addEventListener('click', (event) => fasearenEbaluazioakBistaratu(event,fase.idFasea));
        }
        if(buttonEg !== null){
            buttonEg.addEventListener('click', (event) => aldatuEgoera(event, fase.idFasea, fase.egoera));
        }
        if(eza.length >0){
        eza.forEach(ezaugarria => {
            ezaugarriaBistaratu(ezaugarria);
        });
    }
    if(ep.length >0){   
        ep.forEach(epaimahaikidea => {
           epaimahaikideaBistaratu(epaimahaikidea);
            
        });
    }
    });
}

async function ezaugarriaBistaratu(ezaugarria) {
  
    const taula = document.getElementById("ezaugarria-"+ezaugarria.idEzaugarria);
    taula.innerHTML = "";
    const row2 = taula.insertRow();
    row2.insertCell().textContent = `${ezaugarria.izena} (${ezaugarria.puntuakMin}-${ezaugarria.puntuakMax})`;
    row2.insertCell().textContent = "% "+100* parseFloat(ezaugarria.ponderazioa) || "";
    taula.removeAttribute("data-idEzaugarria");
}


async function epaimahaikideaBistaratu(epaimahaikidea){

    const taula = document.getElementById("epaimahaikidea-"+epaimahaikidea.idEpaimahaikidea);
    taula.innerHTML = "";
    const row1 = taula.insertRow();
    row1.insertCell().textContent = epaimahaikidea.username;
    if(await eb.getEpailearenEbaluazioakFaseka(epaimahaikidea.idEpaimahaikidea))
    row1.insertCell().innerHTML = "<button id = 'buttonEbaluazioak-"+epaimahaikidea.idEpaimahaikidea+"'>Egindako ebaluazioak</button>";
    else
    row1.insertCell().innerHTML = "-";
    if(await ta.getBaloratuGabekoTaldeak(epaimahaikidea.idEpaimahaikidea))
    row1.insertCell().innerHTML = "<button id = 'buttonTaldeak-"+epaimahaikidea.idEpaimahaikidea+"'>Baloratzeke</button>";
    else
    row1.insertCell().innerHTML = "-";
   
    const button1 = document.getElementById('buttonEbaluazioak-'+epaimahaikidea.idEpaimahaikidea);
    const button2 = document.getElementById('buttonTaldeak-'+epaimahaikidea.idEpaimahaikidea);
   
    if (button2) {
        button2.addEventListener('click', (event) => taldeakBistaratu(event, epaimahaikidea)); 
    }
    if (button1) {
        button1.addEventListener('click', (event) => ebaluazioakBistaratu(event, epaimahaikidea)); 
    }
    }


    async function taldeakBistaratu(event, epaimahaikidea) {
        event.preventDefault();
        const taldeak = await ta.getBaloratuGabekoTaldeak(epaimahaikidea.idEpaimahaikidea);
        console.log(taldeak);
        taldeak.sort((a, b) => {
            if (a.egoera < b.egoera) return -1;
            if (a.egoera > b.egoera) return 1;
            return 0;
        });
    
        const modal = document.createElement("div");
        const modalContent = document.createElement("div");
        const overlay = document.createElement("div");
       
        
        const titulua = document.createElement('h1');
        titulua.textContent = epaimahaikidea.username+ " epaileari baloratzeko geratzen zaizkion taldeak"
        overlay.id = "modalOverlay";
        modal.id = "modal";
        modalContent.id = "modalContent";
       
        if(taldeak.length === 0){
            
            titulua.textContent = 'Talde guztiak baloratu dira';
            modalContent.appendChild(titulua);
        }
        else{
       
        modalContent.appendChild(titulua);
        taldeenTaula(modalContent, taldeak,0);
       
        }
        const closeButton = document.createElement("button");
        closeButton.textContent = "Itxi";
        closeButton.style.marginTop = "20px";
        closeButton.addEventListener("click", () => {
            document.body.removeChild(overlay);
            document.body.removeChild(modal);
            document.getElementById("content").classList.remove("blur");
        });
    
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
    
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        document.getElementById("content").classList.add("blur");
        return;
    }
    


async function ebaluazioakBistaratu(event, epaimahaikidea) {
    event.preventDefault(); 
    const modal = document.createElement("div");
    const modalContent = document.createElement("div");
    const overlay = document.createElement("div");
    const ebaluazioakTaula = document.createElement("table");
    ebaluazioakTaula.classList.add('taula');
    const faseakTaula = document.getElementById('faseakTaula');
    overlay.id = "modalOverlay";
    modal.id = "modal";
    modalContent.id = "modalContent";
    const titulua = document.createElement('h1');
    const ebaluazioak = await eb.getEpailearenEbaluazioakFaseka(epaimahaikidea.idEpaimahaikidea);
    if (ebaluazioak.length === 0) {
        modalContent.textContent = "Ez dago ebaluaziorik";
    } else {
        titulua.textContent = epaimahaikidea.username+" epailearen ebaluazioak";
        const headerRow = ebaluazioakTaula.insertRow();
        headerRow.insertCell().textContent = "Puntuazioa";
        headerRow.insertCell().textContent = "Data";
        headerRow.insertCell().textContent = "Ezaugarria";
        headerRow.insertCell().textContent = "Taldea";

        for (const ebaluazioa of ebaluazioak) {
            const row = ebaluazioakTaula.insertRow();
            faseakTaula.setAttribute('data', ebaluazioa.idTaldea + "-" + ebaluazioa.idEzaugarria);
            const ezaugarria = await ez.getEzaugarria(ebaluazioa.idEzaugarria);
            const taldea = await ta.getTaldea(ebaluazioa.idTaldea);
            console.log(ezaugarria);
            console.log(taldea);
            row.insertCell().textContent = ebaluazioa.puntuak;
           
            row.insertCell().textContent =  ebaluazioa.noiz.split('T')[0]+" "+ebaluazioa.noiz.split('T')[1].split('.')[0];
            row.insertCell().textContent = ezaugarria.izena;
            row.insertCell().textContent = taldea.izena;
        }
        
        modalContent.appendChild(titulua);
        modalContent.appendChild(ebaluazioakTaula);
    }

    const closeButton = document.createElement("button");
    closeButton.textContent = "Itxi";
    closeButton.style.marginTop = "20px";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(overlay);
        document.body.removeChild(modal);
        document.getElementById("content").classList.remove("blur");
    });

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    document.getElementById("content").classList.add("blur");
}


async function aldatuEgoera(event, idFasea, egoera) {
    event.preventDefault();
        const data = {
            idFasea: idFasea,
            egoera: egoera,
            data: new Date().toISOString().split('T')[0],
        };
    await f.egoeraAldatu(data);
    const egoeraButton = document.getElementById(`buttonEgoera-${event.target.id.split('buttonEgoera-')[1]}`);
    if (egoeraButton) {
        if(event.target.textContent === 'Hasi'){
            egoeraButton.textContent = 'Bukatu';
        }
        else{
            egoeraButton.textContent = 'Bukatuta';
            egoeraButton.disabled = true;
        }
    }


}


export async function faseAktiboarenEbaluazioakBistaratu(){
    const ebaluazioak = await eb.getFaseAktiboarenEbaluazioak();
    const taula = document.createElement('table');
    const headerRow = taula.insertRow();
    headerRow.insertCell().textContent = "Epailea";
    headerRow.insertCell().textContent = "Ezaugarria";
    headerRow.insertCell().textContent = "Taldea";
    headerRow.insertCell().textContent = "Puntuazioa";
    headerRow.insertCell().textContent = "Data";
    ebaluazioak.forEach(ebaluazioa => {
        const row = taula.insertRow();
        row.insertCell().textContent = ebaluazioa.username;
        row.insertCell().textContent = ebaluazioa.ezaugarriaIzena;
        row.insertCell().textContent = ebaluazioa.taldeaIzena;
        row.insertCell().textContent = ebaluazioa.puntuak;
        row.insertCell().textContent =  ebaluazioa.noiz.split('T')[0]+" "+ebaluazioa.noiz.split('T')[1].split('.')[0];;
    });

    document.body.appendChild(taula);
   
}

export async function fasearenEbaluazioakBistaratu(event,idFasea){
    event.preventDefault();
   
    const modal = document.createElement("div");
    const modalContent = document.createElement("div");
    const overlay = document.createElement("div");
    overlay.id = "modalOverlay";
    modal.id = "modal";
    modalContent.id = "modalContent";
    const ebaluazioak = await eb.getFasearenEbaluazioak(idFasea);
    if (ebaluazioak.length === 0) {
        modalContent.textContent = "Ez dago ebaluaziorik";
        modal.appendChild(modalContent);
       
    }
    
    else{
    const taula = document.createElement('table');
    taula.classList.add('taula');
    const headerRow = taula.insertRow();
    headerRow.insertCell().textContent = "Epailea";
    headerRow.insertCell().textContent = "Ezaugarria";
    headerRow.insertCell().textContent = "Taldea";
    headerRow.insertCell().textContent = "Puntuazioa";
    headerRow.insertCell().textContent = "Data";
    ebaluazioak.forEach(ebaluazioa => {
        const row = taula.insertRow();
        row.insertCell().textContent = ebaluazioa.username;
        row.insertCell().textContent = ebaluazioa.ezaugarriaIzena;
        row.insertCell().textContent = ebaluazioa.taldeaIzena;
        row.insertCell().textContent = ebaluazioa.puntuak;
        row.insertCell().textContent =  ebaluazioa.noiz.split('T')[0]+" "+ebaluazioa.noiz.split('T')[1].split('.')[0];;
    });

   modalContent.appendChild(taula);
}
   const closeButton = document.createElement("button");
    closeButton.textContent = "Itxi";
    closeButton.style.marginTop = "20px";
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    document.getElementById("content").classList.add("blur");


    closeButton.addEventListener("click", () => {
        document.body.removeChild(overlay);
        document.body.removeChild(modal);
        document.getElementById("content").classList.remove("blur");
    
});
   
    

   }

