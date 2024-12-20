import colors from "colors/safe.js";
import "dotenv/config";
import writeLogs from "./streams";

if (process.env.COLORS_ENABLED === "false") {
  colors.disable();
}

const logger = (prefix: string) => {
  return {
    log: (message: string) => {
      console.log(colors.green(`${prefix}:`), message);
      writeLogs(`${prefix}:`, message);
    },
    warn: (message: string) => {
      console.error(colors.red(`${prefix}:`), message);
      writeLogs(`WARN ${prefix}:`, message);
    },
  };
};

export default logger;
