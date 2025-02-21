import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./LandingPage.scss";
import {
  blankCharacter,
  cachedSystems,
  downloadSystems,
  loadSystems,
  RPGSystem,
  setCurrentCharacter,
} from "../../apis/mvp";
import SystemContainer from "../../components/SystemContainer/SystemContainer";
const LandingPage: FunctionalComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [systems, setSystems] = useState<RPGSystem[]>([]);

  useEffect(() => {
    const fetchSystemsData = async () => {
      try {
        if (!cachedSystems()) {
          downloadSystems();
        }
        setSystems(loadSystems());
      } catch (error) {
        console.error(error);
      } finally {
        setCurrentCharacter(blankCharacter);
        setLoading(false);
      }
    };
    fetchSystemsData();
  }, []);
  if (isLoading) {
    return <div />;
  }
  return (
    <>
      <div className={"landingpage-header"}>
        <h1>My RPG Systems</h1>
      </div>
      <p>Pick which role playing game system you would like to play.</p>
      <div className={`system-wrapper`}>
        {systems.length > 0 ? (
          systems.map((system, index) => (
            <SystemContainer key={index} system={system} />
          ))
        ) : (
          <p>No systems available</p>
        )}
      </div>
    </>
  );
};
export default LandingPage;
