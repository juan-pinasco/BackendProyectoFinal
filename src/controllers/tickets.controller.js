import { createTicket } from "../services/tickets.service.js";
import { generateUniqueCode } from "../codeGenerator.js";

export const createTicket = async (req, res) => {
  const { code, purchase_datetime, amount, purchaser } = req.body;
  try {
    const code = generateUniqueCode();
    const ticket = await createTicket({
      code,
      purchase_datetime,
      amount,
      purchaser,
    });
    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
