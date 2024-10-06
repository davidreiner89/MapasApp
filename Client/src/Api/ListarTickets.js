import { port } from "./port";

// Funcion para obtener todos los tickets del servidor
export const getTickets = async () => {
  const resp = await fetch(port + "/listar");
  const data = await resp.json();
  return data.lista;
};
