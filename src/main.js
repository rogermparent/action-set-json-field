import modifyFileField from "./action";
import { getInput, setFailed } from "@actions/core";

async function main() {
  const file = getInput("file", { required: true });
  const field = getInput("field", { required: true });
  let value = getInput("value", { required: true });
  if (getInput("parse_json", { required: false })) {
    value = JSON.parse(value);
  }

  return modifyFileField(file, field, value);
}

main().catch((error) => {
  setFailed(error.message);
  throw error;
});
