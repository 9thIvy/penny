import { FunctionalComponent } from "preact";
import "./NewCharacterContainer.scss";
import AddIcon from "@mui/icons-material/Add";

const NewCharacterContainer: FunctionalComponent = () => {
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
