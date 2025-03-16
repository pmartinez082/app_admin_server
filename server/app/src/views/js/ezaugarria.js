import {API_URL} from './konstanteak.js'
import * as konstanteak from './konstanteak.js';
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


export const getEzaugarria = async () => {
  
    try {
      
        const idEzaugarri  =   document.getElementsByName("ezaugarria")[0].getAttribute('data-idEzaugarria');
        
        if (!idEzaugarri) {
            //console.log("Error: Missing idEzaugarria "+idEzaugarri);
            return null;
        }
        const response = await fetch(`${API_URL}/ezaugarria/get/${idEzaugarri}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            //console.log(`Error: Received status ${response.status} from API`);
            return null;
        }

        const data = await response.json();
        //console.log(data);
        return data;
    } catch (err) {
        //console.log("Network or parsing error:", err);
        return null;
    }
};
export const getEzaugarria2 = async () => {
    const id = document.getElementById('faseakTaula');
    const idEzaugarria = id.getAttribute('data').split('-')[1];
    try {
        const response = await fetch(`${API_URL}/ezaugarria/${idEzaugarria}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            //console.log(data);
           return data;

        }
      
    
    } catch (err) {
        //console.log(err);
    }
};
        
export async function createNewEzaugarria (idFasea) {
    var i = 0;
    if(!getEzaugarriakArray(idFasea) ) return false;
    while (i < getEzaugarriakArray(idFasea).length) {
        if (getEzaugarriakArray(idFasea)[i].idEzaugarria === null) {
            break;
        }
        
        const data = {
            idEzaugarria: null,
            izena: getEzaugarriakArray(idFasea)[i].izena,
            puntuakMin: getEzaugarriakArray(idFasea)[i].puntuakMin,
            puntuakMax: getEzaugarriakArray(idFasea)[i].puntuakMax,
            idFasea: idFasea,
            ponderazioa: getEzaugarriakArray(idFasea)[i].ponderazioa 
        };
        try {
            const response = await fetch(`${API_URL}/ezaugarria/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                
                const responseData = await response.json();
                //const idEzaugarria= responseData.idEzaugarria;
            
                //console.log("ezaugarria ondo sortu da");
            } else {
                const error = await response.json();
                //console.log(`Error: ${error.error}`);
            }
        } catch (err) {
            //alert('Errorea');
            //console.log(err);
        }
        i = i + 1;
    }
return true;
};