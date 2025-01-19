import { FunctionalComponent } from "preact";

interface props {
  stat: number;
  description: string;
}
const StatContainer: FunctionalComponent<props> = ({ stat, description }) => {
  return (
    <>
      <p>{stat}</p>
      <p>{description}</p>
    </>
  );
};
export default StatContainer;
