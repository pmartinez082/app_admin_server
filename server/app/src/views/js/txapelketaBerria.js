import {txapelketaBistaratu} from './admin.js';
import * as tx from "./txapelketa.js";
import * as u from "./user.js";
import * as k from "./konstanteak.js";
import * as ez from "./ezaugarria.js";
import * as ep from "./epaimahaikidea.js";
import * as f from "./fasea.js";

var ezaugarriak = [];

document.getElementById('sortu').addEventListener('click', async (event) => {
    await txapelketaSortu(event);
});
document.getElementById('amaitu').addEventListener('click', (event) => {
    faseaSortu(event);
    window.location.href = '../../txapelketak';
});

export async function txapelketaSortu(event){
    const form = document.getElementById('txapelketaForm');
    event.preventDefault();

    const h1 = document.getElementById("abisua");
    if(h1) document.body.removeChild(h1);
    const txBerria = new k.Txapelketa(null, document.getElementById('lekua').value, document.getElementById('txapelketaIzena').value, document.getElementById('dataOrdua').value,0);
    const e = await tx.createNewTxapelketa(txBerria);
    console.log(e);
   if(!e){

        const abisua = document.createElement('h1');
        abisua.id = "abisua";
        abisua.innerHTML = "Errorea dago sartu dituzun datuetan";
        abisua.style.textAlign = "center";
        abisua.style.padding = "200px";
        document.body.appendChild(abisua);
        return;
    }
    form.reset();
    document.getElementById('txapForm').hidden = true;
    document.getElementById('sortu').hidden = true;
    faseakForm(e);

}

export async function faseakForm(idTxapelketa) {
    const epaileak = await u.getEpaileak();
    const l_ = await tx.getTxapelketa(idTxapelketa);

    if (l_ === null) {
        const abisua = document.createElement('h1');
        abisua.innerHTML = "Editatzen ari zaren txapelketa ezabatu da";
        return;
    }

    const faseakDiv = document.getElementById('faseakDiv');
    faseakDiv.hidden = false;
    faseakDiv.innerHTML = "";
    
    // Crear el formulario y los ks
    const faseakForm = document.createElement('form');
    faseakForm.id = 'faseakForm';
    faseakForm.className = 'faseakDiv';
    
    // k 1
    const k1 = document.createElement('div');
    k1.id = 'k1';
    k1.className = 'k1';
    k1.innerHTML = `
        <h2>Fasea</h2>
        <div>Izena</div>
        <input type="text" id="faseIzena" required placeholder="Fase izena">
        <div>Irizpidea</div>
        <input type="text" id="faseIrizpidea" required placeholder="Fase irizpidea">
    `;
    
    // k 2
    const k2 = document.createElement('div');
    k2.id = 'k2';
    k2.className = 'k2';
    k2.innerHTML = `
        <h2>Epaimahaikideak</h2>
        <div id="epaileakCheckboxContainer">${epaileakCheckbox(epaileak)}</div>
    `;
    
    // k 3
    const k3 = document.createElement('div');
    k3.id = 'k3';
    k3.className = 'k3';
    const izenburua = document.createElement('h2');
    izenburua.innerHTML = "Ezaugarriak";
    k3.appendChild(izenburua);
    k3.appendChild(ezaugarrienTaula1());
    
    // k 4
    const k4 = document.createElement('div');
    k4.id = 'k4';
    k4.className = 'k4';
    k4.appendChild(ezaugarrienTaula2());
    
    
    faseakForm.appendChild(k1);
    faseakForm.appendChild(k2);
    faseakForm.appendChild(k3);
    faseakForm.appendChild(k4);
    
    
    const button = document.createElement('button');
    button.setAttribute('type', 'click');
    button.id = "gordeHurrengoa";
    button.textContent = 'Gorde eta hurrengo fasea konfiguratu';
    
    const button2 = document.createElement('button');
    button2.setAttribute('type', 'click');
    button2.textContent = 'Gorde eta amaitu';
    button2.id = "gordeAmaitu";
    
    faseakForm.appendChild(button);
    faseakForm.appendChild(button2);
    
    faseakDiv.appendChild(faseakForm);
    
    faseakForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const targetId = event.submitter.id;
        if(targetId === "gordeHurrengoa") faseaSortu(event, 1, idTxapelketa);
        else faseaSortu(event, 0, idTxapelketa);
    });

    // Mostrar el txapelketa
    txapelketaBistaratu(0, idTxapelketa);
}

