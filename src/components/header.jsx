import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="header-container">
      <title>
        <h1>Bravo 11 Friend Finder</h1>
      </title>
      <div className="hyperlinks">
        <div className="button-group">
          <a href="/">Teams</a>
          <a href="/use-cases">Use-Cases</a>
        </div>
        <div className="button-group">
          <a>
            <FontAwesomeIcon icon={faPlus} />
            Add Team
          </a>
          <a>
            <FontAwesomeIcon icon={faPlus} />
            Add Use Case
          </a>
        </div>
      </div>
    </div>
  );
}
