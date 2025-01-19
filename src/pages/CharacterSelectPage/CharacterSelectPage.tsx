import { FunctionalComponent } from "preact";
import { Link } from "preact-router";

const CharacterSelectPage: FunctionalComponent = () => {
  return (
    <>
      {/* Ignore error */}
      <Link href="/">
        <h1>Go back</h1>
      </Link>
    </>
  );
};
export default CharacterSelectPage;
