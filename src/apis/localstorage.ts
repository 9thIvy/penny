export const saveCharacter = (fileName: string, fileData: string) => {
  try {
    localStorage.setItem(fileName, fileData);
    console.log(`Character file "${fileName}" saved successfully.`);
  } catch (error) {
    console.error("Error saving character file:", error);
  }
};

export const loadCharacter = (fileName: string) => {
  try {
    const fileData = localStorage.getItem(fileName);
    return fileData;
  } catch (error) {
    console.error(`Failed to retrieve file: ${fileName}\n`, error);
  }
  return null;
};

export const getChars = () => {
  const keys = Object.keys(localStorage);
  const characters = keys.map((key) => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        console.log("data:", data);
        const parsedData = JSON.parse(data);
        return {
          key,
          name: parsedData.name || "Cthulu Allspark",
          age: parsedData.age || "70,000",
          gender: parsedData.gender || "¯\_(ツ)_/¯",
        };
      } catch (error) {
        console.error("Failed to getChars:\n", error);
        return null; //error
      }
    }
    console.warn("getChars from localStorage.ts, no characters found.");
    return null; //no data;
  });
  console.log("Saved Characters: ", characters);
  return characters;
};

export const deleteCharacter = (fileName: string) => {
  try {
    localStorage.removeItem(fileName);
    console.log("Deleted: ", fileName);
  } catch (error) {
    console.error(`Error deleting ${fileName}\n${error}`);
  }
};
