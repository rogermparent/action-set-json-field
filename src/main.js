const modifyFieldAction = require("./action");

if (require.main === module) {
  modifyFieldAction()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
