import {API_URL} from './konstanteak.js'
import * as konstanteak from "./konstanteak.js";
export const getTaldeak = async () => {
    try {
        const response = await fetch(`${API_URL}/taldea/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            const taldeak = [];
            data.forEach(taldea => {
                taldeak.push(new konstanteak.Taldea(taldea.idTaldea, taldea.izena, taldea.email, taldea.telefonoa, taldea.puntuakGuztira, taldea.egoera));
            });
            return taldeak;
        }
    } catch (err) {
        //console.log(err);
    }
};

export async function createNewTaldea (data) {
  

    if(!data.izena) return false;
    if(!data.telefonoa) data.telefonoa = "";
    try {
        const response = await fetch(`${API_URL}/taldea/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            //console.log("taldea ondo sortu da");
            const responseData = await response.json();
            const idTaldea = responseData.idTaldea;
            return idTaldea;
        } else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
            return false;
        }
    } catch (err) {
        //alert('Errorea');
        //console.log(err);
    }
};

export async function getTaldea  (id)  {
    try {
        const response = await fetch(`${API_URL}/taldea/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
           return data[0];

        }
        
} catch (err) {
    //console.log(err);
}

};

export async function getBaloratuGabekoTaldeak (idEpaimahaikidea) {
  
    try {
        const response = await fetch(`${API_URL}/taldea/${idEpaimahaikidea}/baloratu-gabekoak`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            const taldeak = [];
            data.forEach(taldea => {
                taldeak.push(new konstanteak.Taldea(taldea.idTaldea, taldea.izena, taldea.email, taldea.telefonoa, taldea.puntuakGuztira, taldea.egoera));
            });
            return taldeak;
        }
        else{
            return false
        }
    } catch (err) {
        //console.log(err);
    }
};


export async function deleteTaldea  (idTaldea)  {
   

    try {
        const response = await fetch(`${API_URL}/taldea/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idTaldea:idTaldea}),
        });

        if (response.ok) {
            //console.log('Taldea ezabatu da');
        } else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
        }
    } catch (err) {
        //console.log('Error.');
        //console.log(err);
    }
};

export async function getTaldearenEbaluazioak  (id) {
    
    try {
        const response = await fetch(`${API_URL}/taldea/${id}/ebaluazioak`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            const ebaluazioak = [];
            data.forEach(ebaluazioa => {
                ebaluazioak.push(new konstanteak.Ebaluazioa(ebaluazioa.idEbaluazioa, ebaluazioa.idTxapelketa,  ebaluazioa.izena, ebaluazioa.hasiera, ebaluazioa.amaiera, ebaluazioa.egoera, ebaluazioa.irizpidea));
            });
            return ebaluazioak;
        }
    } catch (err) {
        //console.log(err);
    }
};  

export const getTaldeAktiboak = async () => {
    try {
        const response = await fetch(`${API_URL}/taldea/get/aktiboak`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            const taldeak = [];
            data.forEach(taldea => {
                taldeak.push(new konstanteak.Taldea(taldea.idTaldea, taldea.izena, taldea.email, taldea.telefonoa, taldea.puntuakGuztira, taldea.egoera));
            });
            return taldeak;
        }
    } catch (err) {
        //console.log(err);
    }
};