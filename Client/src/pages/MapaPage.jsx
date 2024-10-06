import React, { useContext, useEffect } from "react";
import { useMapbox } from "../hooks/useMapbox";
import { SocketContext } from "../Context/SocketContext";

const puntoInicial = {
  lng: -122.4725,
  lat: 37.801,
  zoom: 13.5,
};

export const MapaPage = () => {
  // Extraigo de mi hook las propiedades que voy a utilizar
  const {
    setRef,
    coords,
    nuevoMarcador$,
    movimientoMarcador$,
    agregarMarcador,
    actualizarPoscicion,
  } = useMapbox(puntoInicial);

  // Extraigo de mi context el socket
  const { socket } = useContext(SocketContext);

  // Escuchamos los marcadores existentes del lado del servidor
  useEffect(() => {
    socket.on("marcadores", (marcadores) => {
      // Vemos si todo va bien
      // console.log("Lista:", marcadores);

      // Los marcadores son un objeto, tenemos que barrerlo
      for (const key of Object.keys(marcadores)) {
        // Vemos en consola si todo va bien
        // console.log(marcadores[key], key);

        // Agregamos el marcador
        agregarMarcador(marcadores[key], key);
      }
    });
  }, [socket, agregarMarcador]);

  // Capturamos cuando se crea el marcador y lo enviamos al servidor
  useEffect(() => {
    nuevoMarcador$.subscribe((marcador) => {
      // Emitimos un nuevo marcador
      socket.emit("nuevo-marcador", marcador);
    });
  }, [nuevoMarcador$, socket]);

  // Capturamos el movimiento del marcador y lo enviamos al servidor
  useEffect(() => {
    movimientoMarcador$.subscribe((marcador) => {
      // Vemos si todo va bien
      // console.log(marcador);

      // Enviamos la posición del marcador a actualizar al servidor
      socket.emit("actualizar-marcador", marcador);
    });
  }, [movimientoMarcador$]);

  // Movemos el marcador mediante sockets
  useEffect(() => {
    socket.on("actualizar-marcador", (marcador) => {
      // Actualizamos el marcador
      actualizarPoscicion(marcador);
    });
  }, [socket, actualizarPoscicion]);

  // Escuchamos los marcadores creados por los usuarios
  useEffect(() => {
    socket.on("nuevo-marcador", (marcador) => {
      // Vemos si todo va bien
      // console.log(marcador);

      // Mostramos los marcadores
      agregarMarcador(marcador, marcador.id);
    });
  }, [socket, agregarMarcador]);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>

      <div ref={setRef} className="mapContainer" />
    </>
  );
};
