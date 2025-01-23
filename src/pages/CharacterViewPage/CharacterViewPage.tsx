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

const CharacterViewPage: FunctionalComponent = () => {
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [currentSystem, setCurrentSystem] = useState<RPGSystem | null>(null);
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
    </>
  );
};

export default CharacterViewPage;
