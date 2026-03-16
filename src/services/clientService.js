import api from "./api.js";

export const getClients = async () => {

  const res = await api.get("/clients");

  return res.data;

};

export const createClient = async (data) => {

  const res = await api.post("/clients", data);

  return res.data;

};

