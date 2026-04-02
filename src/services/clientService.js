import api from "./api.js";

export const fetchClientsWithStats = async () => {
  const res = await api.get("/dashboard/clients");
  return res.data;
};

export const createClient = async (data) => {

  const res = await api.post("/clients", data);

  return res.data;

};

export const getClients = async () => {

  const res = await api.get("/clients");

  return res.data;

};

export const getClientById = async (clientId) =>{
  const res = await api.get(`/clients/${clientId}`);
  return res.data;
}

export const updateClient = async (clientId, data) =>{
  const res = await api.patch(`/clients/${clientId}`, data);
  return res.data;
}

export const deleteClient1 = async (clientId) =>{
  const res = await api.delete(`/clients/${clientId}`);
  return res.data;
}

