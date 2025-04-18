import * as konstanteak from './konstanteak.js';
import {createClassesFromDataF} from './fasea.js' ;
import {API_URL} from './konstanteak.js'




//TXAPELKETAK LORTU
export const getTxapelketak = async () => {
    
    try {
        const response = await fetch(`${API_URL}/txapelketa/`, {    
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            const txapelketak = [];
            data.forEach(txapelketa => {
                txapelketak.push(new konstanteak.Txapelketa(txapelketa.idTxapelketa, txapelketa.lekua, txapelketa.izena, txapelketa.dataOrdua, txapelketa.egoera));  
            
        });
        return txapelketak;
    }}
        catch (err) {
        //console.log(err);
    }
};

//TXAPELKETA SORTU
export async function createNewTxapelketa  (data)  { 
    try {
        if(!data.lekua||!data.dataOrdua||!data.izena) return false;
        const response = await fetch(`${API_URL}/txapelketa/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {

            const responseData = await response.json();
            const idTxapelketa = responseData.idTxapelketa;
            return idTxapelketa;

            //console.log("Txapelketa ondo sortu da");
        } else {
            const error = await response.json();
            //alert(`Error: ${error.error}`);
        }
    } catch (err) {
        //console.log(err);
    }
};


//TXAPELKETA EGUNERATU
export async function updateTxapelketa (data)  {  
  

    try {
        const response = await fetch(`${API_URL}/txapelketa/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            //console.log("txapelketa eguneratua");
        } else {
            const error = await response.json();
            //console.log(`Error: ${error.error}`);
        }
    } catch (err) {
        //console.log(err);
    }
};




//TXAPELKETA LORTU
export async function getTxapelketa (idTxapelketa)  {             
    

    try {
        const response = await fetch(`${API_URL}/txapelketa/${idTxapelketa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
           return data;

        }
        
} catch (err) {
    //console.log(err);
}

};

//TXAPELKETA EZABATU
export async function deleteTxapelketa (idTxapelketa)  {



console.log(idTxapelketa);
  try {
    const response = await fetch(`${API_URL}/txapelketa/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idTxapelketa:idTxapelketa}),
    });

    if (response.ok) {
      //console.log('txapelketa ezabatu da');
    } else {
      const error = await response.json();
      //alert(`Error: ${error.error}`);
    }
  } catch (err) {
    //alert('Error en la conexión con el servidor.');
    //console.log(err);
  }
};

//TXAPELKETAREN FASEAK LORTU
export async function getTxapelketarenFaseak(idTxapelketa)  {
    

    try {
        const response = await fetch(`${API_URL}/txapelketa/${idTxapelketa}/faseak`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            const faseak = [];
            data.forEach(fase => {
                faseak.push(new konstanteak.Fasea(fase.idFasea, fase.idTxapelketa, fase.izena, fase.egoera, fase.hasiera, fase.amaiera, fase.irizpidea));
            });
            return faseak;
        }
    } catch (err) {
        //console.log(err);
    }
};

export const getInfoGuztia = async () => {
    
    try {
        const response = await fetch(`${API_URL}/txapelketa/lortu/info-guztia`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
           
            return createClassesFromData(data);
        }
    } catch (err) {
        //console.log(err);
    }
};

export async function getTxapelketarenInfoGuztia  (idTxapelketa)  {
    
    try {
        
        const response = await fetch(`${API_URL}/txapelketa/lortu/info-guztia/${idTxapelketa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
           
            return createClassesFromData(data);
        }
    } catch (err) {
        //console.log(err);
    }
};
function createClassesFromData(data) {
    const txapelketak = data.map(txData => {
        const txapelketa = new konstanteak.Txapelketa(
            txData.idTxapelketa,
            txData.txapelketaLekua,
            txData.txapelketaIzena,
            txData.txapelketaData,
            txData.txapelketaEgoera
            
            
        );

        txData.faseak.forEach(faseData => {
            const fase = new konstanteak.Fasea(
                faseData.idFasea,
                txData.idTxapelketa,
                faseData.faseIzena,
                faseData.faseEgoera,
                faseData.faseHasiera,
                faseData.faseAmaiera,
                faseData.faseIrizpidea,
                


            );

            faseData.ezaugarriak.forEach(ezaugarriaData => {
                const ezaugarria = new konstanteak.Ezaugarria(
                    ezaugarriaData.idEzaugarria,
                    ezaugarriaData.ezaugarriaIzena,
                    ezaugarriaData.puntuakMin,
                    ezaugarriaData.puntuakMax,
                    ezaugarriaData.ponderazioa
                );
                fase.ezaugarriak.push(ezaugarria);
            });

            faseData.epaimahaikideak.forEach(epaimahaikideaData => {
                const epaimahaikidea = new konstanteak.Epaimahaikidea(
                    epaimahaikideaData.idEpaimahaikidea,
                    epaimahaikideaData.epaimahaikideaUsername,
                    faseData.idFasea
                );
                fase.epaimahaikideak.push(epaimahaikidea);
            });

            txapelketa.faseak.push(fase);
        });

        return txapelketa;
    });

    return txapelketak;
}

export const getTxapelketaAktiboarenInfo = async () => {
    try {
        const response = await fetch(`${API_URL}/txapelketa/lortu/aktiboaren-info-guztia`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            return createClassesFromDataF(data);
        }

        else{
            return [];
        }

    } catch (error) {
        //console.log(error);
    }
};

export async function updateTxapelketaEgoera(idTxapelketa, egoera) {
   
    if(egoera == "hasi")
        egoera = 0;
    else
        egoera = 1;
    try {
        const response = await fetch(`${API_URL}/txapelketa/updateEgoera`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({idTxapelketa:idTxapelketa, egoera:egoera}),
        });

        if (response.ok) {
            console.log('txapelketa eguneratua');
        } else {
            const error = await response.json();
            console.log(`Error: ${error.error}`);
        }
    } catch (error) {
        console.log(error);
    }
}

export const booleanTxapelketa0 = async () => {
    try {
        const response = await fetch(`${API_URL}/txapelketa/lortu/berria`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            return data[0].izena;
        }

        else{
            return false;
        }

    } catch (error) {
        //console.log(error);
    }
};