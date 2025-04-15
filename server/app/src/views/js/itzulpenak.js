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
  Saioa_itxi: ["Cerrar sesión", "Saioa itxi"]
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
    erabiltzaieBerria: ["Nuevo usuario", "Erabiltzaile berria gehitu"],
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