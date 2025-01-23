import { FunctionalComponent } from "preact";
import "./StatContainer.scss";

interface props {
  primaryName: string;
  primaryValue?: string;
  secondaryName: string;
  secondaryValue?: string;
  onSave: (field: string, value: string) => void;
}

const StatContainer: FunctionalComponent<props> = ({
  primaryName,
  primaryValue,
  secondaryName,
  secondaryValue,
  onSave,
}) => {
  const handlePrimaryChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    onSave(primaryName, value);
  };

  const handleSecondaryChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    onSave(secondaryName, value);
  };

  return (
    <div className={`stat-container`}>
      <div className={`stat-top`}>
        <label>{primaryName}</label>
      </div>
      <div className={`stat-bottom`}>
        <input type="text" value={primaryValue} onBlur={handlePrimaryChange} />
        <div>
          <label>{secondaryName}</label>
          <input
            type="text"
            value={secondaryValue}
            onBlur={handleSecondaryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StatContainer;
