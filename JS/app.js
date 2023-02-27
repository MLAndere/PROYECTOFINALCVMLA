////////////////Llamado a un objeto con datos de una persona ficticia random///////////////////////////////////////////////////////////////////
fetch('https://randomuser.me/api/')
  .then((response) => response.json())
  .then(function(data) {
    console.log(data.results[0]);
    cargarDatos(data.results[0]);
    notificaciones(data.results[0]);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////Carga de datos del objeto del archivo camposDerecha.js, con los elementos que no contiene el objeto llamado con fetch/////////////////////////////////
console.log(otrosElementos);
cargarDatos(otrosElementos);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////Comportamiento al hacer clic en los botones/////////////////////////////////////////////////////////////////////////////////////////
for (const campo in otrosElementos){
    let idDeBoton = "boton" + campo[0].toUpperCase() + campo.substring(1, campo.length);
    let idDeFlechaAbajo = "flechaAbajo" + campo[0].toUpperCase() + campo.substring(1, campo.length);
    let idDeFlechaArriba = "flechaArriba" + campo[0].toUpperCase() + campo.substring(1, campo.length);
    document.getElementById(idDeBoton).addEventListener('click', function(){
        mostrarYOcultarConBotón(document.getElementById(campo), document.getElementById(idDeFlechaAbajo), document.getElementById(idDeFlechaArriba));
    });    
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






/////////////////////Funciones para el comportamiento de los botones////////////////////////////////////////////////////////////////////////////////////
function mostrarYOcultarConBotón(texto, flechaAbajo, flechaArriba){
    mostrarYOcultar(texto);
    mostrarYOcultar(flechaAbajo);
    mostrarYOcultar(flechaArriba);
}

function mostrarYOcultar(elementoQueSeOcultaYMuestra){
    if (elementoQueSeOcultaYMuestra.style.display === 'none'){
        elementoQueSeOcultaYMuestra.style.display = 'block';
    } else{
        elementoQueSeOcultaYMuestra.style.display = 'none';
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






///////////////Función que carga en los elementos HTML los datos del objeto llamado con fetch y del objeto creado///////////////////////////////////////////
function cargarDatos(objetoACargar){
    for (const campo in objetoACargar){
        let atributo = objetoACargar[campo];
        var elementoPorId = document.getElementById(campo);        
        if ((typeof atributo === 'object') && (atributo !== null) && (campo !== "registered") && campo !== "street"){ 
            cargarDatos(atributo);
        }else {
            if ((campo === "large" || campo === "medium") && elementoPorId){
                document.getElementById(campo).src = atributo;
            }else {
                if (campo === "thumbnail" && elementoPorId){
                    document.getElementById(campo).href = atributo;
                }else {
                    if (campo === "date"){
                        document.getElementById(campo).innerHTML = atributo.substr(8,2) + "/" + atributo.substr(5,2) + "/" + atributo.substr(0,4);
                    }else {
                        if ((atributo !== null) && elementoPorId){
                            document.getElementById(campo).innerHTML = atributo;
                        }
                    }                      
                }                
            }            
        }
        if (campo === "street"){
            document.getElementById(campo).innerHTML = atributo["name"] + " " + atributo["number"];
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////ServiceWorker/////////////////////////////
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
//////////////////////////////////////////////////






// Requesting permission for Notifications after clicking on the button////////////////////////////////////////
function notificaciones(objetoACargar){
    const button = document.getElementById('notifications');
    button.addEventListener('click', () => {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          randomNotification(objetoACargar);
        }
      });
    });    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Setting up random Notification/////////////////////////////////////////////////////////////
function randomNotification(objetoACargar) {
    const notifTitle = objetoACargar['name']['first'] + " " + objetoACargar['name']['last'];
    const notifBody = "Currículum de " + objetoACargar['name']['first'];
    console.log(notifBody);
    let notifImg = objetoACargar['picture']['thumbnail'];
    console.log(notifImg);
    const options = {
    body: notifBody,
    icon: notifImg,
};
new Notification(notifTitle, options);
setTimeout(function() {
    randomNotification(objetoACargar)
}, 30000); 
}
///////////////////////////////////////////////////////////////////////////////////////////////////////