function loadEzaugarriakTmp() {
    document.getElementById('ezaugarriakDiv').hidden = false;

    const data = {
           
            izena: document.getElementById('ezaugarriaIzena1').value,
            puntuakMin: document.getElementById('ezaugarriaMin1').value,
            puntuakMax: document.getElementById('ezaugarriaMax1').value,
            idFasea: null,
            ponderazioa: document.getElementById('ponderazioa1').value 
        };
    ezaugarriak.push(data);
        console.log(ezaugarriak);
    const ezaugarriakTaula = document.getElementById('ezaugarriakTaula');
   
        console.log(data);
    const row = ezaugarriakTaula.insertRow();
    row.insertCell().textContent = data.izena;
    row.insertCell().textContent = data.puntuakMin;
    row.insertCell().textContent = data.puntuakMax;
    row.insertCell().textContent = data.ponderazioa;
    
    console.log(ezaugarriak.length);
    if (ezaugarriak.length > 1) {
        const ezaugButton2 = document.createElement("button");
        ezaugButton2.type = "button";
        ezaugButton2.innerHTML = "Kendu Ezaugarria";
        

        ezaugButton2.onclick = (event) => {
            event.preventDefault();
            const rowToDelete = event.target.closest("tr"); 
            if (rowToDelete) {
                ezaugarriakTaula.deleteRow(rowToDelete.rowIndex);
                ezaugarriak.splice(ezaugarriak.indexOf(ezaugarriak.find(ezaugarria => ezaugarria.idEzaugarria === rowToDelete.id)));
                console.log(ezaugarriak);
            }
        };

       
        row.insertCell().appendChild(ezaugButton2);
    }
    

    
    document.getElementById('ezaugarriaIzena1').value = "";
    document.getElementById('ezaugarriaMin1').value = "";
    document.getElementById('ezaugarriaMax1').value = "";
    document.getElementById('ponderazioa1').value = "";

}


