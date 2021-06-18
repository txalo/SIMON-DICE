
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

document.querySelector("#boton-empezar").onclick = function(){
  iniciarJuego();
}



function iniciarJuego(){
  secuencia = [];
  agregarCiclo(secuencia);
  reproducirSecuencia(secuencia);
  turnoJugador = true;
  
  secuenciador = 0;
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
        //console.log (`Presionado ${element.id} - Secuenciador: ${secuenciador} - Secuencia valor : ${secuencia[secuenciador]}`);
        document.querySelector("#estado div.alert").textContent = "Maxima secuencia correcta: " + correctasMax;
      }else{
        
      }

      if (secuenciador == secuencia.length){
        turnoJugador = false;
        agregarCiclo(secuencia);
        setTimeout(function(){reproducirSecuencia(secuencia)},2000);
        turnoJugador = true;
      } 
    }          
  
  
});

function reproducirSecuencia(secuencia){
  secuenciador = 0;
  for (let i = 0; i < secuencia.length; i++){
    setTimeout(function(){presionarCuadro(document.querySelector("#cuadro-"+secuencia[i]))},i * 900);
  }  
}

function agregarCiclo (secuencia){
  //let numero = ((Math.random()* 100)%4);
  let numero = (Math.random() * (4 - 1) + 1);
  secuencia.push(Math.round(numero));
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