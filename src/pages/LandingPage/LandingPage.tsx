import { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { getSystems } from "../../apis/tauricommands";
import SystemContainer from "../../components/SystemContainer/SystemContainer";

const LandingPage: FunctionalComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [systems, setSystems] = useState<any[]>([]);

  useEffect(() => {
    const fetchSystemsData = async () => {
      try {
        const response = await getSystems();
        setSystems(response);
        console.log("Systems:", response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSystemsData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Landing Page</h1>
      {systems.length > 0 ? (
        systems.map((system, index) => (
          // Pass system data to SystemContainer
          <SystemContainer
            key={index}
            name={system.name || "Unknown Name"}
            author={system.author || "Unknown Author"}
            version={system.version || "Unknown Version"}
            location={system.location || "Unknown Location"}
          />
        ))
      ) : (
        <p>No systems available</p>
      )}
    </>
  );
};

export default LandingPage;
