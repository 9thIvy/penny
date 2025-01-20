import { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { getSystems, getSystemsFallback } from "../../apis/tauricommands";
import "./LadingPage.scss";
import SystemContainer from "../../components/SystemContainer/SystemContainer";

const LandingPage: FunctionalComponent = () => {
  const [isLoading, setLoading] = useState(true);
  const [systems, setSystems] = useState<any[]>([]);

  useEffect(() => {
    const fetchSystemsData = async () => {
      try {
        const response = await getSystems();

        if (Array.isArray(response) && response.length > 0) {
          setSystems(response);
          console.log("Successfully loaded from getSystems");
        } else {
          console.log("Falling back...");
          // If it's not an array or it's empty, fall back
          const fallbackData = await getSystemsFallback();
          setSystems(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching systems:", error);
        const fallbackData = await getSystemsFallback();
        setSystems(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemsData();
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className={"landingpage-header"}>
        <h1>My Systems</h1>
      </div>
      {systems.length > 0 ? (
        systems.map((system, index) => (
          <SystemContainer
            key={index}
            name={system.name || "Unknown Name"}
            author={system.author || "Unknown Author"}
            version={system.version || "Unknown Version"}
            location={system.location || "Unknown Location"}
            image={system.image || "Unknown"}
          />
        ))
      ) : (
        <p>No systems available</p>
      )}
    </>
  );
};

export default LandingPage;
