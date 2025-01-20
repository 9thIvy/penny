import { FunctionalComponent } from "preact";
import { Link } from "preact-router";
import "./CharacterContainer.scss";

//kinda generic, works for yags, but maybe other rpgs?
interface props {
  name: string;
  image: string;
  gender: string;
  profession: string;
}

const CharacterContainer: FunctionalComponent<props> = ({
  name,
  image,
  gender,
  profession,
}) => {
  const isFallbackImage = image === "Unknown";
  const imageUrl = isFallbackImage ? "/src/assets/preact.svg" : image;
  return (
    <div className={"character-container"}>
      {/* Ignore link error for now */}
      <Link href="/character-read">
        <div className={"character-container__image"}>
          <img src={imageUrl} className={"character-container__image--image"} />
          <h3>{name}</h3>
        </div>
      </Link>

      <div className={"character-container__content"}>
        <p>{gender}</p>
        <p>|</p>
        <p>{profession}</p>
      </div>
    </div>
  );
};

export default CharacterContainer;
