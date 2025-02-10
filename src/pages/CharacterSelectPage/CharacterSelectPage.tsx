import { FunctionalComponent } from "preact";
import Header from "../../components/Header/Header";
import { Character, getCharacters, getCurrentSystemName } from "../../apis/mvp";
import "./CharacterSelectPage.scss";
import { useEffect, useState } from "preact/hooks";
import CharacterContainer from "../../components/CharacterContainer/CharacterContainer";
import NewCharacterContainer from "../../components/NewCharacterContainer/NewCharacterContainer";

const CharacterSelectPage: FunctionalComponent = () => {
  const [currentSystem, setCurrentSystem] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    const system = getCurrentSystemName();
    setCurrentSystem(system as unknown as string);
    setCharacters(getCharacters(currentSystem)); //set character array to a filtered list
  }, []);

  return (
    <>
      <div className={"chrselHeader"}>
        <Header url="/" />
        <h1>My Characters for {currentSystem} </h1>
      </div>
      {characters.length > 0 ? (
        characters.map((character, index) => (
          <CharacterContainer key={index} character={character} />
        ))
      ) : (
        <div></div>
      )}
      <NewCharacterContainer />
    </>
  );
};

export default CharacterSelectPage;
