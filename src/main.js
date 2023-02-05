const ESTADO_JUEGO = {
  secuencia: [],
  secuenciador: 0,
  turnoJugador: false,
  correctas: 0,
  record: 0,
};

function obtbenerTiempoRetraso(){
  const TIEMPO_RETRASO = 500;
  return TIEMPO_RETRASO;
}

function iniciarJuego(estadoJuego) {
  resetearEstado(estadoJuego);
  actualizarContador("0");
  agregarCiclo(estadoJuego.secuencia);
  mostrarAnimacionInicio();
  setTimeout(function () {
    reproducirSecuencia(estadoJuego);
  }, obtbenerTiempoRetraso() * 13);
  manejarClick(estadoJuego);
}

function manejarClick(estadoJuego) {
  const $tablero = document.getElementById("tablero");

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
        } else {
          estadoJuego.turnoJugador = false;
          const proximoCuadro = document.querySelector(
            `#cuadro-${estadoJuego.secuencia[estadoJuego.secuenciador]}`
          );
          mostrarAnimacionError(proximoCuadro);
          estadoJuego.record =
            estadoJuego.correctas > estadoJuego.record
              ? estadoJuego.correctas
              : estadoJuego.record;
          actualizarRecord(estadoJuego.record);
        }

        if (estadoJuego.secuencia.length == estadoJuego.secuenciador) {
          estadoJuego.turnoJugador = false;
          agregarCiclo(estadoJuego.secuencia);
          setTimeout(function () {
            reproducirSecuencia(estadoJuego);
          }, obtbenerTiempoRetraso() * estadoJuego.secuencia.length);
        }
      }
    }
  };
}

document.querySelector("#boton-empezar").onclick = function () {
  iniciarJuego(ESTADO_JUEGO);
};

function resetearEstado(estadoJuego) {
  estadoJuego.secuencia = [];
  estadoJuego.secuenciador = 0;
  estadoJuego.correctas = 0;
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
    }, i * obtbenerTiempoRetraso() * 2);
  }
}

function agregarCiclo(secuencia) {
  let numero = Math.random() * (4 - 1) + 1;
  secuencia.push(Math.round(numero));
}

function presionarCuadro(cuadro) {
  reproducirSonido(cuadro);
  iluminarCuadro(cuadro);
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

function iluminarCuadro(cuadro) {
  cuadro.style.opacity = 1;
  setTimeout(function () {
    cuadro.style.opacity = 0.5;
  }, obtbenerTiempoRetraso());
}

function animarCuadros() {
  for (let i = 1; i <= 4; i++) {
    let cuadro = document.querySelector(`#cuadro-${i}`);
    setTimeout(function () {
      iluminarCuadro(cuadro);
      reproducirSonido(cuadro, 1.75);
    }, i * obtbenerTiempoRetraso());
  }
}

function destellarCuadro(cuadro, destellos = 3) {
  for (let i = 0; i < destellos; i++) {
    setTimeout(function () {
      cuadro.style.opacity = 1;
      setTimeout(function () {
        cuadro.style.opacity = 0.5;
      }, obtbenerTiempoRetraso());
    }, i * obtbenerTiempoRetraso() * 2);
  }
}

function destellarCuadros(destellos) {
  const $cuadros = document.querySelectorAll(".cuadro");
  for (let i = 0; i < destellos; i++) {
    setTimeout(function () {
      $cuadros.forEach((cuadro) => {
        cuadro.style.opacity = 1;
        setTimeout(function () {
          cuadro.style.opacity = 0.5;
        }, obtbenerTiempoRetraso());
      });
    }, i * obtbenerTiempoRetraso() * 2);
  }
}

function mostrarAnimacionInicio() {
  animarCuadros();
  setTimeout(() => {
    destellarCuadros(3);
  }, obtbenerTiempoRetraso() * 6);
}

function mostrarAnimacionError(cuadro) {
  destellarCuadro(cuadro);
  reproducirSonido(cuadro, 0.5);
}

function reproducirSonido(cuadro, velocidad = 1) {
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
  const sonido = sounds[cuadro.id];

  sonido.pause();
  sonido.playbackRate = velocidad;
  sonido.currentTime = 0;
  sonido.play();
}
