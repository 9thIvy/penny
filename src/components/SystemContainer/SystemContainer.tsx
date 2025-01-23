import { FunctionalComponent } from "preact";
import { Link } from "preact-router";
import { RPGSystem, setCurrentSystem } from "../../apis/mvp";
import "./SystemContainer.scss";

interface props {
  system: RPGSystem;
}

const SystemContainer: FunctionalComponent<props> = ({ system }) => {
  const useFallbackImage = !system.image;
  const imageUrl = useFallbackImage ? "/src/assets/preact.svg" : system.image;

  const handleClick = () => {
    setCurrentSystem(system.name);
  };

  return (
    <div className={`system-container`}>
      {/* Ignore href error */}
      <Link onCopy={handleClick} href="/character-select">
        <div className={`system-container__image`}>
          <img className={`system-container__image--img`} src={imageUrl} />
          <h3>{system.name}</h3>
        </div>
      </Link>
      <div className={`system-container__content`}>
        <p>{system.author}</p>
        <p>|</p>
        <p>{system.version}</p>
      </div>
    </div>
  );
};
export default SystemContainer;
