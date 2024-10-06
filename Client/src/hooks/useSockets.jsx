import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";

export const useSockets = (serverPath) => {
  // Establezco la conexión a la API de Socket.IO
  const socket = useMemo(
    () =>
      io.connect(serverPath, {
        transports: ["websocket"],
      }),
    [serverPath]
  );

  // Estado para ver el estado de la conexión al servidor
  const [Online, setOnline] = useState(false);

  // Vemos el estado de nuestro socket
  useEffect(() => {
    // Dentro de las propiedades de nuestro socket podemos ver si estamos conectados o no
    // console.log(socket);

    // Vemos el estado de nuestra conexion
    setOnline(socket.connected);
  }, [socket]);

  // Estado de Online cuando este conectado
  useEffect(() => {
    // Si el connect esta en true cambiamos el estado a true
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  // Estado de Online cuando este desconectado
  useEffect(() => {
    // Si el disconnect esta en true cambiamos el estado a false
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    Online,
  };
};
