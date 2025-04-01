
import * as f from "./fasea.js";
import * as u from "./user.js";
import * as tx from "./txapelketa.js";
import * as ep from "./epaimahaikidea.js";
import * as ez from "./ezaugarria.js";
import * as eb from "./ebaluazioa.js";
import * as ta from "./taldea.js"
import * as k from "./konstanteak.js";


//txapelketaBerria.html, txapelketaEzabatu eta txapelketaView.html
//***********************************************

 
export function getEzaugarriakArray(idFasea){

    const ezaugarriak = [];
    const ezaugarriaIzena = document.getElementsByName('ezaugarriaIzena');
    const eMin = document.getElementsByName('ezaugarriaMin');
    const eMax = document.getElementsByName('ezaugarriaMax');
    const ponderazioa = document.getElementsByName('ponderazioa');
    var b = 0;
    for (var i = 0; i < ezaugarriaIzena.length; i = i+1) {
        if(ponderazioa[i].value !== ""){
        b += parseFloat(ponderazioa[i].value);
        }
        //console.log(b);
        if (ezaugarriaIzena[i].value !== "" && eMin[i].value !== "" && eMax[i].value !== "") {
            ezaugarriak.push(new konstanteak.Ezaugarria(0,ezaugarriaIzena[i].value, eMax[i].value, eMin[i].value, idFasea, ponderazioa[i].value));
        }
    }
    if(parseInt(b) !== 1){
    return false;
    }
    return ezaugarriak;
}
export async function txapelketaBistaratu(i, idTxapelketa) {


    try {
        const info = await tx.getInfoGuztia();
        console.log(info);
        const txapelketa = await tx.getTxapelketarenInfoGuztia(idTxapelketa);
        console.log(txapelketa);
        var txapelketak;
        if (i === 0) txapelketak = txapelketa;
        else txapelketak = info;
        console.log(txapelketak);

        if (!txapelketak || txapelketak.length === 0) {
            const hutsik = document.createElement('h1');
            hutsik.textContent = "Ez dago txapelketarik";
            document.body.appendChild(hutsik);
            return;
        }

        const txapelketakDiv = document.getElementById("txapelketakDiv");
        txapelketakDiv.innerHTML = "";
        const taula = document.createElement('table');
        taula.id = "txapelketak";
        taula.classList.add('taula');
        const row1 = taula.insertRow();
        const id = row1.insertCell();
        id.id = "idFasea";
        id.hidden = true;
        row1.insertCell().textContent = "Txapelketa Izena";
        row1.insertCell().textContent = "Data";
        row1.insertCell().textContent = "Lekua";
        row1.insertCell().textContent = "Faseak";
        if (i === 2) row1.insertCell().textContent = "Ekintza";
        txapelketak.forEach((txapelketa) => {
            const row2 = taula.insertRow();
            row2.insertCell().textContent = txapelketa.izena || "-";
            row2.insertCell().textContent = txapelketa.dataOrdua.split('T')[0] + " " + txapelketa.dataOrdua.split('T')[1].split('.')[0] || "-";
            row2.insertCell().textContent = txapelketa.lekua || "-";

            const fasCell = row2.insertCell();
            const ftaula = document.createElement('table');
            ftaula.classList.add('taula');
            if (txapelketa.faseak.length > 0) {
                const frow1 = ftaula.insertRow();
                frow1.insertCell().textContent = "Fase Izena";
                frow1.insertCell().textContent = "Egoera";
                frow1.insertCell().textContent = "Hasiera";
                frow1.insertCell().textContent = "Amaiera";
                frow1.insertCell().textContent = "Ezaugarriak";
                frow1.insertCell().textContent = "Epaimahaikideak";
            }

            (txapelketa.faseak || []).forEach((fase) => {
                const faseRow = ftaula.insertRow();
                
                // Añadir la clase 'highlight' si fase.egoera es igual a 1
                if (parseInt(fase.egoera) === 1) {
                    faseRow.classList.add('highlight');
                }
            
                faseRow.insertCell().textContent = fase.izena || "-";
                faseRow.insertCell().textContent =
                    parseInt(fase.egoera) === 0
                        ? "Hasigabea"
                        : parseInt(fase.egoera) === 1
                            ? "Martxan"
                            : "Amaituta";
            
                if (fase.hasiera === null)
                    faseRow.insertCell().textContent = "-";
                else
                    faseRow.insertCell().textContent = fase.hasiera.split('T')[0] + " " + fase.hasiera.split('T')[1].split('.')[0];
            
                if (fase.amaiera === null)
                    faseRow.insertCell().textContent = "-";
                else
                    faseRow.insertCell().textContent = fase.amaiera.split('T')[0] + " " + fase.amaiera.split('T')[1].split('.')[0];
            
                faseRow.insertCell().textContent =
                    (fase.ezaugarriak || [])
                        .map((eza) => eza.izena)
                        .join(", ") || "-";
            
                faseRow.insertCell().textContent =
                    (fase.epaimahaikideak || [])
                        .map((ep) => ep.username)
                        .join(", ") || "-";
            });
            fasCell.appendChild(ftaula);
            console.log("id: " + txapelketa.idTxapelketa);
            console.log("egoera: " + txapelketa.egoera);
            const bE = document.createElement('button');
            bE.classList.add('button-zakarrontzi');
            
            bE.innerHTML =` <svg viewBox='0 0 448 512'  style='width: 100%; height: 100%;'><path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z'></path></svg>`;
           
            const bA = document.createElement('button');
            bA.innerHTML = "Amaitu";
           
            const bH = document.createElement('button');
            bH.innerHTML = "Hasi";
           bA.addEventListener('click', async (event) => {
                event.preventDefault();
                await tx.updateTxapelketaEgoera(txapelketa.idTxapelketa, "amaitu");
                window.location.reload();
            });
            bH.addEventListener('click', async (event) => {
                event.preventDefault();
                await tx.updateTxapelketaEgoera(txapelketa.idTxapelketa, "hasi");
                window.location.reload();
            });
            bE.addEventListener('click', async (event) => {
                event.preventDefault();
                await tx.deleteTxapelketa(txapelketa.idTxapelketa);
                window.location.reload();
            });
           
            if (i == 2 && txapelketa.egoera != 1) row2.insertCell().appendChild(bE);
            if (i == 2 && txapelketa.egoera == 1) row2.insertCell().appendChild(bA);
            if (i == 2 && txapelketa.egoera == 0) row2.insertCell().appendChild(bH);
        
           });
        txapelketakDiv.appendChild(taula);
        
       
    } catch (error) {
        console.log("Errorea txapelketak bistaratzean:", error);
    }
}








 

 export function taldeenTaula(div, taldeak, i) {
    const taldeakTaula = document.createElement("table");
    if(i == 1|| i == 2)
        taldeakTaula.classList.add('taulaInput');
    else taldeakTaula.classList.add('taula');
    const headerRow = taldeakTaula.insertRow();
    headerRow.insertCell().textContent = "Taldea";
    headerRow.insertCell().textContent = "Datuak";
    if(i == 1){
    headerRow.insertCell().textContent = "Egoera";
    headerRow.insertCell().textContent = "Puntuak Guztira";}
    if(i == 1|| i == 2)
    headerRow.insertCell().textContent = "Ekintza";
    for (const taldea of taldeak) {
        const row = taldeakTaula.insertRow();
        row.insertCell().textContent = taldea.izena || "-";
        row.insertCell().textContent = (taldea.email || "-") + ", " + (taldea.telefonoa || "-");
        if(i == 1)
{        const cell =  row.insertCell();
        cell.textContent = parseInt(taldea.egoera) === 2 ? "Deskalifikatuta" : "Txapelketan";                                     
        cell.style.color = parseInt(taldea.egoera) === 2 ? "red" : "green";
        row.insertCell().textContent = taldea.puntuakGuztira || "0";}
        if(i === 1|| i == 2){
            row.insertCell().innerHTML = "<button name = 'ezabatuButton'id = 'taldeak-"+taldea.idTaldea+"'> Ezabatu</button>";
            
        }
    }
    div.appendChild(taldeakTaula);
    if(i ===  1){   
    document.getElementsByName('ezabatuButton').forEach(e => {
        e.addEventListener('click', (event) => {
            taldeaEzabatu(event, e.id.split('-')[1]);
        });
    });
 }
}

 
