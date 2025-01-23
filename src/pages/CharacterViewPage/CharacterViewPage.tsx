import { FunctionalComponent } from "preact";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "preact/hooks";

import {
  Character,
  createNewCharacter,
  getCurrentCharacter,
  getCurrentSystemName,
  getSystem,
  RPGSystem,
  saveCharacter,
} from "../../apis/mvp";
import InfoTextInput from "../../components/CharacterSheet/InfoTextInput/InfoTextInput";
import "./CharacterViewPage.scss";

const CharacterViewPage: FunctionalComponent = () => {
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [currentSystem, setCurrentSystem] = useState<RPGSystem | null>(null);
  const [dieVal, setDieVal] = useState<string>("");

  useEffect(() => {
    let systemName = getCurrentSystemName();
    if (systemName) {
      const systemData = getSystem(systemName);
      const system = JSON.parse(JSON.stringify(systemData)) as RPGSystem;
      setCurrentSystem(system);
    }

    let charData = getCurrentCharacter();
    if (charData) {
      setCurrentChar(JSON.parse(charData));
    } else {
      setCurrentChar(createNewCharacter());
    }
  }, []);
  const handleSave = (field: string, value: string) => {
    if (currentChar) {
      const updatedChar = { ...currentChar, [field]: value };
      setCurrentChar(updatedChar);
      saveCharacter(updatedChar);
    }
  };

  const handleRightClick = (e: Event) => {
    console.log("Right-clicked on", e);
    const input = e.target as HTMLInputElement;
    const value = parseInt(input.value, 10) || 0;
    const roll = Math.floor(Math.random() * 20) + 1;

    // Add the value from the input to the roll
    const result = roll + value;
    setDieVal(result as unknown as string);
  };

  if (!currentChar) {
    return <div></div>;
  }

  return (
    <>
      <div className={"chrselHeader"}>
        <Header url="/character-select" />
        <h1>{`Editing ${currentChar.name}`}</h1>
      </div>
      <div>
        <div className={"dice-out"}>
          <p>{dieVal}</p>
        </div>
        <h2>Basic Info</h2>
        <div className={"basic-info"}>
          <InfoTextInput
            title="Character Name"
            value={currentChar.name}
            onSave={(value: string) => handleSave("name", value)}
          />
          <InfoTextInput
            title="Age"
            value={currentChar.age}
            onSave={(value: string) => handleSave("age", value)}
          />
          <InfoTextInput
            title="Gender"
            value={currentChar.gender}
            onSave={(value: string) => handleSave("gender", value)}
          />
          <InfoTextInput
            title="Profession"
            value={currentChar.profession}
            onSave={(value: string) => handleSave("profession", value)}
          />
          <InfoTextInput
            title="Image"
            value={currentChar.image || ""}
            onSave={(value: string) => handleSave("image", value)}
          />
        </div>
        <h2> Attributes</h2>
        <div className={"attributes"}>
          <InfoTextInput
            title="Strength"
            value={currentChar.strength || ""}
            onSave={(value: string) => handleSave("strength", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Dexterity"
            value={currentChar.dexterity || ""}
            onSave={(value: string) => handleSave("dexterity", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Constitution"
            value={currentChar.constitution || ""}
            onSave={(value: string) => handleSave("constitution", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Wisdom"
            value={currentChar.wisdom || ""}
            onSave={(value: string) => handleSave("wisdom", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Intelligence"
            value={currentChar.intelligence || ""}
            onSave={(value: string) => handleSave("intelligence", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Charisma"
            value={currentChar.charisma || ""}
            onSave={(value: string) => handleSave("charisma", value)}
            onRightClick={handleRightClick}
          />
        </div>
        <h2>Skills</h2>
        <div className={"attributes"}>
          <InfoTextInput
            title="Acrobatics"
            value={currentChar.Acrobatics || ""}
            onSave={(value: string) => handleSave("Acrobatics", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Animal Handling"
            value={currentChar.AnimalHandling || ""}
            onSave={(value: string) => handleSave("AnimalHandling", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Arcana"
            value={currentChar.Arcana || ""}
            onSave={(value: string) => handleSave("Arcana", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Athletics"
            value={currentChar.Athletics || ""}
            onSave={(value: string) => handleSave("Athletics", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="Deception"
            value={currentChar.Deception || ""}
            onSave={(value: string) => handleSave("Deception", value)}
            onRightClick={handleRightClick}
          />
          <InfoTextInput
            title="History"
            value={currentChar.History || ""}
            onSave={(value: string) => handleSave("History", value)}
            onRightClick={handleRightClick}
          />
        </div>
      </div>
    </>
  );
};

export default CharacterViewPage;
