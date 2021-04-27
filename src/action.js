import core from "@actions/core";
import fs from "fs";

async function modifyFieldAction() {
  try {
    const file = core.getInput("file", { required: true });
    const field = core.getInput("field", { required: true });
    let value = core.getInput("value", { required: true });
    if (core.getInput("parse_json", { required: false })) {
      value = JSON.parse(value);
    }

    const fullObject = JSON.parse(fs.readFileSync(file));
    let currentlySelectedObject = fullObject;

    const segments = field.split(".");
    const finalSegmentIndex = segments.length - 1;
    const parentSegments = segments.slice(0, finalSegmentIndex);
    const finalSegment = segments[finalSegmentIndex];
    parentSegments.forEach((part) => {
      currentlySelectedObject[part] = currentlySelectedObject[part] || {};
      currentlySelectedObject = currentlySelectedObject[part];
    });
    const originalValue = currentlySelectedObject[finalSegment];
    const replacementValue = value.replace(/{{ *original *}}/, originalValue);
    currentlySelectedObject[finalSegment] = replacementValue;

    fs.writeFileSync(file, JSON.stringify(fullObject, null, 2), "utf8");
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

export default modifyFieldAction;
