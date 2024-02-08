import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faPerson } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="header-container">
      <title>
        <FontAwesomeIcon icon={faPerson} className="header-icon" />
        <h1>Bravo 11 Friend Finder</h1>
      </title>
      <div className="hyperlinks">
        <div className="button-group">
          <a href="/">Teams</a>
          <a href="/use-cases">Use-Cases</a>
        </div>
        <div className="button-group">
          <a href="/add-team">
            <FontAwesomeIcon icon={faPlus} />
            Add Team
          </a>
          <a href="/add-use-case">
            <FontAwesomeIcon icon={faPlus} />
            Add Use Case
          </a>
        </div>
      </div>
    </div>
  );
}
