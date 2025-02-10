import { FunctionalComponent } from "preact";
import "./InfoTextInput.scss";
import { useState } from "preact/hooks";

interface Props {
  title: string;
  value: string;
  onSave: (value: string) => void;
  onRightClick?: (e: Event) => void;
}

const InfoTextInput: FunctionalComponent<Props> = ({
  title,
  value,
  onSave,
  onRightClick, // Destructure the onRightClick prop
}) => {
  const [a, setA] = useState(value);

  const handleBlur = () => {
    onSave(a);
  };

  const handleRightClickInternal = (e: Event) => {
    e.preventDefault();
    if (onRightClick) {
      onRightClick(e);
    }
  };

  return (
    <div className={"info-text-input"}>
      <label>{title}</label>
      <input
        type="text"
        value={a}
        onInput={(e: Event) => {
          const input = e.target as HTMLInputElement;
          setA(input.value);
        }}
        onBlur={handleBlur}
        onContextMenu={handleRightClickInternal}
      />
    </div>
  );
};

export default InfoTextInput;
