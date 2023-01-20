
const sounds = {
    "cuadro-1": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    "cuadro-2": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    "cuadro-3": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    "cuadro-4": new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};
let secuencia = [];
let turnoJugador = false;
let correctasMax = 0;
let secuenciador = 0;
let record = 0;
const $maxima = document.querySelector("#maxima .marcador");
const $record = document.querySelector("#record .marcador");
const $estado = document.querySelector("#estado div.alert");

document.querySelector("#boton-empezar").onclick = function(){
  iniciarJuego();
}



function iniciarJuego(){
  actualizarEstado ("Imita la secuencia...");
  actualizarMaxima ("0");
  secuencia = [];
  agregarCiclo(secuencia);
  reproducirSecuencia(secuencia);
  turnoJugador = true;  
  secuenciador = 0;
  correctasMax = 0;
  $maxima.textContent = 0;  
}

function presionarCuadro (cuadro){
  sounds[cuadro.id].play();
  cuadro.style.opacity = 1;
  setTimeout(function(){cuadro.style.opacity = 0.75},500);
}

document.querySelectorAll(".cuadro").forEach(function(element){
  
    element.onclick = function(){
      if (turnoJugador && (element.id === "cuadro-" + secuencia[secuenciador])){
        presionarCuadro(element);        
        secuenciador++;
        correctasMax = (secuenciador > correctasMax) ? secuenciador : correctasMax;        
        actualizarMaxima(correctasMax);
        if (correctasMax > record) actualizarRecord(correctasMax);
      }else{
        turnoJugador = false;
        actualizarEstado("Fin del Juego. Presiona empezar para volver a jugar")

      }

      if (secuenciador == secuencia.length){
        turnoJugador = false;
        agregarCiclo(secuencia);
        //actualizarEstado("Atencion!");
        setTimeout(function(){
          reproducirSecuencia(secuencia);
          //actualizarEstado("Tu turno ..."); 
        },2000);
        turnoJugador = true;
        
      } 
    }          
  
  
});

function reproducirSecuencia(secuencia){  
  secuenciador = 0;
  for (let i = 0; i < secuencia.length; i++){
    setTimeout(function(){presionarCuadro(document.querySelector("#cuadro-"+secuencia[i]))},i * 1000);
  }
  
}

function agregarCiclo (secuencia){
  //let numero = ((Math.random()* 100)%4);
  let numero = (Math.random() * (4 - 1) + 1);
  secuencia.push(Math.round(numero));
}

function actualizarEstado(mensaje){
  $estado.textContent = mensaje;
}

function actualizarMaxima(maxima){
  $maxima.textContent = maxima;
}

function actualizarRecord(nuevoRecord){
  record = nuevoRecord;
  $record.textContent = record;
  //Prueba
}


//reproducirSecuencia(secuencia);
/*
$verde.onclick = function(){
  sounds["cuadro-1"].play();
}

$rojo.onclick = function(){
  sounds["cuadro-2"].play();
  $rojo.style.backgroundColor = "#f00";
  setTimeout(function(){$rojo.style.backgroundColor = "#dc143c"},200);
}

$amarillo.onclick = function(){
  sounds["cuadro-3"].play();
  $amarillo.style.backgroundColor = "#ff0";
  setTimeout(function(){$amarillo.style.backgroundColor = "#ffd700"},200);
}

$azul.onclick = function(){
  sounds["cuadro-4"].play();
  $azul.style.opacity = 1;
  setTimeout(function(){$azul.style.opacity = 0.75},200);
}*/