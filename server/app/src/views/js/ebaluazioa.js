
import {API_URL} from './konstanteak.js'
import * as konstanteak from "./konstanteak.js";

export async function getEpailearenEbaluazioakFaseka (idEpaimahaikidea) {
  
    try {
        const response = await fetch(`${API_URL}/ebaluazioa/get/EpailearenEbaluazioakFaseka/${idEpaimahaikidea}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
           
        });
        if (response.ok) {
            const ebaluazioak = await response.json();
            //console.log(ebaluazioak);
            if (ebaluazioak.length === 0) {
                return false;
            }
            
            const ebaluazioakArray = [];
            ebaluazioak.forEach(ebaluazioa => {
                
                ebaluazioakArray.push(new konstanteak.Ebaluazioa(ebaluazioa.idEbaluazioa, ebaluazioa.idEpaimahaikidea, ebaluazioa.idTaldea, ebaluazioa.idEzaugarria, ebaluazioa.puntuak, ebaluazioa.noiz));
            });
            //console.log(ebaluazioakArray);
            return ebaluazioakArray;
        } else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
        }
    }
    catch (err) {
        //alert('Errorea');
        //console.log(err);
    }
};

export const getFasearenEbaluazioak = async (idFasea) => {

    try {
        const response = await fetch(`${API_URL}/ebaluazioa/get/fasearenEbaluazioak/${idFasea}`);
        if (response.ok) {
            const data = await response.json();
            //console.log(data);
            const d = [];
            data.forEach(ebaluazioa => {
                d.push(ebaluazioa);
            });
            //console.log(d);
            return d;
        }
        else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
        }
    }
    catch (err) {
        //alert('Errorea');
        //console.log(err);
    }

}

export const getFaseAktiboarenEbaluazioak = async () => {
    try {
        const response = await fetch(`${API_URL}/ebaluazioa/get/faseAktiboarenEbaluazioak`, {
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