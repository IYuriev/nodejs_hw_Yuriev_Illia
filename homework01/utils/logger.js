const logger = (prefix) => {
  return {
    log: (message) => {
      console.log(`${prefix}:`, message);
    },
    warn: (message) => {
      console.error(`${prefix}:`, message);
    },
  };
};

module.exports = logger;
