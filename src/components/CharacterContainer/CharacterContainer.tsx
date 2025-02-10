import { FunctionalComponent } from "preact";
import { route } from "preact-router";
import "./CharacterContainer.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Character, setCurrentCharacter } from "../../apis/mvp";

interface props {
  character: Character;
}

const CharacterContainer: FunctionalComponent<props> = ({ character }) => {
  const useFallbackImage = !character.image;
  const imageUrl = useFallbackImage
    ? "/src/assets/preact.svg"
    : character.image;

  const handleClick = () => {
    setCurrentCharacter(character);
    route("character-view");
  };

  const handleDelete = () => {
    console.log("character id: ", character.id);

    const storedCharacters = localStorage.getItem("characters");
    let characters: Character[] = storedCharacters
      ? JSON.parse(storedCharacters)
      : [];

    const updatedCharacters = characters.filter(
      (char) => char.id !== character.id,
    );

    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    setCurrentCharacter({
      id: "",
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
    });
    window.location.reload();
  };
  return (
    <>
      <div className={`character-container`}>
        <div className={`psuedo-link`} onClick={handleClick}>
          <div className={`character-container__image`}>
            <img
              src={imageUrl}
              className={`character-container__image--image`}
            />
            <h3>{character.name}</h3>
          </div>
        </div>
        <div onClick={handleDelete} className={`character-container__rm`}>
          <DeleteForeverIcon />
        </div>
        <div className={`character-container__content`}>
          <p>{character.gender}</p>
          <p>|</p>
          <p>{character.profession}</p>
          <p>|</p>
          <p>{character.age}</p>
        </div>
      </div>
    </>
  );
};
export default CharacterContainer;
