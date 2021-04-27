import fs from "fs";

async function modifyField(file, field, value) {
  const fullObject = JSON.parse(String(fs.readFileSync(file)));
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
}

export default modifyField;
