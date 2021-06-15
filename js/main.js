
var sounds = {
    "boton-1": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
    "boton-2": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
    "boton-3": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
    "boton-4": new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
};


  const $verde = document.querySelector("#boton-1");
  const $rojo = document.querySelector("#boton-2");
  const $amarillo = document.querySelector("#boton-3");
  const $azul  = document.querySelector("#boton-4");

  $verde.onclick = function(){
    sounds["boton-1"].play();
  }

  $rojo.onclick = function(){
    sounds["boton-2"].play();
  }

  $amarillo.onclick = function(){
    sounds["boton-3"].play();
  }

  $azul.onclick = function(){
    sounds["boton-4"].play();
  }