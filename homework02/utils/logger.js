import colors from "colors/safe.js";
import "dotenv/config";

if (process.env.COLORS_ENABLED === "false") {
  colors.disable();
}

export const logger = (prefix) => {
  return {
    log: (message) => {
      console.log(colors.green(`${prefix}:`), message);
    },
    warn: (message) => {
      console.error(colors.red(`${prefix}:`), message);
    },
  };
};
