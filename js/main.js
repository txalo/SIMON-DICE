
const sounds = {
    "cuadro-1": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    "cuadro-2": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    "cuadro-3": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    "cuadro-4": new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};

const $actual = document.querySelector("#actual .marcador");
const $record = document.querySelector("#record .marcador");
const $estado = document.querySelector("#estado div.alert");

const ESTADO_JUEGO = {
  secuencia: [],
  secuenciador: 0,
  turnoJugador: false,
  correctas: 0,
  record: 0
}

function iniciarJuego(){
  actualizarEstado ("IMITA LA SECUENCIA");
  actualizarContador ("0");
  ESTADO_JUEGO.secuencia = [];
  agregarCiclo(ESTADO_JUEGO.secuencia);
  reproducirSecuencia(ESTADO_JUEGO);  
  ESTADO_JUEGO.secuenciador = 0;
  ESTADO_JUEGO.correctas = 0;  
}

function presionarCuadro (cuadro){
  sounds[cuadro.id].play();
  cuadro.style.opacity = 1; 
  setTimeout(function(){cuadro.style.opacity = 0.5},500);
}

function reproducirSecuencia(estadoJuego){  
  estadoJuego.secuenciador = 0; 
  estadoJuego.turnoJugador = false; 
  for (let i = 0; i < estadoJuego.secuencia.length; i++){
    setTimeout(function(){
      presionarCuadro(document.querySelector("#cuadro-"+estadoJuego.secuencia[i]));      
      if (i == estadoJuego.secuencia.length-1){        
        estadoJuego.turnoJugador = true;    
      }
    },i * 1000);
  }    
}

function agregarCiclo(secuencia){  
  let numero = (Math.random() * (4 - 1) + 1);
  secuencia.push(Math.round(numero));
}

function actualizarEstado(mensaje){
  $estado.textContent = mensaje;
}

function actualizarContador(contador){
  $actual.textContent = contador;
}

function actualizarRecord(nuevoRecord){
  ESTADO_JUEGO.record = nuevoRecord;
  $record.textContent = ESTADO_JUEGO.record;  
}

document.querySelectorAll(".cuadro").forEach(function(element){
  
  element.onclick = function(){    
    if (ESTADO_JUEGO.turnoJugador){
      if (element.id === "cuadro-" + ESTADO_JUEGO.secuencia[ESTADO_JUEGO.secuenciador]){
          presionarCuadro(element);        
          ESTADO_JUEGO.secuenciador++;
          ESTADO_JUEGO.correctas = (ESTADO_JUEGO.secuenciador > ESTADO_JUEGO.correctas) ? ESTADO_JUEGO.secuenciador : ESTADO_JUEGO.correctas;        
          actualizarContador(ESTADO_JUEGO.correctas);
          if (ESTADO_JUEGO.correctas > ESTADO_JUEGO.record) actualizarRecord(ESTADO_JUEGO.correctas);
      }else{          
          ESTADO_JUEGO.turnoJugador = false;
          actualizarEstado("FIN DEL JUEGO!")
      }
        
      if (ESTADO_JUEGO.secuenciador == ESTADO_JUEGO.secuencia.length){        
        ESTADO_JUEGO.turnoJugador = false
        agregarCiclo(ESTADO_JUEGO.secuencia);
        setTimeout(function(){
          reproducirSecuencia(ESTADO_JUEGO);
        },500 * ESTADO_JUEGO.secuencia.length);        
      } 
    }
  }            
});
  
document.querySelector("#boton-empezar").onclick = function(){
  iniciarJuego();
}