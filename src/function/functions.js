import { fakerGenerateEntry } from "../data/fakerData";
export const checkKeyPresent = (obj) => {
  let invalidValue = [];
  let updatedKey = {};
  if (obj) {
    for (let [key, value] of Object.entries(obj)) {
      let isKeyValid = fakerGenerateEntry.find(
        (data) =>
          data.data_type === value.toLocaleLowerCase().replaceAll(" ", "_")
      );

      if (!isKeyValid) {
        invalidValue.push({ key, value });
        updatedKey[key] = "";
      } else {
        updatedKey[key] = value;
      }
    }
    return { invalidValue, updatedKey };
  }
  return [];
};
