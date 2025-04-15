import { getEpailearenEpaimahaiak } from './epaimahaikidea.js';

let lastNotification = null;
/*
document.addEventListener('deviceready', () => {

  cordova.plugins.notification.local.hasPermission(function (granted) {
    if (granted) {
      checkJakinarazpenak();
      
    } else {
      cordova.plugins.notification.local.requestPermission(function (granted) {
        if (granted) {
          checkJakinarazpenak();
         
        } else {
          console.log('Error: No se otorgaron permisos para notificaciones');
        }
      });
    }
  });
  
});



export async function checkJakinarazpenak() {
  console.log("sartu naiz" );
  const idEpaimahaikidea = await getEpailearenEpaimahaiak();
  console.log("idEpaimahaikidea" + idEpaimahaikidea);
  console.log("lastNotification" + lastNotification);
  if (!idEpaimahaikidea || lastNotification === idEpaimahaikidea|| idEpaimahaikidea == undefined || idEpaimahaikidea == null || parseInt(idEpaimahaikidea) == '0') return;

  // cordova jakinarazpena
  scheduleNotification();

  // web jakinarazpena
  /*const notification = new Notification("Bozkatzeko garaia da!", {
    body: "Bozkatu orain!",
    icon: "../pics/epaitu.svg",
    vibrate: [100, 50, 100],
    tag: "epaitu",
    onClick: () => {
      window.location.href = "../html/epaitu.html";
    },
  });
  notification.addEventListener("error", (e) => {
    alert("Error: " + e.message);
  });
  
  lastNotification = idEpaimahaikidea;
}

function scheduleNotification() {
  cordova.plugins.notification.local.schedule({
    id: 1,
    title: 'Bozkatzeko garaia da!',
    text: 'Bozkatu orain!',
  });
}

cordova.plugins.notification.local.on('click', function (notification) {
  console.log('click:', notification.id);

  window.location.href = "../html/epaitu.html";
});

*/