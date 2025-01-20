import { invoke } from "@tauri-apps/api/core";
import { exists, BaseDirectory, readFile, create } from "@tauri-apps/plugin-fs";
import { appDataDir } from "@tauri-apps/api/path";

const listFiles = async (directory: string) => {
  try {
    const files: string[] = await invoke("list_files", { directory });
    console.log("Files in directory:", files);
  } catch (error) {
    console.error("Error listing files:", error);
  }
};

const getYags = async (): Promise<any[]> => {
  try {
    const data = await invoke<string>("get_yags");
    console.log("Loaded yags. Data:\n ", data);
    const systems: any[] = JSON.parse(data);
    return systems;
  } catch (error) {
    console.error("Failed to load yags: ", error);
    return [];
  }
};

const getSystems = async (): Promise<any[]> => {
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
    return [data, data2];
  } catch (error) {
    console.error("Failed to get systems: ", error);
    return getSystemsFallback();
  }
};

//a little bit of tomfoolery
const getSystemsFallback = (): Promise<any[]> => {
  return Promise.resolve([
    {
      name: "yags",
      author: "Samuel Penn",
      version: "0.8.0",
      characterCreation: {
        basic_info: [
          {
            name: "age",
            description: "How old your character is.",
            area: "basic",
            input_type: "text",
          },
          {
            name: "gender",
            description: "The gender of your character.",
            area: "basic",
            input_type: "text",
          },
          {
            name: "name",
            description: "The name of your character.",
            area: "basic",
            input_type: "text",
          },
          {
            name: "wealth/status",
            description: "The wealth or status of your character.",
            area: "basic",
            input_type: "text",
          },
          {
            name: "origin/nationality",
            description: "The origin or nationality of your character.",
            area: "basic",
            input_type: "text",
          },
          {
            name: "height/weight",
            description: "The height and weight of your character.",
            area: "basic",
            input_type: "text",
          },
        ],
        attributes_info: [
          {
            metainfo: {
              append: false,
              formula: "1",
              "formula-cost": "Attributes",
            },
          },
          {
            name: "strength",
            description:
              "Strength measures a character's ability to hurt,\nbreak and lift things. Some effects, such as how much you can\ncarry, are based on the square of your strength.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "health",
            description:
              "Health is a measure of endurance and fitness. Checks\nto remain alive after being injured, resisting poison and\navoiding fatigue are all based on health.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "agility",
            description:
              "Quickness and acrobatic ability are measured by\nagility. It is also used for brawling, but not melee or missile\nweapons. Athletes, cat burglars and martial artists require a\ngood agility.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "dexterity",
            description:
              "The dexterity of a character defines their hand-eye\ncoordination, sleight-of-hand, and skill with melee weapons,\npistols, thrown weapons and driving. Thieves, warriors and\nrace car drivers need a good dexterity.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "perception",
            description:
              "Perception is a measure of general alertness and\nsensory ability. High perception characters have good senses\n(vision, hearing) and observational ability. Use of rifles and\nbows comes under Perception.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "intelligence",
            description:
              "Intelligence is a measure of wit, cunning,\nmemory and intuition. Intelligence is used to know and\nremember things, to study and for logic. Sages, researchers and\nscientists will use intelligence a lot.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "empathy",
            description:
              "Empathy is the ability to understand other people.\nA high empathy does not necessarily make you charismatic,\nbut a charismatic person will need a high empathy in order to\nbe able to react to and manipulate another's emotions.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "will",
            description:
              "Strength of will is used to overcome base instincts, such\nas fear and lust. If you have a high will, you are more resistant\nto magic, are less gullible and tend to be a good liar, making\nit useful for con artists and supernatural investigators.",
            area: "attributes",
            input_type: "number",
            default: 3,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
        ],
        attributes_secondary_info: [
          {
            name: "size",
            description:
              "Size defaults to five for adult humans, with most adults\nranging from four to six. Size governs how much damage a\ncreature can soak up. A blue whale is about size 21. It cannot\nbe raised with experience.",
            area: "secondary_attributes",
            input_type: "select",
            options: [4, 5, 6],
          },
          {
            name: "Soak",
            description:
              "Soak represents the character's ability to resist damage.",
            area: "secondary_attributes",
            input_type: "number",
            value: 12,
          },
          {
            name: "Move",
            description: "Move is calculated as strength + agility + 1.",
            area: "secondary_attributes",
            input_type: "number",
            calculation: {
              formula: "strength + agility + 1",
              dependencies: ["strength", "agility"],
            },
          },
        ],
        skills: [
          {
            metainfo: {
              append: true,
              "append-input_type": "number",
              "append-default": 0,
              formula: "n -> n+1",
              "formula-cost": "Experience",
            },
          },
          {
            name: "athletics",
            description:
              "Athletics reflects your character's physical prowess.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "awareness",
            description: "Awareness measures your character's perceptiveness.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "brawl",
            description:
              "Brawl represents your character's fighting skill in close combat.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "charm",
            description:
              "Charm measures your character's ability to win others over.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "guile",
            description:
              "Guile reflects your character's ability to deceive others.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "sleight",
            description:
              "Sleight represents your character's ability to perform tricks and manipulations.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "stealth",
            description:
              "Stealth reflects your character's ability to move unnoticed.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
          {
            name: "throw",
            description:
              "Throw represents your character's fighting skill in ranged combat.",
            area: "skills",
            input_type: "number",
            default: 2,
            secondary: {
              name: "xp",
              input_type: "number",
            },
          },
        ],
        techniques: {
          metainfo: {
            append: true,
            "append-input_type": "number",
            "append-default": 0,
            formula: "1",
            "formula-cost": "Experience",
          },
        },

        advantages_and_traits: {
          name: "Advantages and Traits",
          area: "advantages_and_traits",
          input_type: "area_text",
        },

        combat: [
          {
            name: "Initiative",
            area: "combat-overview",
            formula: "agility * 4 + 1d20",
          },
          {
            name: "Combat Move",
            area: "combat-overview",
            formula: "0.5 * Move",
          },
          {
            name: "Max Defenses",
            area: "combat-overview",
            formula: "(agility + perception) * 0.5",
          },
          {
            name: "Max Load",
            area: "combat-overview",
            formula: "strength * strength",
          },
          {
            name: "Wounds",
            area: "hp",
            input_type: "radial",
            options: ["OK", 0, -5, -10, -15, -25, -40],
          },
          {
            name: "Stuns",
            area: "hp",
            input_type: "radial",
            options: ["OK", 0, -5, -10, -15, -25, -40],
          },
          {
            name: "Fatigue",
            area: "hp",
            input_type: "radial",
            options: ["OK", 0, -5, -10, -15, -25, -40],
          },
          {
            name: "Punch",
            area: "actions",
            "formula-tohit": "brawl * strength + 1d20",
            "formula-damage": "1d20 + 1 + strength",
          },
        ],
        categories: [
          {
            name: "Power Level",
            type: "dropdown",
            options: [
              {
                label: "Mundane",
                table: {
                  Attributes: {
                    Primary: "+5/5",
                    Secondary: "+2/4",
                    Tertiary: "0/4",
                  },
                  Experience: {
                    Primary: "50/6",
                    Secondary: "30/5",
                    Tertiary: "20/4",
                  },
                  Advantages: {
                    Primary: "3",
                    Secondary: "1",
                    Tertiary: "0",
                  },
                },
                description:
                  "Mundane campaigns are about normal people in abnormal situations (or even normal people in normal situations). In this type of campaign, characters are somewhat above average, but not significantly so. This level of campaign is suitable for modern horror, or stories about young, inexperienced knights at the start of their careers. There is no reason that characters in such campaigns can't grow to become heroic, but the story is often about their progression rather than what they do once they become heroes. The majority of people in the world will be of the Mundane level - indeed, most will have a Tertiary level in each of the three categories. Skilled professionals will tend to have Primary experience however.",
              },
              {
                label: "Skilled",
                table: {
                  Attributes: {
                    Primary: "+5/5",
                    Secondary: "+2/4",
                    Tertiary: "0/4",
                  },
                  Experience: {
                    Primary: "100/6",
                    Secondary: "60/5",
                    Tertiary: "40/4",
                  },
                  Advantages: {
                    Primary: "3",
                    Secondary: "1",
                    Tertiary: "0",
                  },
                },
                description:
                  "Skilled characters are mundane with some extra skills. This level of campaign is useful when the GM wants reasonably average characters, but where their backgrounds imply more than the average number of skills - for example, academics or trained professionals. Such characters are recommended as the default for a modern setting, unless the campaign is focussed around highly trained or heroic characters, or it is a horror game where everything is meant to be dangerous, and out to get you.",
              },
              {
                label: "Exceptional",
                table: {
                  Attributes: {
                    Primary: "+8/6",
                    Secondary: "+5/5",
                    Tertiary: "+2/4",
                  },
                  Experience: {
                    Primary: "100/7",
                    Secondary: "75/6",
                    Tertiary: "50/5",
                  },
                  Advantages: {
                    Primary: "4",
                    Secondary: "2",
                    Tertiary: "1",
                  },
                },
                description:
                  "If you are playing in an exceptional campaign, then you will begin with a character who is well above average in both attributes and skills however you prioritise your pools. Such campaigns are about exceptional people and high adventure. Most of the people you meet will not be as good as you, allowing you to take on greater dangers than in less high powered campaigns. However, by the start of the campaign you are already a professional in what you do. Such stories are not about a farm boy (or school teacher) who gets caught up in an adventure by accident, but about adventurers who go looking for something exciting. It is suggested that Exceptional characters begin the game with one free point of Luck. This is in addition to any that they purchase with advantages.",
              },
              {
                label: "Heroic",
                table: {
                  Attributes: {
                    Primary: "+12/8",
                    Secondary: "+6/6",
                    Tertiary: "+3/5",
                  },
                  Experience: {
                    Primary: "200/10",
                    Secondary: "150/8",
                    Tertiary: "100/6",
                  },
                  Advantages: {
                    Primary: "6",
                    Secondary: "3",
                    Tertiary: "1",
                  },
                },
                description:
                  "In a heroic campaign you have skills and abilities well above the majority of people. However you choose to spend your points, you are going to be very good at what you do, being the equivalent of Hollywood action heroes. However, you shouldn't let this go to your head, since a single bullet or well placed knife can still kill you just as easily as it could a 'mundane' person. In addition to the above, you should start the game with two free points of Luck, in addition to any extra that you purchase with advantages.",
              },
              {
                label: "Pulp Action",
                table: {
                  Attributes: {
                    Primary: "+18/8",
                    Secondary: "+12/6",
                    Tertiary: "+6/5",
                  },
                  Experience: {
                    Primary: "450/12",
                    Secondary: "300/10",
                    Tertiary: "200/8",
                  },
                  Advantages: {
                    Primary: "8",
                    Secondary: "4",
                    Tertiary: "2",
                  },
                },
                description:
                  "Whether it's Space Opera, Chanbara, Wuxia or a\n                            Hollywood Action Film, there is room in fiction for the larger than life action hero. Almost super-heroic in their abilities, they are capable of taking on a small army by themselves. If you are playing this sort of campaign, then your character will be significantly better than everyone else even in your weakest area. In addition to the above, you start the game with three free points of Luck.",
              },
            ],
          },
        ],
      },
    },
  ]);
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

export {
  saveCharacter,
  load_file,
  listFiles,
  getSystems,
  getCharacters,
  getSystemsFallback,
  getYags,
};
