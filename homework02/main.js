import { logger } from "./utils/logger.js";

const mainLogger = logger("main");

mainLogger.log("the script is running!");
mainLogger.warn("something went wrong!");
