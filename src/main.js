import modifyFileField from "./action";
import core from "@actions/core";

async function main() {
  const file = core.getInput("file", { required: true });
  const field = core.getInput("field", { required: true });
  let value = core.getInput("value", { required: true });
  if (core.getInput("parse_json", { required: false })) {
    value = JSON.parse(value);
  }

  return modifyFileField(file, field, value);
}

main().catch((error) => {
  core.setFailed(error.message);
  throw error;
});
