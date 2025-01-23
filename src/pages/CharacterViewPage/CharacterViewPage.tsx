import { FunctionalComponent } from "preact";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "preact/hooks";
import StatContainer from "../../components/CharacterSheet/StatContainer/StatContainer";
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
  const dummySystem = {
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
  };
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [currentSystem, setCurrentSystem] = useState<RPGSystem | null>(null);
  useEffect(() => {
    let systemName = getCurrentSystemName();
    if (systemName) {
      const getStoredSystems = async () => {
        try {
          const storedSystems = localStorage.getItem("systems");
          const systems = storedSystems ? JSON.parse(storedSystems) : [];
          const filteredSystems = systems.filter(
            (system: RPGSystem) => system.name === systemName,
          );
          return filteredSystems;
        } catch (error) {
          console.error(error);
        }
      };

      getStoredSystems()
        .then((filteredSystems) => {
          if (filteredSystems.length > 0) {
            setCurrentSystem(filteredSystems[0]);
          } else {
            setCurrentSystem(dummySystem);
          }
        })
        .catch((error) => console.error(error));
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
      </div>
      <div>
        {currentSystem && currentSystem.attributes?.length > 0 ? (
          currentSystem.attributes.map((attribute, index) => (
            <StatContainer
              key={index}
              primaryName={attribute}
              secondaryName="xp"
              onSave={(value: string) => handleSave(attribute, value)}
            />
          ))
        ) : (
          <p>No attributes found.</p>
        )}
      </div>
    </>
  );
};

export default CharacterViewPage;
