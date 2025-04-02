import * as u from './user.js';
import 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/build/jwt-decode.min.js';

export async function loadProfila(){
    const profila = document.getElementById('profila');
    const username = jwt_decode(localStorage.getItem('token')).username;
    const ongiEtorria = document.createElement('h1');
    ongiEtorria.textContent = username+"-ren kontua";

    profila.appendChild(ongiEtorria);


}

export async function profilaEzabatu(){
    const username = jwt_decode(localStorage.getItem('token')).username;
    await u.deleteUser(username);
    logout();
   
}

export async function logout(){
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}

export async function pasahitzaAldatu(){
    if(document.getElementById('mezua'))
        document.getElementById('mezua').remove();
    const username = jwt_decode(localStorage.getItem('token')).username;
    console.log(username);
    const mezua = document.createElement('h1');
    mezua.id = 'mezua';
    const form = document.getElementById('pasahitzaForm');
    const user = await u.getUser(username);
    const pasahitzaZaharra = user.password;
    if(form.pasahitza.value == pasahitzaZaharra){
        
        mezua.textContent = 'Pasahitza berria zaharraren berdina da';
        document.getElementById('pasahitzaForm').appendChild(mezua);
        return;
    }
    console.log(form.pasahitza.value);
    console.log(pasahitzaZaharra);
    const c = await u.changePassword(username, form.pasahitza.value);
    form.reset();
    if(c){
    mezua.textContent = 'Pasahitza aldatu da';
    document.getElementById('pasahitzaForm').appendChild(mezua);
}
}
