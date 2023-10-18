import { ticketModel } from "./DAL/db/models/tickets.model.js";

export const generateUniqueCode = async () => {
  let uniqueCode;
  let isUnique = false;

  while (!isUnique) {
    // Genera un código único
    uniqueCode = generateRandomCode();
    // Verificamos si el code es único en la bbdd
    const existingTicket = await ticketModel.findOne({ code: uniqueCode });
    if (!existingTicket) {
      isUnique = true;
    }
  }
  return uniqueCode;
};

function generateRandomCode() {
  return "CODE-" + Math.random().toString(36);
}
