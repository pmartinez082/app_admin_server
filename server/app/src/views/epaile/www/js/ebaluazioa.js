import {API_URL} from './konstanteak.js'
import {getEzaugarria} from "./ezaugarria.js";
export async function getBaloratzekoEzaugarriak(){
    const baloratzekoEzaugarriak = document.querySelectorAll('.ilara');
    console.log(baloratzekoEzaugarriak);
    const baloratzekoEzaugarriakArray = [];
    var i = baloratzekoEzaugarriak.length;
    for(var j = 0; j < i; j++){
        baloratzekoEzaugarriakArray.push(await getEzaugarria(baloratzekoEzaugarriak[j].dataset.idezaugarria) );
    }
    console.log(baloratzekoEzaugarriakArray);
    return baloratzekoEzaugarriakArray;
}

export function getEzaugarrienBalorazioak(){
    const balorazioak = document.getElementsByName('balorazioa');
    const balorazioakArray = [];
    var i = balorazioak.length;
    for(var j = 0; j < i; j++){
        balorazioakArray.push(balorazioak[j].value);
    }
    console.log(balorazioakArray);
    return balorazioakArray;
}
    

export async function createNewEbaluazioa (event, idEpaimahaikidea) {
    event.preventDefault();
    const balorazioak = getEzaugarrienBalorazioak();
    const ezaugarriak = await getBaloratzekoEzaugarriak();
    console.log("balorazioak"+balorazioak);
    console.log("ezaugarriak"+ezaugarriak);
    
    for(var j = 0; j < balorazioak.length; j++){

        if(parseFloat(ezaugarriak[j].puntuakMin) >parseFloat(balorazioak[j])||parseFloat(ezaugarriak[j].puntuakMax )< parseFloat(balorazioak[j])||balorazioak[j] === ""){
            
            return false;
        }
    }
    
    for(var i = 0; i < ezaugarriak.length; i++){


   //console.log(event.target.id);
    const data = {
        idEpaimahaikidea: idEpaimahaikidea,
        idEzaugarria: ezaugarriak[i].idEzaugarria,
        idTaldea: document.getElementById('taldeaMenua').value,
        puntuak: balorazioak[i],
        noiz: new Date()
    };
    //console.log(data);
    try {
        const response = await fetch(`${API_URL}/ebaluazioa/add`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("ebaluazioa ondo sortu da");
        } else {
            const error = await response.json();
            console.log(`Error: ${error.error}`);
            return false;
           
        }
    }
    catch (err) {
        alert('Errorea');
        //console.log(err);
    }

}
return true;

};


