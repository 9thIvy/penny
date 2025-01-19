import { FunctionalComponent } from "preact";

interface props {
  name: string;
  author: string;
  version: string;
  location: string;
}

const systemContainer: FunctionalComponent<props> = ({
  name,
  author,
  version,
  location,
}) => {
  console.log(`systemContainer has ${name} at ${location}`);
  return (
    <div>
      <div>{/* background image */}</div>
      {/* Hero Title */}
      <h3>{name}</h3>
      <p>|</p>
      <p>{author}</p>
      <p>|</p>
      <p>{version}</p>
    </div>
  );
};
export default systemContainer;
