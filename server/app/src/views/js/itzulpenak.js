export const translations = { 
  index : {
  Saioa_hasi:[ "Iniciar sesión", "Saioa hasi"],
  Erabiltzaile_izena: ["Nombre de usuario","Erabiltzaile izena"],
  Pasahitza: ["Contraseña", "Pasahitza"],
  Bidali: ["Enviar", "Bidali"],
  EzDuzuKonturik: ["¿No tienes cuenta? Regístrate", "Ez duzu konturik? Erregistratu zaitez"],
  Eposta: ["Correo electrónico", "Posta elektronikoa"],
  BadaukazuKonturik: ["¿Ya tienes cuenta? Inicia sesión", "Badaukazu konturik? Saioa hasi"],
  Kaixo: ["Hola, ", "Kaixo, "],
  ezDago: ["El usuario no existe o la contraseña es incorrecta", "Erabiltzailea ez dago erregistratuta edo pasahitza ez da zuzena"],
  erabiltzaileaExistitzenDa: ["El usuario ya existe", "Erabiltzailea dagoeneko existitzen da"],
  Saioa_itxi: ["Cerrar sesión", "Saioa itxi"],
  baimena: ["No tienes permiso para acceder a esta página", "Ez duzu orri honetan sartzeko baimenik"],
  atzera: ["Atrás", "Atzera"],
  erregistratu: ["Registrarse", "Erregistratu"],
  },
  home : {
    podium: ["Ver podium de la competición", "Abian dagoen txapelketaren podium-a ikusi"],
    historiala: ["Consultar antiguas competiciones", "Aurreko txapelketak ikusi"],
    berria: ["Crear nueva competición", "Txapelketa berri bat sortu"],
    kudeatu: ["Gestionar competición en marcha", "Abian dagoen txapelketa kudeatu"],
  },
  podium : {
    posizioa: ["Posición", "Posizioa"],
    taldea: ["Equipo", "Taldea"],
    puntuazioa: ["Puntuación", "Puntuazioa"],
    egoera: ["Estado", "Egoera"],
    ekintza: ["Acción", "Ekintza"],
    txapelketarenPodiuma: ["Podium de la competición", "Txapelketaren podium-a"],
  },
  laburpena : {
    txapelketenLaburpena: ["Resumen de las competiciones", "Txapelketen laburpena"],
    txapelketaIzena: ["Nombre de la competición", "Txapelketa izena"],
    data: ["Fecha", "Data"],
    lekua: ["Lugar", "Lekua"],
    faseak: ["Fases", "Faseak"],
    faseIzena: ["Nombre de la fase", "Fase izena"],
    egoera: ["Estado", "Egoera"],
    hasieraData: ["Inicio", "Hasiera"],
    amaieraData: ["Fin", "Amaiera"],
    ezaugarriak: ["Características", "Ezaugarriak"],
    epaimahaikideak: ["Jurado", "Epaimahaikideak"],
    ekintza: ["Acción", "Ekintza"],
    hasi: ["Iniciar", "Hasi"],
    bukatu: ["Finalizar", "Bukatu"]
  
  
  },
  berria : {
    txapBerria: ["Nueva competición", "Txapelketa berria gehitu"],
    taldeBerria: ["Nuevo equipo", "Talde berria gehitu"],
    epaimahaikideBerria: ["Nuevo juez", "Epaimahaikide berria gehitu"],
    erabiltzaileBerria: ["Nuevo usuario", "Erabiltzaile berria gehitu"],
  },
  kudeaketa : {
    martxan: ["Control de la competición en martxa", "Martxan dagoen txapelketaren kudeaketa"],
    ezDago: ["No hay ninguna competición en marcha", "Ez dago martxan dagoen txapelketarik"],
    faseIzena: ["Nombre de la fase", "Fase izena"],
    hasieraData: ["Inicio", "Hasiera"],
    amaieraData: ["Fin", "Amaiera"],
    egoera: ["Estado", "Egoera"],
    irizpidea: ["Criterio", "Irizpidea"],
    ezaugarriak: ["Características", "Ezaugarriak"],
    ponderazioa: ["Ponderación", "Ponderazioa"],
    jurado:  ["Jurado", "Epaimahaia"],
    ebaluazioak: ["Valoracions", "Ebaluazioak"],
    hasi: ["Iniciar", "Hasi"],
    bukatu: ["Finalizar", "Bukatu"],
    amaituta: ["Finalizado", "Amaituta"],
    egindakoEb: ["Valoraciones realizadas", "Egindako ebaluazioak"],
    baloratzeke: ["Valoraciones pendientes", "Baloratu beharrekoak"],
    ikusi: ["Ver", "Ikusi"],
    epailearenEbaluazioak: ["Valoraciones de ", " epailearen ebaluazioak"],
    itxi: ["Cerrar", "Itxi"],
    taldea: ["Equipo", "Taldea"],
    datuak: ["Datos", "Datuak"],
  
  },
  
  profila : {
    kontua: ["Mi cuenta", "Nire kontua"],
    pasahitzaAldatu: ["Cambiar contraseña", "Pasahitza aldatu"],
    pasahitzaBerria: ["Nueva contraseña", "Pasahitz berria"],
    saioaItxi: ["Cerrar sesión", "Saioa itxi"],
    aldatu: ["Cambiar", "Aldatu"],
    kontuaEzabatu: ["Eliminar cuenta", "Kontua ezabatu"],
  }

}


document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem("hizkuntza") || "eu";
  applyTranslation(lang, document.getElementById('name').value);
});



export function applyTranslation(lang, i ) {
  const langIndex = lang === 'es' ? 0 : 1;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    
    const translation = translations[i][key]?.[langIndex];
    if (translation) el.textContent = translation;
  });

  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = translations[key]?.[langIndex];
    if (translation) el.placeholder = translation;
  });
}


/*
const observer = new MutationObserver((mutationsList, observer) => {
  console.log("¡El DOM ha cambiado!");
 
  applyTranslation(localStorage.getItem('lang')||"eu", document.getElementById('name').value);
});

// Configuración del observador:
const config = {
  childList: true,       // nodos hijos añadidos o eliminados
  attributes: true,      // cambios en atributos
  subtree: true,         // observar también los hijos de los hijos
  characterData: true    // cambios en el texto
};

// Iniciar el observador en el `document.body` o donde tú quieras
observer.observe(document.getElementById("logDiv"), config);


*/
