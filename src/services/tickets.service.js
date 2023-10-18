import { ticketManager } from "../DAL/DAOs/tickets.manager.js";

export const createTicket = async (ticketData) => {
  const newTicket = await ticketManager.createTicket(ticketData);
  return newTicket;
};
