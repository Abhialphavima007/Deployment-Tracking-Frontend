import { createClient, getClients, updateClient, deleteClient1 } from "../services/clientService.js";
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


// Save client (create or update)
export const saveClient = async (form, editingClient) =>{
  try {
    if (editingClient) {
      await updateClient(editingClient._id, form);
    } else {
      await createClient(form);
    }
    return true;

  } catch (error) {
    console.error("Error saving client", error);
    return false;
  }
}

// Delete Client
export const deleteClient =async (clientId)=>{
  try{
    await deleteClient1(clientId);
    return true;
  }catch(err){
    console.error("Error deleting client: ",err);
    return false;
  }
}

