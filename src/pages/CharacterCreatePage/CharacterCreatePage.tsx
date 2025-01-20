import { FunctionalComponent } from "preact";
import Header from "../../components/Header/Header";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { getSystems, getSystemsFallback } from "../../apis/tauricommands";
import { h } from "preact";

const CharacterCreatePage: FunctionalComponent = () => {
  const [systemName, setSystemName] = useState<string>("");
  const [systems, setSystems] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [DynamicComponent, setDynamicComponent] = useState<any>(null); //ruh roh scoob

  //get system name.
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const system = query.get("system");
    if (system) {
      setSystemName(decodeURI(system));
    } else {
      route("/");
      console.error("No system encoded in URI");
    }
  }, []);

  // get system data, only returns scuffed yags from memory on web
  useEffect(() => {
    const fetchSystemsData = async () => {
      try {
        const response = await getSystems();
        if (response.length === 0) {
          // Usually because it's in the web context, use fallback data
          const fallbackData = await getSystemsFallback();
          setSystems(fallbackData);
        } else {
          setSystems(response);
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

  // pineapple pen time
  useEffect(() => {
    if (systems.length > 0 && systemName) {
      const system = systems.find((sys) => sys.name === systemName);
      if (system && system.tsx) {
        const evaluateTsx = async () => {
          try {
            const component = new Function("h", `return ${system.tsx}`)(h); //danger zone lol
            setDynamicComponent(() => component);
          } catch (err) {
            console.error("Error evaluating TSX:", err);
          }
        };
        evaluateTsx();
      }
    }
  }, [systems, systemName]);

  if (isLoading) {
    return <div>Loading sheet...</div>;
  }

  return (
    <>
      <Header url="/" />
      {DynamicComponent ? (
        <DynamicComponent />
      ) : (
        <p>No dynamic component to load</p>
      )}
    </>
  );
};

export default CharacterCreatePage;
