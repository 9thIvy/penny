import { FunctionalComponent } from "preact";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "preact/hooks";
import {
  Character,
  getCurrentCharacter,
  getCurrentSystemName,
  getSystem,
  RPGSystem,
  saveCharacter, // make sure saveCharacter is imported
} from "../../apis/mvp";
import InfoTextInput from "../../components/CharacterSheet/InfoTextInput/InfoTextInput";

const CharacterViewPage: FunctionalComponent = () => {
  const [currentChar, setCurrentChar] = useState<Character>();
  const [currentSystem, setCurrentSystem] = useState<RPGSystem>();

  useEffect(() => {
    let t = getCurrentSystemName();
    if (t) {
      setCurrentSystem(getSystem(t) as unknown as RPGSystem);
    }
    t = getCurrentCharacter();
    if (t) {
      setCurrentChar(JSON.parse(t));
    }

    let c: Character = {
      name: currentChar?.name ?? "",
      age: currentChar?.age ?? "",
      gender: currentChar?.gender ?? "",
      profession: currentChar?.profession ?? "",
      system: currentChar?.system ?? getCurrentSystemName() ?? "Unknown",
      attributes: currentChar?.attributes ?? currentSystem?.attributes ?? [],
      image: "",
      skills0: currentChar?.skills0 ?? currentSystem?.skills0 ?? [],
      skills1: currentChar?.skills1 ?? currentSystem?.skills1 ?? [],
      largeInput: currentChar?.largeInput ?? "",
    };
    setCurrentChar(c);
  }, []);

  // console.log(currentChar);

  const handleSave = (field: string, value: string) => {
    if (currentChar) {
      const updatedChar = { ...currentChar, [field]: value };
      setCurrentChar(updatedChar);
      saveCharacter(updatedChar);
    }
  };

  return (
    <>
      <div className={"chrselHeader"}>
        <Header url="/character-select" />
        <h1>{`Editing ${currentChar?.name ?? "Character"}`}</h1>
      </div>
      <div>
        <InfoTextInput
          title="Character Name"
          value={currentChar?.name ?? ""}
          onSave={(value: string) => handleSave("name", value)}
        />
        <InfoTextInput
          title="Age"
          value={currentChar?.age ?? ""}
          onSave={(value: string) => handleSave("age", value)}
        />
      </div>
    </>
  );
};

export default CharacterViewPage;
