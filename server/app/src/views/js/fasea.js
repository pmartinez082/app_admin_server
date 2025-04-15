import {API_URL} from './konstanteak.js'
import * as konstanteak from "./konstanteak.js";


//FASEA SORTU
export async function createNewFasea (data)  {


    try {
        if(!data.idTxapelketa||!data.izena||!data.irizpidea) return false;
        const response = await fetch(`${API_URL}/fasea/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            //console.log("fasea ondo sortu da");
            const responseData = await response.json();
            const idFasea = responseData.idFasea;
            return idFasea;
        } else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
        }
    } catch (err) {
        //alert('Errorea');
        //console.log(err);
    }
};


export const getFasearenEpaimahaikideakEzaugarriak = async () => {
    try {
        const response = await fetch(`${API_URL}/fasea/lortu/epaimahaikideak-ezaugarriak`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            return createClassesFromDataF(data);

                    }
    } catch (err) {
        //console.log(err);
    }
};

export function createClassesFromDataF(data) {
    const faseak = [];

    const faseMap = data.reduce((map, item) => {
        if (!map[item.idFasea]) {
            map[item.idFasea] = {
                idFasea: item.idFasea,
                faseIzena: item.faseIzena,
                irizpidea: item.irizpidea,
                egoera: item.egoera,
                hasiera: item.hasiera,
                amaiera: item.amaiera,
                ezaugarriak: [],
                epaimahaikideak: []
            };
        }
        if (item.idEzaugarria && !map[item.idFasea].ezaugarriak.find(e => e.idEzaugarria === item.idEzaugarria)) {
            map[item.idFasea].ezaugarriak.push({
                idEzaugarria: item.idEzaugarria,
                ezaugarriIzena: item.ezaugarriIzena,
                puntuakMin: item.puntuakMin,
                puntuakMax: item.puntuakMax,
                ponderazioa: item.ponderazioa
            });
        }

        
        if (item.idEpaimahaikidea && !map[item.idFasea].epaimahaikideak.find(ep => ep.idEpaimahaikidea === item.idEpaimahaikidea)) {
            map[item.idFasea].epaimahaikideak.push({
                idEpaimahaikidea: item.idEpaimahaikidea,
                username: item.username
            });
        }

        return map;
    }, {});
   
    
    for (const key in faseMap) {
        const faseData = faseMap[key];
        const fase = new konstanteak.Fasea(
            faseData.idFasea,
            null, 
            faseData.faseIzena,
            faseData.egoera,
            faseData.hasiera,
            faseData.amaiera,
            faseData.irizpidea
        );

        faseData.ezaugarriak.forEach(ezData => {
            const ezaugarria = new konstanteak.Ezaugarria(
                ezData.idEzaugarria,
                ezData.ezaugarriIzena,
                ezData.puntuakMax,
                ezData.puntuakMin,
                null,
                ezData.ponderazioa
               
            );
            //console.log(ezData.ponderazioa+ "ponderazioa");
            fase.ezaugarriak.push(ezaugarria);
        });

        faseData.epaimahaikideak.forEach(epData => {
            const epaimahaikidea = new konstanteak.Epaimahaikidea(
                epData.idEpaimahaikidea,
                epData.username,
                faseData.idFasea
            );
            fase.epaimahaikideak.push(epaimahaikidea);
        });

        faseak.push(fase);
    }

    return faseak;
}


export async function egoeraAldatu(data)  {
  

    try {
        const response = await fetch(`${API_URL}/fasea/egoeraAldatu`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log('Fasea egoera aldatu da');
        } else {
            const error = await response.json();
            console.log(`Error: ${error.error}`);
        }
    } catch (err) {
        //alert('Errorea');
        //console.log(err);
    }
    window.location.reload();
};

export async function getFasea(idFasea) {
    try {
        const response = await fetch(`${API_URL}/fasea/${idFasea}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }

        else{
            return false;
        }

    } catch (error) {
        //console.log(error);
    }
};
