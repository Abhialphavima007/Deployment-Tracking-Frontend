import Deployment from "../models/deployment.model.js";
import Client from "../models/client.model.js";

export const getClientStats = async (req, res) => {

  try {

    const stats = await Deployment.aggregate([
      {
        $group: {
          _id: "$client_id",

          pending: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0]
            }
          },

          testing: {
            $sum: {
              $cond: [{ $eq: ["$status", "testing"] }, 1, 0]
            }
          },

          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
            }
          }
        }
      }
    ]);

    const clients = await Client.find();

    const result = clients.map(client => {

      const stat = stats.find(
        s => s._id.toString() === client._id.toString()
      );

      return {
        client_id: client._id,
        client_name: client.name,
        description: client.description,

        pending: stat?.pending || 0,
        testing: stat?.testing || 0,
        completed: stat?.completed || 0
      };

    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};