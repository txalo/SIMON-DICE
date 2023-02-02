const sounds = {
  "cuadro-1": new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
  ),
  "cuadro-2": new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
  ),
  "cuadro-3": new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
  ),
  "cuadro-4": new Audio(
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  ),
};

const ESTADO_JUEGO = {
  secuencia: [],
  secuenciador: 0,
  turnoJugador: false,
  correctas: 0,
  record: 0,
};

function iniciarJuego(estadoJuego) {
  actualizarContador("0");
  estadoJuego.secuencia = [];
  agregarCiclo(estadoJuego.secuencia);
  actualizarEstado("MEMORIZA LA SECUENCIA");
  setTimeout(function () {
    reproducirSecuencia(estadoJuego);
    actualizarEstado("IMITA LA SECUENCIA");
  }, 2000);
  estadoJuego.secuenciador = 0;
  estadoJuego.correctas = 0;
  manejarClick(estadoJuego)
}

function manejarClick(estadoJuego) {
  const $tablero = document.getElementById('tablero');

  $tablero.onclick = function (elemento) {
    const clickeado = elemento.target;
    
    if (clickeado.classList.contains("cuadro")) {
      if (estadoJuego.turnoJugador) {
        if (
          clickeado.id ===
          `cuadro-${estadoJuego.secuencia[estadoJuego.secuenciador]}`
          ) {
            presionarCuadro(clickeado);
            estadoJuego.secuenciador++;
            estadoJuego.correctas =
            estadoJuego.secuenciador > estadoJuego.correctas
            ? estadoJuego.secuenciador
            : estadoJuego.correctas;
            actualizarContador(estadoJuego.correctas);
            estadoJuego.record =
            estadoJuego.correctas > estadoJuego.record
            ? estadoJuego.correctas
            : estadoJuego.record;
            actualizarRecord(estadoJuego.record);
          } else {
            estadoJuego.turnoJugador = false;
            actualizarEstado('FIN DEL JUEGO!');
          }
          
          if (estadoJuego.secuencia.length == estadoJuego.secuenciador){
            estadoJuego.turnoJugador = false;
            agregarCiclo(estadoJuego.secuencia);
            setTimeout(function () {
              reproducirSecuencia(estadoJuego);
            }, 400 * estadoJuego.secuencia.length);            
          }
        }
    }
  };
}

function presionarCuadro(cuadro) {
  sounds[cuadro.id].pause();
  sounds[cuadro.id].currentTime = 0;
  sounds[cuadro.id].play();
  cuadro.style.opacity = 1;
  setTimeout(function () {
    cuadro.style.opacity = 0.5;
  }, 500);
}

function reproducirSecuencia(estadoJuego) {
  estadoJuego.secuenciador = 0;
  estadoJuego.turnoJugador = false;
  for (let i = 0; i < estadoJuego.secuencia.length; i++) {
    setTimeout(function () {
      presionarCuadro(
        document.querySelector("#cuadro-" + estadoJuego.secuencia[i])
      );
      if (i == estadoJuego.secuencia.length - 1) {
        estadoJuego.turnoJugador = true;
      }
    }, i * 800);
  }
}

function agregarCiclo(secuencia) {
  let numero = Math.random() * (4 - 1) + 1;
  secuencia.push(Math.round(numero));
}

function actualizarEstado(mensaje) {
  const $estado = document.querySelector("#estado div.alert");
  $estado.textContent = mensaje;
}

function actualizarContador(contador) {
  const $contador = document.querySelector("#actual .marcador");
  $contador.textContent = contador;
}

function actualizarRecord(nuevoRecord) {
  const $record = document.querySelector("#record .marcador");
  $record.textContent = nuevoRecord;
}

document.querySelector("#boton-empezar").onclick = function () {
  iniciarJuego(ESTADO_JUEGO);
};
