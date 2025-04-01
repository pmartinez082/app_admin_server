import * as ta from "./taldea.js"
import * as u from "./user.js";

window.addEventListener('DOMContentLoaded', () => {
  

    kalkuluakBistaratu();
});

   //kalkuluak.html
export async function kalkuluakBistaratu(){

    const taulaDiv = document.createElement('div');
    taulaDiv.classList.add('taulaDiv');
    const h1 = document.createElement('h1');
    h1.textContent = "Txapelketaren podiuma";
    taulaDiv.appendChild(h1);
    const taula = document.createElement('table');
    taula.classList.add('taula');
    const taldeak = await ta.getTaldeak();
    //console.log(taldeak);
    taldeak.sort((a, b) => {
       
        if ((a.egoera === 0 || a.egoera === 1) && b.egoera === 2) return -1;
        if (a.egoera === 2 && (b.egoera === 0 || b.egoera === 1)) return 1;
    
     
        return b.puntuakGuztira - a.puntuakGuztira;
    });
    
    const row1 = taula.insertRow();
    row1.insertCell().textContent = "Posizioa";
    row1.insertCell().textContent = "Taldea";
    row1.insertCell().textContent = "Puntuazioa";
    row1.insertCell().textContent = "Egoera";
    row1.insertCell().textContent = "Ekintza";
    let i = 1;
    taldeak.forEach(taldea => {
        const row = taula.insertRow();
        row.insertCell().textContent = i;
        i++;
        row.insertCell().textContent = taldea.izena;
        row.insertCell().textContent = taldea.puntuakGuztira;
        const cell = row.insertCell();
        cell.textContent = parseInt(taldea.egoera) === 2 ? "Deskalifikatuta" : "Txapelketan";
        cell.style.color = parseInt(taldea.egoera) === 2 ? "red" : "green";
        row.insertCell().innerHTML = `<button class="button-zakarrontzi" name="ezabatuButton" id="ezabatu-${taldea.idTaldea}">
    <svg viewBox="0 0 448 512" class="svgIcon" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45h246.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
    </svg>
</button>
`;
        }); 

    taulaDiv.appendChild(taula);
    document.body.appendChild(taulaDiv);
    document.getElementsByName('ezabatuButton').forEach(e => {
        e.addEventListener('click', (event) => {
            taldeaEzabatu(event, e.id.split('-')[1]);
        });
    });



}

async function taldeaEzabatu(event, idTaldea){
    event.preventDefault();
    await ta.deleteTaldea(idTaldea);
    window.location.reload();
}
