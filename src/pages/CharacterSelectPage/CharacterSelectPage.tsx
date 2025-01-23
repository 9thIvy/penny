import { FunctionalComponent } from "preact";
import Header from "../../components/Header/Header";
import { getCurrentSystem } from "../../apis/mvp";
import "./CharacterSelectPage.scss";
import { useEffect, useState } from "preact/hooks";

const CharacterSelectPage: FunctionalComponent = () => {
  const [currentSystem, setCurrentSystem] = useState("");
  useEffect(() => {
    const system = getCurrentSystem();
    console.log(system);
    setCurrentSystem(system as unknown as string);
  }, []);

  return (
    <>
      <div className={"chrselHeader"}>
        <Header url="/" />
        <h1>My Characters for {currentSystem} </h1>
      </div>
    </>
  );
};

export default CharacterSelectPage;
