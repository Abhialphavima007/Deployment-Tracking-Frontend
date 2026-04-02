// deploymentController.js
import { getDeploymentsAPI } from '../services/deploymentService';

export const fetchDeployments = async (startDate, endDate) => {
  try {
    const response = await getDeploymentsAPI(startDate, endDate);
    return response;
  } catch (error) {
    throw error;
  }
};
