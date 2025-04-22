import { FunctionalComponent } from "preact";
import Header from "../../components/Header/Header";
import { Character } from "../../apis/mvp";
import "./CharacterSelectPage.scss";
import { useEffect, useState } from "preact/hooks";
import CharacterContainer from "../../components/CharacterContainer/CharacterContainer";
import NewCharacterContainer from "../../components/NewCharacterContainer/NewCharacterContainer";
import { getCharacters } from "../../apis/tauricommands";

const CharacterSelectPage: FunctionalComponent = () => {
  const [currentSystem, setCurrentSystem] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  //set loading like in LandingPage?
  useEffect(() => {
    console.log("TODO: get sys name, set it, filter characters?");
    setCurrentSystem("TODO: state management");
    //get current system

    const init = async () => {
      const c = await getCharacters();
      setCharacters(c);
    };
    init();

    //filter characters to ones for the current system?
    //select characters just in subdir?
    //choices...
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
