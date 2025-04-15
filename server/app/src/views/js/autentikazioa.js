import { autentifikatu } from "./user.js"; 

window.onload = async () => {
    const a = await autentifikatu();
    if(!a){
        const mezua = document.createElement('h1');
        mezua.textContent = "Ez duzu hemen egoteko baimenik";
        const button = document.createElement('button');
        button.textContent = "Saioa hasi";
        button.addEventListener('click', function(){
            window.location.href = "../";
        });
        return;
    }
    

};


