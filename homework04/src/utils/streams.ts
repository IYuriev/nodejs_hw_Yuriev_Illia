import { createWriteStream } from "fs";

const writeStream = createWriteStream("./src/logs/server.log", { flags: "a" });

const writeLogs = (prefix: string, message: string) => {
  const result = `${prefix} ${message}\n`;
  writeStream.write(result);
};

export default writeLogs;
