import colors from "colors";
import "dotenv/config";

if (process.env.COLORS_ENABLED === "false") {
  colors.disable();
}

export const logger = (prefix) => {
  return {
    log: (message) => {
      console.log(`${prefix}:`.green, message);
    },
    warn: (message) => {
      console.error(`${prefix}:`.red, message);
    },
  };
};
