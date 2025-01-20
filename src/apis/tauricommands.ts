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

//a little bit of tomfoolery
const getSystemsFallback = (): Promise<any[]> => {
  return Promise.resolve([
    {
      name: "yags",
      author: "Samuel Penn",
      version: "0.8.0",
      characterCreation: {
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
                  "Whether it's Space Opera, Chanbara, Wuxia or a Hollywood Action Film, there is room in fiction for the larger than life action hero. Almost super-heroic in their abilities, they are capable of taking on a small army by themselves. If you are playing this sort of campaign, then your character will be significantly better than everyone else even in your weakest area. In addition to the above, you start the game with three free points of Luck.",
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
};
