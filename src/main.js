const core = require("@actions/core");
const fs = require("fs");

async function main() {
  try {
    let file = core.getInput("file", { required: true });
    let field = core.getInput("field", { required: true });
    let value = core.getInput("value", { required: true });
    if (core.getInput("parse_json", { required: false })) {
      value = JSON.parse(value);
    }

    let obj = JSON.parse(data);
    let root = require(file);

    const segments = field.split(".");
    const finalSegmentIndex = segments.length - 1;
    const parentSegments = segments.slice(0, finalSegmentIndex);
    const finalSegment = segments[finalSegmentIndex];
    parentSegments.forEach((part) => {
      obj[part] = obj[part] || {};
      obj = obj[part];
    });
    const originalValue = obj[finalSegment];
    obj[finalSegment] = value.replace(/${{ *originalValue *}}/, originalValue);

    fs.writeFileSync(file, JSON.stringify(root, null, 2), "utf8");
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
