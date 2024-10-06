import { createContext } from "react";
import { useSockets } from "../hooks/useSockets";
import { port } from "../Api/port";

// Creo un contexto
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // Uso mi custom hook para obtener mi conexion a mi socket y el estado
  const { Online, socket } = useSockets(port);

  return (
    // Mando a renderizar los hijos del provider pasandoles la informacion que necesitan
    <SocketContext.Provider
      value={{
        Online,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
