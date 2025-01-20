import { FunctionalComponent } from "preact";
import "./NewCharacterContainer.scss";
import { Link } from "preact-router";
import AddIcon from "@mui/icons-material/Add";
interface props {
  system: string;
}

const NewCharacterContainer: FunctionalComponent<props> = ({ system }) => {
  return (
    <Link href={`/character-create/?system=${encodeURI(system)}`}>
      <div className={"newCharacterContainer"}>
        <p></p>
        <AddIcon className="newCharacterContainer__icon" />
        <p>Create Character</p>
      </div>
    </Link>
  );
};

export default NewCharacterContainer;
