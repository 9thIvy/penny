import { FunctionalComponent } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { getChars } from "../../apis/localstorage";
import CharacterContainer from "../../components/CharacterContainer/CharacterContainer";
import Header from "../../components/Header/Header";
import NewCharacterContainer from "../../components/NewCharacterContainer/NewCharacterContainer";
import "./CharacterSelectPage.scss";

const CharacterSelectPage: FunctionalComponent = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [systemName, setSystemName] = useState<string>("");
  useEffect(() => {
    const fetchCharactersData = () => {
      let charactersArray = getChars();
      setCharacters(charactersArray);
    };
    fetchCharactersData();
    const query = new URLSearchParams(window.location.search);
    const system = query.get("system");
    if (system) {
      setSystemName(decodeURI(system));
    } else {
      route("/");
      console.warn("No system encoded in uri");
    }
  }, []);
  const filteredCharacters = characters.filter(
    (character) => character.system === systemName,
  );

  return (
    <>
      <div className={"chrselHeader"}>
        {/* Ignore error */}
        <Header url="/" />
        <h1>My Characters for {systemName}</h1>
      </div>
      {filteredCharacters.length > 0 ? (
        filteredCharacters.map((character, index) => (
          <CharacterContainer
            key={index}
            name={character.name}
            image={character.image || "Unknown"}
            gender={character.gender}
            profession={character.profession}
          />
        ))
      ) : (
        <div></div>
      )}
      <div className="createchar">
        <NewCharacterContainer system={systemName} />
      </div>
    </>
  );
};
export default CharacterSelectPage;
