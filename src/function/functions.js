export function formatText(text) {
  let updateText = text
    .toLowerCase()
    .replace(/[{[\]()}]/g, "")
    .split(" ")
    .join("_");
  return updateText;
}
