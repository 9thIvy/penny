import { v4 as uuidv4 } from "uuid";

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

//skills should probably be 2d array?
interface RPGSystem {
  name: string;
  author: string;
  version: string;
  attributes?: string[];
  image?: string;
  skills0?: Skill[]; //skills part of yags
  skills1?: Skill[]; // techniques part of yags
  skillsThirdColumn?: string;
  largeInput?: string; //if supplied, it creates a part that can be used as advantages and traits in yags
  //the string is the name of the field
}

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

const blankCharacter = createNewCharacter();

export type { RPGSystem, Skill, Character };
export { createNewCharacter, blankCharacter };
