import { FunctionalComponent } from "preact";
import { Link } from "preact-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Header.scss";

interface props {
  url: string;
}

const Header: FunctionalComponent<props> = ({ url }) => {
  return (
    <>
      <Link href={url}>
        <ArrowBackIcon className="header__back-arrow" />
      </Link>
    </>
  );
};
export default Header;
