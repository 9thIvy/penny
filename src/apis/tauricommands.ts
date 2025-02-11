import {
  writeTextFile,
  writeFile,
  BaseDirectory,
  readDir,
  exists,
  mkdir,
} from "@tauri-apps/plugin-fs";

const doesExist = async (location: string): Promise<boolean> => {
  return await exists(location, { baseDir: BaseDirectory.AppData });
};

const writeToAppData = async (
  location: string,
  contents: string,
): Promise<void> => {
  return await writeTextFile(location, contents, {
    baseDir: BaseDirectory.AppData,
  });
};

const initialiseBoilerData = async (): Promise<boolean> => {
  const dataExists = await doesExist("data");
  const systemsExists = await doesExist("data/systems");

  if (!dataExists) {
    await mkdir("data", { baseDir: BaseDirectory.AppData });
  }
  if (!systemsExists) {
    await mkdir("data/systems", { baseDir: BaseDirectory.AppData });
  }

  return true;
};

const downloadSystems1 = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/9thIvy/dime/refs/heads/main/yags.rpg",
    );
    const response2 = await fetch(
      "https://raw.githubusercontent.com/9thIvy/dime/refs/heads/main/cringe.rpg",
    );

    const data = await response.json();
    const data2 = await response2.json();

    //maybe doesn't need await?
    await writeToAppData(`data/systems/${data.name}`, JSON.stringify(data));
    await writeToAppData(`data/systems/${data2.name}`, JSON.stringify(data2));

    return true;
  } catch (error) {
    console.error("Failed to get systems: ", error);
    return false;
  }
};

export { initialiseBoilerData, downloadSystems1 };
