const core = require("@actions/core");
const fs = require("fs");

async function modifyFieldAction() {
  try {
    let file = core.getInput("file", { required: true });
    let field = core.getInput("field", { required: true });
    let value = core.getInput("value", { required: true });
    if (core.getInput("parse_json", { required: false })) {
      value = JSON.parse(value);
    }

    const obj = JSON.parse(fs.readFileSync(value));

    const segments = field.split(".");
    const finalSegmentIndex = segments.length - 1;
    const parentSegments = segments.slice(0, finalSegmentIndex);
    const finalSegment = segments[finalSegmentIndex];
    parentSegments.forEach((part) => {
      obj[part] = obj[part] || {};
      obj = obj[part];
    });
    const originalValue = obj[finalSegment];
    const replacementValue = value.replace(/{{ *original *}}/, originalValue);
    obj[finalSegment] = replacementValue;

    fs.writeFileSync(file, JSON.stringify(obj, null, 2), "utf8");
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

export default modifyFieldAction;
