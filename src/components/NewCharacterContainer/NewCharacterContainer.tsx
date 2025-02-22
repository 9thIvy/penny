import { FunctionalComponent } from "preact";
import "./NewCharacterContainer.scss";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "preact/hooks";
import { blankCharacter, setCurrentCharacter } from "../../apis/mvp";

const NewCharacterContainer: FunctionalComponent = () => {
  useEffect(() => {
    setCurrentCharacter(blankCharacter);
  }, []);
  return (
    <a href={`/character-view`}>
      <div className={"newCharacterContainer"}>
        <p></p>
        <AddIcon className="newCharacterContainer__icon" />
        <p>Create Character</p>
      </div>
    </a>
  );
};

export default NewCharacterContainer;
