import * as u from '../js/user.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadErabiltzaileenTaula();
  
});

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = document.getElementById('userForm');
    const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
        role: form.rola.value
    };
    
    const us = await u.createNewUser(data);
    if(us)
    window.location.reload();
    else{
        const mezua = document.createElement('h1');
        mezua.innerHTML = 'Erabiltzailea sortzean errore bat gertatu da';
        mezua.className = 'errorMezua';
        form.appendChild(mezua);
    }
    form.reset();
    
});



export async function loadErabiltzaileenTaula() {
    const userDiv = document.getElementById('userDiv');
    const users = await u.getUsers();
   
    
    if(!users){
        const mezua = document.createElement('h1');
        mezua.innerHTML = 'Ez dago erabiltzailerik';
        userDiv.appendChild(mezua);
        return;
    }

   
   
    return  await erabiltzaileenTaula(users);
}

export async function erabiltzaileenTaula(users){
   const div= document.getElementById('userDiv');
    const taula = document.createElement('table');
    taula.className = 'taula';
    const l1 = taula.insertRow();
    l1.insertCell().innerHTML = 'Erabiltzaile izena';
    l1.insertCell().innerHTML = 'Email-a';
    l1.insertCell().innerHTML = 'Pasahitza';
    l1.insertCell().innerHTML = 'Rola';
    l1.insertCell().innerHTML = 'Ezabatu';
    users.forEach(user => {
        const l = taula.insertRow();
        l.insertCell().innerHTML = user.username;
        l.insertCell().innerHTML = user.email || "--";
        l.insertCell().innerHTML = user.password ;
        l.insertCell().innerHTML = user.role === 'admin' ? 'Administraria' : 'Erabiltzailea';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'button-zakarrontzi';
       deleteButton.innerHTML= `
    <svg viewBox="0 0 448 512" class="svgIcon" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45h246.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
    </svg>`;
       
        deleteButton.addEventListener('click', async () => {
            const confirmDelete = confirm(`Ziur zaude ${user.username} erabiltzailea ezabatu nahi duzula?`);
            if (confirmDelete) {
                if(await u.deleteUser(user.username))
                window.location.reload();
                else{
                    const mezua = document.createElement('h1');
                    mezua.innerHTML = 'Erabiltzailea ezabatzerakoan errore bat gertatu da';
                    div.appendChild(mezua);
                }
            }
        });
    l.insertCell().appendChild(deleteButton);

    });

userDiv.appendChild(taula);

    }