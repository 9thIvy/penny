import { v4 as uuidv4 } from "uuid";
const dummySystem = [
  {
    name: "Dummy System",
    author: "No one",
    version: "0",
    attributes: ["Gumption", "Chutzpah", "Bravado", "Daring-Do"],
    skillsThirdColumn: "faith",
    skills0: [
      {
        name: "Crying",
        extra: 1, //test int input
      },
      {
        name: "Sobbing",
        extra: 1,
      },
    ],
  },
];

interface Skill<T = any> {
  name: string;
  extra: T; //if bool, need checkbox, otherwise, should be an input
  value?: number;
}

interface Character {
  id: string;
  name: string;
  age: string;
  gender: string;
  profession: string;
  Acrobatics: string;
  AnimalHandling: string;
  Arcana: string;
  Athletics: string;
  Deception: string;
  History: string;
  system: string;
  attributes: string[];
  dexterity: string;
  strength: string;
  constitution: string;
  wisdom: string;
  intelligence: string;
  charisma: string;
  skills0: Skill[]; // skills part of yags
  image?: string;
  skills1?: Skill[]; // techniques part of yags
  largeInput?: string;
}

const blankCharacter: Character = {
  id: "",
  name: "",
  age: "",
  gender: "",
  profession: "",
  Acrobatics: "",
  AnimalHandling: "",
  Arcana: "",
  Athletics: "",
  Deception: "",
  History: "",
  system: "",
  attributes: [],
  dexterity: "",
  strength: "",
  constitution: "",
  wisdom: "",
  intelligence: "",
  charisma: "",
  skills0: [],
  skills1: [],
  image: undefined,
  largeInput: "",
};

interface RPGSystem {
  name: string;
  author: string;
  version: string;
  attributes: string[];
  image?: string;
  skills0: Skill[]; //skills part of yags
  skills1?: Skill[]; // techniques part of yags
  skillsThirdColumn: string;
  largeInput?: string; //if supplied, it creates a part that can be used as advantages and traits in yags
  //the string is the name of the field
}

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

    console.log("Loaded systems. Data:\n", data);

    let storageItem = JSON.stringify([data, data2]);
    localStorage.setItem("systems", storageItem);
    return true;
  } catch (error) {
    console.error("Failed to get systems: ", error);
    return false;
  }
};

const getCharacters = (name?: string) => {
  const storedCharacters = localStorage.getItem("characters");
  if (!storedCharacters) {
    return [];
  }
  if (name) {
    const characters: Character[] = JSON.parse(storedCharacters);
    const filteredCharacters = characters.filter(
      (character) => character.system === name,
    );
    return filteredCharacters;
  } else {
    return JSON.parse(storedCharacters);
  }
};

const getSystem = (name: string) => {
  const storedSystems = localStorage.getItem("systems");
  if (storedSystems) {
    const systems: RPGSystem[] = JSON.parse(storedSystems);
    const filteredSystems = systems.filter((system) => system.name === name);
    return filteredSystems;
  }
  return dummySystem;
};

const saveCharacter = (newCharacter: Character) => {
  const storedCharacters = localStorage.getItem("characters");
  let characters: Character[] = storedCharacters
    ? JSON.parse(storedCharacters)
    : [];

  const existingIndex = characters.findIndex(
    (character) => character.name === newCharacter.name,
  );

  if (existingIndex !== -1) {
    characters[existingIndex] = newCharacter;
  } else {
    characters.push(newCharacter);
  }

  localStorage.setItem("characters", JSON.stringify(characters));
};

const setCurrentCharacter = (currentCharacter: Character) => {
  localStorage.setItem("currentCharacter", JSON.stringify(currentCharacter));
};
const getCurrentCharacter = () => {
  return localStorage.getItem("currentCharacter");
};

const setCurrentSystemName = (name: string) => {
  localStorage.setItem("currentSystem", name);
};
const getCurrentSystemName = () => {
  return localStorage.getItem("currentSystem");
};

const cachedSystems = (): boolean => {
  const storedData = localStorage.getItem("systems");
  if (storedData) {
    return true;
  }
  return false;
};

const loadSystems = (): RPGSystem[] => {
  const storedData = localStorage.getItem("systems");
  return storedData ? JSON.parse(storedData) : dummySystem;
};

const createNewCharacter = (): Character => {
  return {
    id: uuidv4(),
    name: "",
    age: "",
    gender: "",
    profession: "",
    system: "test",
    attributes: [],
    skills0: [
      { name: "test", extra: 1 },
      { name: "test2", extra: 1 },
    ],
    skills1: [],
    dexterity: "",
    strength: "",
    constitution: "",
    wisdom: "",
    intelligence: "",
    charisma: "",
    largeInput: "",
    Acrobatics: "",
    AnimalHandling: "",
    Arcana: "",
    Athletics: "",
    Deception: "",
    History: "",
  };
};

export type { RPGSystem, Skill, Character };
export {
  createNewCharacter,
  downloadSystems,
  loadSystems,
  cachedSystems,
  getSystem,
  setCurrentSystemName,
  getCurrentSystemName,
  getCurrentCharacter,
  setCurrentCharacter,
  getCharacters,
  saveCharacter,
  blankCharacter,
};
