import { getClients } from "../services/clientService.js";

export const fetchClients = async () => {

  try {
    const data = await getClients();

    return data.data;

  } catch (error) {

    console.error("Failed to load clients", error);

    return [];

  }

};