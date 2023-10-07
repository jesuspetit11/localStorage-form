//Variables

const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = []; //Cuando tengamos un array vacío los mostramos en html con un bucle forEach



//eventListeners

eventListeners();
function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit",agregarTweet); //Buena practica añadir un evento submit a todo el form

    //Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", ()=>{
        tweets = JSON.parse( localStorage.getItem("tweets") );
        console.log("tweets");
    });
}

//Funciones

function agregarTweet(e) {
    e.preventDefault();
    
    //Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;

    //validación

    if(tweet === ""){
        mostrarError("Un mensaje no puede ir vacío");
        return; //Previene que se sigan ejecutando código que no tiene que ver con la validación
    }

    const tweetObj = {
        id: Date.now(),
        tweet,
    }
    
    //Añadir al arreglo
    tweets = [...tweets, tweetObj];
    
    //Una vez agregado vamos a crear el HTML
    creatHTML();

    //Reiniciar el formulario
    formulario.reset(); //Así reseteamos el fomulario

    
}

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeDeError = document.createElement("P");
    mensajeDeError.textContent = error;
    mensajeDeError.classList.add("error");

    //Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeDeError);

    setTimeout(()=>{
        //Elimina la alerta después de 3 seg
        mensajeDeError.remove();
    }, 3000);
}

//Muestra un listado de los tweets
//Hacemos un bucle forEach para recorrer el array y mostrarlo en el HTML
function creatHTML() {
    limpiarHTML(); //Siempre antes de mostrar el HTML hay que limpiarlo

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            //Crear el HTML
            const li = document.createElement("li");

            //añadir el texto
            li.innerText = tweet.tweet;
            
            //insertamos en el html 
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage(); //Llamamos a esta función para añadir los tweets a localStorage

}

//Agrega los tweets actuales a localStorage
function sincronizarStorage () {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Limpiar HTML
function limpiarHTML() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}