function ezaugarrienTaula1() {
    
    const ezaugarriakDiv = document.createElement('div');
   const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');

    div1.innerHTML = "Izena";
    const i1 = document.createElement('input');
    i1.type = "text";
    i1.id = "ezaugarriaIzena1";
    i1.required = true;
    i1.placeholder = "Ezaugarriaren izena";
    
    div2.appendChild(i1);
   
    div3.innerHTML = "Ponderazioa";
    const i2 = document.createElement('input');
    i2.type = "number";
    i2.step = 0.01;
    i2.id = "ponderazioa1";
    i2.required = true;
    i2.placeholder = "0-1 arteko balioa";
    const button = document.createElement('button');
    button.innerText = "Gehitu Ezaugarria";
    button.id = "ezaugButton";
    button.type = "button";
    div4.appendChild(i2);
    div4.appendChild(button);
   
    button.onclick = () => {
        loadEzaugarriakTmp();
    };




    ezaugarriakDiv.appendChild(div1);
    ezaugarriakDiv.appendChild(div2);
    ezaugarriakDiv.appendChild(div3);
    ezaugarriakDiv.appendChild(div4);


    /*

    const ezaugButton = document.createElement('button');
    const ezaugButton2 = document.createElement('button');
    ezaugButton2.id = "ezaugButton2";
    ezaugButton.id = "ezaugButton";
    ezaugButton2.textContent = "Kendu Ezaugarria";
    ezaugButton.textContent = "Gehitu Ezaugarria";
    ezaugButton.type = "button";
    const ezaugrow22 = ezaugarriakTable.insertRow();
    ezaugrow22.insertCell().innerHTML = "<input type='text' name='ezaugarriaIzena' required  placeholder='Ezaugarriaren izena'></input>";
    ezaugrow22.insertCell().innerHTML = "<input type='number' name='ezaugarriaMin' required  placeholder='puntuazio minimoa'></input>";
    ezaugrow22.insertCell().innerHTML = "<input type='number' name='ezaugarriaMax' required placeholder='puntuazio maximoa'></input>";
    ezaugrow22.insertCell().innerHTML = "<input type='number' step = 0.01 name='ponderazioa' required placeholder='0-1 arteko balioa'></input>";
    ezaugrow22.insertCell().appendChild(ezaugButton);
    ezaugButton2.onclick = () => {
        if(ezaugarriakTable.rows.length > 2){
        ezaugarriakTable.deleteRow(ezaugarriakTable.rows.length -1);
        ezaugarriakTable.rows[ezaugarriakTable.rows.length -1].cells[4].appendChild(ezaugButton);
        ezaugarriakTable.rows[ezaugarriakTable.rows.length -1].cells[4].appendChild(ezaugButton2);
        }
    };
 
    ezaugButton.onclick = () => {

        
    const ezaugrow2 = ezaugarriakTable.insertRow();
    ezaugrow2.insertCell().innerHTML = "<input type='text' name='ezaugarriaIzena' placeholder='Ezaugarriaren izena' required value = ''></input>";
    ezaugrow2.insertCell().innerHTML = "<input type='number' name='ezaugarriaMin' placeholder='puntuazio minimoa' required value = ''></input>";
    ezaugrow2.insertCell().innerHTML = "<input type='number' name='ezaugarriaMax' placeholder='puntuazio maximoa' required value = ''></input>";
    ezaugrow2.insertCell().innerHTML = "<input type='number' step =  0.01 name='ponderazioa' placeholder='0-1 arteko balioa' required value = ''></input>";
     const bCell = ezaugrow2.insertCell();
     bCell.appendChild(ezaugButton);
     bCell.appendChild(ezaugButton2);
     
    };
*/
   
    //ezaugarriakDiv.appendChild(ezaugButton, ezaugButton2);
  
    return ezaugarriakDiv;
}

