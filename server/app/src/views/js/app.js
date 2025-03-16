import * as u from "./user.js";

let isLogin = true;
export function toggleLogin() {
  isLogin = !isLogin;
  const formTitle = document.getElementById('formTitle');
  const email = document.getElementById('email');
  const toggleButton = document.getElementById('toggle-button');
  if (isLogin) {
    formTitle.textContent = 'saioa hasi';
    toggleButton.innerHTML = 'Ez duzu konturik? Erregistratu zaitez';
    email.setAttribute('hidden', '');
    email.removeAttribute('required');
  } 
  
  else {
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
      if(!verify){
        
     
        const mezua = document.createElement('h1');
        mezua.id = "warning";
        mezua.textContent = ` ${document.getElementById('username').value} erabiltzailea ez dago erregistratuta edo pasahitza ez da zuzena`;
        authForm.reset();
        logDiv.appendChild(mezua);
        return;
      }
    else{  
    
    bideratu();
    
    }
    } else {
        
        const user = await u.findUser();
        if(user){
            
            
            const mezua = document.createElement('h1');
            mezua.id = "warning";
            mezua.textContent = ` ${document.getElementById('username').value} izenarekin erabiltzailea existitzen da`;
            authForm.reset();
            logDiv.appendChild(mezua);
            return;
        }
        else{
        const e =await u.createNewUser();
        if(e)
        bideratu();
        }
    }
    
    authForm.reset();
}



 async function bideratu(){
  const logDiv = document.getElementById('logDiv');
  const role = await u.getRole();
  if(role == "admin"){
      window.location.href = "../admin";
        
  }
  else{
      logDiv.innerHTML = "";
      const mezua = document.createElement('h1');
      mezua.textContent = "Ez duzu hemen egoteko baimenik";
      const button = document.createElement('button');
      button.textContent = "Atzera";
      button.addEventListener('click', function(){
          window.location.href = "../";
      });
      
      logDiv.appendChild(mezua);
      logDiv.appendChild(button);
  }
  
 }

 export const logout = async () => {
  localStorage.removeItem('token');
  window.location.href = '../'; 
};


export const checkEgoera = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
      document.getElementById('logDiv').hidden = false;
      return;
  }
  const decodedToken = jwt_decode(token);
  const username = decodedToken.username;
  
   const baimenduta = await u.getRole(username);
      if(baimenduta !== 'admin'){
          const logDiv = document.getElementById('logDiv');
          logDiv.innerHTML = '';
          const mezua = document.createElement('h1');
          mezua.textContent = `${username}-k ez du hemen egoteko baimenik`;
          localStorage.removeItem('token');
          logDiv.appendChild(mezua);
          const button  = document.createElement('button');
          button.textContent = 'saioa hasi';
          button.style.width = '100px';
          button.addEventListener('click', () => {
              window.location.href = '../';
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
  button2.textContent = 'Hasiera';
  button2.addEventListener('click', () => {
      window.location.href = '../admin';
  });
  document.getElementById('logDiv').appendChild(button);
  document.getElementById('logDiv').appendChild(button2);
  document.getElementById('logDiv').hidden = false;
};

export function loadFooter(){
  const footer = document.getElementById('footer');
  const d = "m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5";
  const info = `<div class="button-container">
        <form id="adminForm4" action="../podium">
            <button type="submit"><img src="../pics/podium.svg" alt="Podiuma ikusi"></button>
        </form>
        <form id="adminForm2" action="../txapelketak">
<button class = button-hist ><div class="loader"></div> </button>
        </form>
        <form id="adminForm1" action="../berria">
        
            <button class="button-berria2" title="Berria gehitu">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="icon"
        >
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="1.5"></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
        </svg>
    </button>

    
    </form>
        <form id="adminForm3" action="../faseak">
           <div class="btn-cont">
    <button class="button" >
      <svg
        class="settings-btn"
        xmlns="http://www.w3.org/2000/svg"
        height="35"
        viewBox="0 -960 960 960"
        width="35"
      
      >
        <path
          d="${d}"
        ></path>
      </svg>
      <span class="tooltip"></span>
    </button>
  </div> </form>
    </div>`;
  footer.innerHTML = info;

}










