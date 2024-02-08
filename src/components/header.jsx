import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faPerson } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="header-container">
      <title>
        <div className="icon-container">
          <h1
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Bravo 11 Team Builder
          </h1>
          <FontAwesomeIcon icon={faPerson} className="header-icon" />
        </div>
      </title>
      <div className="hyperlinks">
        <div className="button-group">
          <a href="/">Teams</a>
          <a href="/use-cases">Use-Cases</a>
        </div>
        <a href="/sad-boy-hours">Help, I'm sad.</a>

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