export function ezaugarrienTaula2() {
    
    const ezaugarriakDiv = document.createElement('div');
   const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');

    div1.innerHTML = "Puntuazio maximoa";
    const i1 = document.createElement('input');
    i1.id = "i1";
    i1.type = "number";
    i1.id = "ezaugarriaMax1";
    i1.required = true;
    i1.step = 0.01;
    i1.placeholder = "puntuazio maximoa";
    
    div2.appendChild(i1);
   
    div3.innerHTML = "Puntuazio minimoa";
    const i2 = document.createElement('input');
    i2.id = "i2";
    i2.type = "number";
    i2.id = "ezaugarriaMin1";
    i2.required = true;
    i2.step = 0.01;
    i2.placeholder = "puntuazio minimoa";
    
    div4.appendChild(i2);
    ezaugarriakDiv.appendChild(div1);
    ezaugarriakDiv.appendChild(div2);
    ezaugarriakDiv.appendChild(div3);
    ezaugarriakDiv.appendChild(div4);


    return ezaugarriakDiv;
}
   /*
export async function faseakForm(idTxapelketa) {
    const mezua = document.getElementById("abisua");    
    const b1 = document.getElementById("gordeHurrengoa");
    const b2 = document.getElementById("gordeAmaitu");
    if(b1) b1.remove();
    if(b2) b2.remove();
    if(mezua) mezua.remove();
    const epaileak = await u.getEpaileak();
    const l_ = await tx.getTxapelketa(idTxapelketa);

    if (l_ === null) {
        const abisua = document.createElement('h1');
        abisua.innerHTML = "Editatzen ari zaren txapelketa ezabatu da";
        return;
    }

    const taulaContainer = document.getElementById('faseenTaula');
    const formFaseak = document.getElementById('faseakForm');
    const taula = document.getElementById('faseakTaula');
    taula.innerHTML = "";
   
    const row1 = taula.insertRow();
  
  
    row1.insertCell().textContent = "Fase izena";
    row1.insertCell().textContent = "Irizpidea";
    row1.insertCell().textContent = "Ezaugarria";
    row1.insertCell().textContent = "Epaimahaikideak";

    const row2 = taula.insertRow();
    row2.insertCell().innerHTML = "<input type='text' id='faseIzena' required placeholder='Fase izena'></input>";
    row2.insertCell().innerHTML = "<input type='text' id='faseIrizpidea' required placeholder='Fase irizpidea'></input>";

   
    
    const ezaugarriakDiv = document.createElement('div');
    const ezaugarriakTable = document.createElement('table');
    ezaugarriakTable.classList.add('taula');
    const ezaugarriakHeaderRow = ezaugarriakTable.insertRow();
    ezaugarriakHeaderRow.insertCell().textContent = "Izena";
    ezaugarriakHeaderRow.insertCell().textContent = "Puntuazio minimoa";
    ezaugarriakHeaderRow.insertCell().textContent = "Puntuazio maximoa";
    ezaugarriakHeaderRow.insertCell().textContent = "Ponderazioa";
    const ezaugButton = document.createElement('button');
    const ezaugButton2 = document.createElement('button');
    ezaugButton2.id = "ezaugButton2";
    ezaugButton.id = "ezaugButton";
    ezaugButton2.textContent = "Kendu Ezaugarria";
    ezaugButton.textContent = "Gehitu Ezaugarria";
    ezaugButton.type = "button";
    const ezaugrow22 = ezaugarriakTable.insertRow();
    ezaugrow22.insertCell().innerHTML = "<input type='text' name='ezaugarriaIzena' required  placeholder='Ezaugarriaren izena'></input>";
    ezaugrow22.insertCell().innerHTML = "<input type='number' name='ezaugarriaMin' required  placeholder='puntuazio minimoa'></input>";
    ezaugrow22.insertCell().innerHTML = "<input type='number' name='ezaugarriaMax' required placeholder='puntuazio maximoa'></input>";
    ezaugrow22.insertCell().innerHTML = "<input type='number' step = 0.01 name='ponderazioa' required placeholder='0-1 arteko balioa'></input>";
    ezaugrow22.insertCell().appendChild(ezaugButton);
    ezaugButton2.onclick = () => {
        if(ezaugarriakTable.rows.length > 2){
        ezaugarriakTable.deleteRow(ezaugarriakTable.rows.length -1);
        ezaugarriakTable.rows[ezaugarriakTable.rows.length -1].cells[4].appendChild(ezaugButton);
        ezaugarriakTable.rows[ezaugarriakTable.rows.length -1].cells[4].appendChild(ezaugButton2);
        }
    };
 
    ezaugButton.onclick = () => {

        
    const ezaugrow2 = ezaugarriakTable.insertRow();
    ezaugrow2.insertCell().innerHTML = "<input type='text' name='ezaugarriaIzena' placeholder='Ezaugarriaren izena' required value = ''></input>";
    ezaugrow2.insertCell().innerHTML = "<input type='number' name='ezaugarriaMin' placeholder='puntuazio minimoa' required value = ''></input>";
    ezaugrow2.insertCell().innerHTML = "<input type='number' name='ezaugarriaMax' placeholder='puntuazio maximoa' required value = ''></input>";
    ezaugrow2.insertCell().innerHTML = "<input type='number' step =  0.01 name='ponderazioa' placeholder='0-1 arteko balioa' required value = ''></input>";
     const bCell = ezaugrow2.insertCell();
     bCell.appendChild(ezaugButton);
     bCell.appendChild(ezaugButton2);
     
    };

    ezaugarriakDiv.appendChild(ezaugarriakTable);
    ezaugarriakDiv.appendChild(ezaugButton, ezaugButton2);
    row2.insertCell().appendChild(ezaugarriakDiv);
    
    row2.insertCell().innerHTML = epaileakCheckbox(epaileak);
    taula.classList.add("taula");
    formFaseak.appendChild(taula);
    taulaContainer.appendChild(formFaseak);

    const button = document.createElement('button');
    button.setAttribute('type', 'click');
    button.id = "gordeHurrengoa"
    button.textContent = 'Gorde eta hurrengo fasea konfiguratu';
    const button2 = document.createElement('button');
    button2.setAttribute('type', 'click');
    button2.textContent = 'Gorde eta amaitu';
    button2.id = "gordeAmaitu";

    formFaseak.appendChild(button);
    formFaseak.appendChild(button2);
    formFaseak.addEventListener('submit', async (event) =>{
        event.preventDefault();
        const targetId = event.submitter.id;
        if(targetId === "gordeHurrengoa") faseaSortu(event,1, idTxapelketa);
        else faseaSortu(event,0, idTxapelketa);
        
    });


    txapelketaBistaratu(0,idTxapelketa);
}
*/
function epaileakCheckbox(epaileak) {
    let htmlString = "<table style='border-collapse: collapse;'><tr>";
    epaileak.forEach((epaile, index) => {
        const checkbox = `<input type='checkbox' id='epaile-${epaile.username}' name='checkbox' value='${epaile.username}'>${epaile.username}`;
        htmlString += `<td style='border: none;'>${checkbox}</td>`;
        if ((index + 1) % 3 === 0) {
            htmlString += "</tr><tr>";
        }
    });
    htmlString += "</tr></table>";
    return htmlString;
}
export async function faseaSortu(event, i, idTxapelketa){
  
    event.preventDefault();
    const taulaContainer = document.getElementById('faseenTaula');
    const taula = document.getElementById('faseakTaula');
    event.preventDefault();
    const epaileakCheck = document.getElementsByName('checkbox');

    if(!checkCheckbox(epaileakCheck)||!(document.getElementById('faseIzena').value)||!(document.getElementById('faseIrizpidea').value)){
        const mezua = document.createElement('h1');
        taula.innerHTML = "";
           const ezabatu = taulaContainer.querySelectorAll(":not(table)"); 
    ezabatu.forEach(e => {
        e.remove();
    });
        mezua.id = "abisua";
        mezua.textContent = "Atal guztiak bete behar dituzu";
        taulaContainer.appendChild(mezua);
        
        faseakForm(idTxapelketa);
        return;
    }
  
    let epaimahakideak = [];
        const data = {
           
            idTxapelketa: idTxapelketa,
            izena: document.getElementById('faseIzena').value,
            egoera: "0",
            irizpidea: document.getElementById('faseIrizpidea').value
        };

    const idFasea = await f.createNewFasea(data);


    const eza =await ez.createNewEzaugarria(ezaugarriak,idFasea);
    console.log(eza);
    if(!eza){
        const abisua = document.createElement('h1');
        abisua.id = "abisua";
        abisua.innerHTML = "Ezaugarrien ponderazioek bat gehitu behar dute";
        document.body.appendChild(abisua);
        return;
    }
    const checkEpaileak = document.getElementsByName('checkbox');
    checkEpaileak.forEach(cE => {
        if (cE.checked) {
            epaimahakideak.push(new k.Epaimahaikidea(0, cE.value,0));
        }
    
    });
 
    await ep.createNewEpaimahaikidea(idFasea);
    
    if(i === 0){
        window.location.href = '../../txapelketak';
    }
   
    document.getElementById('faseakForm').reset();
    document.getElementById('ezaugarriakDiv').hidden = true;

    ezaugarriak = [];
    faseakForm(idTxapelketa);
   

    

}




export function checkCheckbox(epaileak){
    for (const epaile of epaileak) {
        if(epaile.checked){
            return true;}
        }
        return false;
}


