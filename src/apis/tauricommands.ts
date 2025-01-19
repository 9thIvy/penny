import { invoke } from "@tauri-apps/api/core";

const listFiles = async (directory: string) => {
  try {
    const files: string[] = await invoke("list_files", { directory });
    console.log("Files in directory:", files);
  } catch (error) {
    console.error("Error listing files:", error);
  }
};

const getSystems = async (): Promise<any[]> => {
  try {
    const data = await invoke<string>("get_systems");
    console.log("Loaded systems. Data:\n ", data);
    const systems: any[] = JSON.parse(data);
    return systems;
  } catch (error) {
    console.error("Failed to load systems: ", error);
    return [];
  }
};

const getCharacters = async () => {
  try {
    let data = await invoke("get_characters");
    console.log("Loaded characters. Data:\n ", data);
  } catch (error) {
    console.error("Failed to load characters: ", error);
  }
};

const load_file = async (fileLocation: string) => {
  try {
    const response = await invoke<{
      success: boolean;
      data?: Uint8Array;
      error?: string;
    }>("load_file", { fileLocation });

    if (response.success) {
      const textData = new TextDecoder().decode(response.data);
      console.log("File Loaded. Data:\n", textData);
    } else {
      console.error("Error loading file:", response.error);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

const saveCharacter = async (fileLocation: string, characterData: object) => {
  try {
    let data = await invoke("save_file", {
      fileLocation,
      characterData: JSON.stringify(characterData),
    });
    console.log("Character data saved!\n", data);
  } catch (error) {
    console.log("char data:\n", characterData);
    console.error("Error saving character data: ", error);
  }
};

export { saveCharacter, load_file, listFiles, getSystems, getCharacters };
