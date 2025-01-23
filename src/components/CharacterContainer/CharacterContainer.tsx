import { FunctionalComponent } from "preact";
import "./CharacterContainer.scss";
import { Character } from "../../apis/mvp";

interface props {
  character: Character;
}

const CharacterContainer: FunctionalComponent<props> = ({ character }) => {
  const useFallbackImage = !character.image;
  const imageUrl = useFallbackImage
    ? "/src/assets/preact.svg"
    : character.image;
  return (
    <>
      <div className={`character-container`}>
        <div className={`psuedo-link`}>
          <div className={`character-container__image`}>
            <img
              src={imageUrl}
              className={`character-container__image--image`}
            />
            <h3>{character.name}</h3>
          </div>
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
