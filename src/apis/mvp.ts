const dummySystem = [
  {
    name: "Dummy System",
    author: "No one",
    version: "0",
    attributes: ["Gumption", "Chutzpah", "Bravado", "Daring-Do"],
    skillsThirdColumn: "faith",
    skills: [
      {
        name: "Crying",
        value: 2,
        extra: 5, //test int input
      },
      {
        name: "Sobbing",
        value: 3,
        extra: 8,
      },
    ],
  },
];

interface Skill<T = any> {
  name: string;
  extra: T; //if bool, need checkbox, otherwise, should be an input
  value?: number;
}

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

const setCurrentSystem = (name: string) => {
  localStorage.setItem("currentSystem", name);
};
const getCurrentSystem = () => {
  localStorage.getItem("currentSystem");
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

export type { RPGSystem, Skill };
export {
  downloadSystems,
  loadSystems,
  cachedSystems,
  setCurrentSystem,
  getCurrentSystem,
};
