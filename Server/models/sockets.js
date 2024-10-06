const Marcadores = require("./marcadores");

class Sockets {
  constructor(io) {
    this.io = io;

    this.marcadores = new Marcadores();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // Envio al cliente todos los marcadores
      socket.emit("marcadores", this.marcadores.activos);

      // Recibo un nuevo marcador {id , lng, lat}
      socket.on("nuevo-marcador", (marcador) => {
        // Vemos si todo va bien
        // console.log("marcador-nuevo :", marcador);

        // Agregamos el marcador a la lista
        this.marcadores.agregarMarcador(marcador);

        // Lo enviamos a todos los usuarios menos al que lo creo
        socket.broadcast.emit("nuevo-marcador", marcador);
      });

      // Actualizar un marcador
      socket.on("actualizar-marcador", (marcador) => {
        // Buscamos el marcador y actualizamos su posicion
        this.marcadores.actualizarMarcador(marcador);

        // Lo mandamos a todos los usuarios menos al que lo esta moviendo
        socket.broadcast.emit("actualizar-marcador", marcador);
      });
    });
  }
}

// La diferencia entre broadcast y emit es que:
// - Emit se envía solo a este sockets específico, por ejemplo cuando queremos mostrarle algo solo a él.
// - Broadcast se envia a todos los demas sockets conectados, por ejemplo cuando queremos avisar a todos de algo.

module.exports = Sockets;
