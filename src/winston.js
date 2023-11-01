import winston, { transports } from "winston";
import config from "./config.js";

/* export const logger = winston.createLogger({
  //level: "http",
  transports: [
    new winston.transports.Console({
      level: "http", //A partir de que nivel me muestra el logger (console.log)
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
}); */

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "yellow",
    info: "blue",
    http: "grey",
    debug: "green",
  },
};

/* export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors })
      ),
    }),
  ],
});
 */

export let logger;

if (config.environment === "PRODUCCION") {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.File({
        filename: "./errors.log",
        level: "error",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.prettyPrint()
        ),
      }),
      new winston.transports.Console({
        level: "info",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
    ],
  });
} else {
  logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevels.colors }),
          winston.format.simple()
        ),
      }),
    ],
  });
}
