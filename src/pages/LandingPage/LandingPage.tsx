import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./LandingPage.scss";
import { initialiseBoilerData, loadSystemMeta } from "../../apis/tauricommands";
import {
  blankCharacter,
  // cachedSystems,
  // downloadSystems,
  // loadSystems,
  RPGSystem,
  // setCurrentCharacter,
} from "../../apis/mvp";
import SystemContainer from "../../components/SystemContainer/SystemContainer";
const LandingPage: FunctionalComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [systems, setSystems] = useState<RPGSystem[]>([]);

  useEffect(() => {
    console.log("TODO: download systems, set character to blank.");
    /*
    Inits ~/.local/share/io.github.penitence.penny/data/systems
    */
    const fetchSystemsData = async () => {
      initialiseBoilerData();
      try {
        const s = await loadSystemMeta();
        setSystems(s);
      } catch (error) {
        console.error(
          "LandingPage.tsx failed to load or set system meta\n",
          error,
        );
      } finally {
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
      <div className={`system-wrapper`}>
        {systems.length > 0 ? (
          systems.map((system, index) => (
            <SystemContainer key={index} system={system} />
          ))
        ) : (
          <p>No systems available.</p>
        )}
      </div>
    </>
  );
};
export default LandingPage;
