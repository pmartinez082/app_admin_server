import * as u from "./user.js";

let isLogin = true;
export function toggleLogin() {
    isLogin = !isLogin;
    const formTitle = document.getElementById('formTitle');
    const email = document.getElementById('email');
    const toggleButton = document.getElementById('toggle-button');
    if (isLogin) {
        formTitle.textContent = 'Saioa hasi';
        toggleButton.innerHTML = 'Ez duzu konturik? Erregistratu zaitez';
        email.setAttribute('hidden', '');
        email.removeAttribute('required');
    } else {
        formTitle.textContent = 'Erregistratu';
        toggleButton.innerHTML = 'Badaukazu konturik? Saioa hasi';
        email.removeAttribute('hidden');
        email.setAttribute('required', '');
    }
}

export async function login(event) {
    const mezua = document.getElementById('warning');
    if (mezua) {
        mezua.remove();
    }
    event.preventDefault();
    const authForm = document.getElementById('authForm');
    if (isLogin) {
        const verify = await u.verifyUser();
        if (!verify) {
            const mezua = document.createElement('h1');
            mezua.id = "warning";
            mezua.textContent = ` ${document.getElementById('username').value} erabiltzailea ez dago erregistratuta edo pasahitza ez da zuzena`;
            authForm.reset();
            logDiv.appendChild(mezua);
            return;
        } else {
            bideratu();
        }
    } else {
        const user = await u.findUser(document.getElementById('username'));
        if (user) {
            const mezua = document.createElement('h1');
            mezua.id = "warning";
            mezua.textContent = ` ${document.getElementById('username').value} izenarekin erabiltzailea existitzen da`;
            authForm.reset();
            logDiv.appendChild(mezua);
            return;
        } else {
            await u.createNewUser();
            bideratu();
        }
    }
    authForm.reset();
}

async function bideratu() {
    const role = await u.getRole();
    const logDiv = document.getElementById('logDiv');
    if (role == "admin") {
        const mezua = document.createElement('h1');
        mezua.textContent = "Ez duzu hemen egoteko baimenik";
        const button = document.createElement('button');
        button.textContent = "Atzera";
        button.addEventListener('click', function () {
            window.location.href = "./index.html";
        });
        logDiv.innerHTML = '';
        logDiv.appendChild(mezua);
        logDiv.appendChild(button);
    } else {
        window.location.href = "./html/epaitu.html";
    }
}

export const logout = async () => {
    localStorage.removeItem('token');
    window.location.href = './index.html';
};



export const checkEgoera = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        document.getElementById('logDiv').hidden = false;
        return;
    }
    const decodedToken = jwt_decode(token);
    const username = decodedToken.username;
    const logDiv = document.getElementById('logDiv');
     const baimenduta = await u.getRole(username);
        if(baimenduta !== 'referee'){
           logDiv.innerHTML = '';
            const mezua = document.createElement('h1');
            mezua.textContent = `${username}-k ez du hemen egoteko baimenik`;
            localStorage.removeItem('token');
            logDiv.appendChild(mezua);
            const button  = document.createElement('button');
            button.textContent = 'saioa hasi';
           
            button.addEventListener('click', () => {
                window.location.href = '../index.html';
            });
            logDiv.appendChild(button);
            return;
        }
    const agurra = document.getElementById('formTitle');
    agurra.textContent = `Kaixo, ${username}`;
    document.getElementById('authForm').remove();
    document.getElementById('toggle-button').remove();
    const button = document.createElement('button');
    button.textContent = 'Saioa itxi';
    button.addEventListener('click', logout);
    const button2 = document.createElement('button');
    button2.textContent = 'Epaitu';
    button2.addEventListener('click', () => {
        window.location.href = './html/epaitu.html';
    });
    document.getElementById('logDiv').appendChild(button);
    document.getElementById('logDiv').appendChild(button2);
    document.getElementById('logDiv').hidden = false;
};




export async function loadFooter() {
    const footer = document.querySelector('.footer');
    const buttonHome = document.createElement('button');
    const buttonProfila = document.createElement('button');
    const irudiaHome = document.createElement('img');
    const irudiaProfila = document.createElement('img');
    irudiaHome.src = '../pics/home.svg';
    irudiaProfila.src = '../pics/profila.svg';

    buttonHome.appendChild(irudiaHome);
    buttonProfila.appendChild(irudiaProfila);

    buttonHome.addEventListener('click', () => {
        window.location.href = './epaitu.html';
    });
    buttonProfila.addEventListener('click', () => {
        window.location.href = './profila.html';
    });
    footer.appendChild(buttonHome);
    footer.appendChild(buttonProfila);
}

export async function loadHeader() {
    const header = document.querySelector('.header');
   
    const buttonBirkargatu = document.createElement('button');
    const irudiaBirkargatu = document.createElement('img');
    irudiaBirkargatu.src = '../pics/birkargatu.svg';
    buttonBirkargatu.addEventListener('click', () => {
        window.location.reload();
    });
    buttonBirkargatu.appendChild(irudiaBirkargatu);
    header.appendChild(buttonBirkargatu);

   

}

