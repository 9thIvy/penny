import { FunctionalComponent } from "preact";
import { Link } from "preact-router";
import "./SystemContainer.scss";

interface props {
  name: string;
  author: string;
  version: string;
  image: string;
  location: string;
}

const systemContainer: FunctionalComponent<props> = ({
  name,
  author,
  version,
  location,
  image,
}) => {
  const isFallbackImage = image === "Unknown";
  const imageUrl = isFallbackImage ? "/src/assets/preact.svg" : image;
  console.log(`systemContainer has ${name} at ${location}`);

  return (
    <div className={`system-container`}>
      {/* no clue why TS is sobbing about href. it works, so leaving it for now */}
      <Link href="/character-select">
        <div className={`system-container__image`}>
          <img src={imageUrl} className="system-container__image--img" />
          <h3>{name}</h3>
        </div>
      </Link>

      <div className="system-container__content">
        <p>{author}</p>
        <p>|</p>
        <p>{version}</p>
      </div>
    </div>
  );
};
export default systemContainer;
