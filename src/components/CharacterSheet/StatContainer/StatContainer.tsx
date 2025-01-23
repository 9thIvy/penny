import { FunctionalComponent } from "preact";
import "./StatContainer.scss";

interface Props {
  skillName: string;
  skillExtra: number;
  skillValue: number;
  onSave: (field: string, value: number) => void;
}

const StatContainer: FunctionalComponent<Props> = ({
  skillName,
  skillExtra,
  skillValue,
  onSave,
}) => {
  const handleSkillChange = (e: Event) => {
    const value = parseInt((e.target as HTMLInputElement).value, 10);
    onSave(skillName, value);
  };

  return (
    <div className={`stat-container`}>
      <div className={`stat-top`}>
        <label>{skillName}</label>
      </div>
      <div className={`stat-bottom`}>
        <input type="text" value={skillValue} onBlur={handleSkillChange} />
        <div>
          <label>Extra</label>
          <input type="text" value={skillExtra} />
        </div>
      </div>
    </div>
  );
};

export default StatContainer;
