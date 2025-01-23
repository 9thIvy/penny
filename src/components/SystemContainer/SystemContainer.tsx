import { FunctionalComponent } from "preact";
import { RPGSystem, setCurrentSystemName } from "../../apis/mvp";
import "./SystemContainer.scss";
import { route } from "preact-router";

interface props {
  system: RPGSystem;
}

const SystemContainer: FunctionalComponent<props> = ({ system }) => {
  const useFallbackImage = !system.image;
  const imageUrl = useFallbackImage ? "/src/assets/preact.svg" : system.image;

  const handleClick = () => {
    setCurrentSystemName(system.name);
    route("character-select");
  };

  return (
    <div className={`system-container`}>
      <div className={`psuedo-link`} onClick={handleClick}>
        <div className={`system-container__image`}>
          <img className={`system-container__image--img`} src={imageUrl} />
          <h3>{system.name}</h3>
        </div>
      </div>
      <div className={`system-container__content`}>
        <p>{system.author}</p>
        <p>|</p>
        <p>{system.version}</p>
      </div>
    </div>
  );
};
export default SystemContainer;
