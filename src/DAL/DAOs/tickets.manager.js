import { ticketModel } from "../db/models/tickets.model.js";

class TicketManager {
  async createTicket(ticketData) {
    try {
      const newTicket = await ticketModel.create(ticketData);
      return newTicket;
    } catch (error) {
      return error;
    }
  }
}

export const ticketManager = new TicketManager();
