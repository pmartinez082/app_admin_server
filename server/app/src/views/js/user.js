import * as konstanteak from './konstanteak.js';
import 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.min.js';  
import {API_URL} from './konstanteak.js'
export const getEpaileak = async () => {
    try {
        const response = await fetch(`${API_URL}/user/role/epaileak`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            const data = await response.json();
            const epaileak = [];
            data.forEach(epaile => {
                epaileak.push(new konstanteak.User(epaile.username, epaile.email, epaile.password, epaile.role));
                
            });
            //console.log(epaileak);
            return epaileak;
        }
    } catch (err) {
        //console.log(err);
    }
};

export async function verifyUser  (username, password) {

    try {
        const response = await fetch(`${API_URL}/user/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            
            //console.log(data);
            return data;
        }
    } catch (err) {
        //console.log(err);
    }

};

export async function findUser (username) {
    try {
        const response = await fetch(`${API_URL}/user/find`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
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

export async function getRole (username) {
    try {
        const response = await fetch(`${API_URL}/user/role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
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

export async function createNewUser  (user)  {

    try {
        if(!user.username||!user.email||!user.password||!user.role) return false;
        const response = await fetch(`${API_URL}/user/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: user.username, email: user.email, password: user.password, role: user.role }),
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
export async function autentifikatu(){
    const token = localStorage.getItem('token');
    if(!token){
        document.body.innerHTML = '';
        const mezua = document.createElement('h1');
        mezua.textContent = 'Ez zaude logeatuta, saioa hasi, mesedez';
        const button = document.createElement('button');
        button.textContent = 'Hasi saioa';
        button.addEventListener('click', () => {
            window.location.href = '../../../';
        });
        mezua.appendChild(button);
        document.body.appendChild(mezua);
        return false;
    }

    const decodedToken = jwt_decode(token);
    const username = decodedToken.username;
    //console.log(username);
    const baimenduta = await getRole(username);
    if(baimenduta === 'admin'){
        return username;
    }
    else{
        document.body.innerHTML = '';
        const mezua = document.createElement('h1');
        mezua.textContent = `${username}-k ez du hemen egoteko baimenik`;
        document.body.appendChild(mezua);
        return false;
    }
}


  