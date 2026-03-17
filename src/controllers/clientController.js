import { getClients } from "../services/clientService.js";
import { fetchClientsWithStats } from "../services/clientService";

export const fetchClients = async () => {

  try {
    const data = await getClients();

    return data.data;

  } catch (error) {

    console.error("Failed to load clients", error);

    return [];

  }

};

export const getClientsWithStats = async () => {

  try {

    const data = await fetchClientsWithStats();
    return data.data;

  } catch (error) {

    console.error("Failed to load clients", error);

    return [];

  }

};