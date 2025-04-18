import {
  writeTextFile,
  BaseDirectory,
  mkdir,
  readDir,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import type { RPGSystem } from "./mvp";

const loadSystemMeta = async (): Promise<RPGSystem[]> => {
  const entries = await readDir("./data/systems", {
    baseDir: BaseDirectory.AppData,
  });
  console.log(entries);

  const readPromises = entries.map(async (entry) => {
    try {
      /*
      TODO: There *HAS* to be a better way to prefix things.
      Maybe BaseDir can be changed to a subdir of appdata???
      I can't find anything >_>
      */
      const content = await readTextFile("./data/systems/" + entry.name, {
        baseDir: BaseDirectory.AppData,
      });
      return JSON.parse(content) as RPGSystem;
    } catch (error) {
      console.log(`Failed to read or parse file ${entry.name}:`, error);
      return null;
    }
  });

  const results = await Promise.all(readPromises);
  return results.filter((r): r is RPGSystem => r !== null);
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
  try {
    await mkdir("data/systems", {
      baseDir: BaseDirectory.AppData,
      recursive: true,
    });
    return true;
  } catch (error) {
    console.log("initBoilerData failed: ", error);
    return false;
  }
};

//probably cause conflict with function of same name in mvp.ts
//TODO: don't download if it already exists in APPDATA
const downloadSystems = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/9thIvy/dime/refs/heads/main/yags.rpg",
    );
    const response2 = await fetch(
      "https://raw.githubusercontent.com/9thIvy/dime/refs/heads/main/cringe.rpg",
    );

    const data = await response.json();
    const data2 = await response2.json();

    await Promise.all([
      writeToAppData(`data/systems/${data.name}`, JSON.stringify(data)),
      writeToAppData(`data/systems/${data2.name}`, JSON.stringify(data2)),
    ]);

    return true;
  } catch (error) {
    console.error("Failed to get systems: ", error);
    return false;
  }
};

export {
  initialiseBoilerData,
  downloadSystems,
  writeToAppData,
  loadSystemMeta,
};
