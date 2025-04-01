import {API_URL} from './konstanteak.js'
import * as konstanteak from './konstanteak.js';


export async function getEzaugarria (idEzaugarri) {
  
    try {
      
        
        if (!idEzaugarri) {
            //console.log("Error: Missing idEzaugarria "+idEzaugarri);
            return null;
        }
        const response = await fetch(`${API_URL}/ezaugarria/${idEzaugarri}`, {
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
        return data[0];
    } catch (err) {
        //console.log("Network or parsing error:", err);
        return null;
    }
};

        
export async function createNewEzaugarria (ezaugarriak, idFasea) {
    ezaugarriak.forEach(async(ezaugarria)=> {
        ezaugarria.idFasea = idFasea;

        try {
            const response = await fetch(`${API_URL}/ezaugarria/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ezaugarria),
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
       
    });
return true;
};