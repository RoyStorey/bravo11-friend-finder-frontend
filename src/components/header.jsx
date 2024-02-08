import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlus,
  faPerson,
  faHorseHead,
  faSadCry,
  faUserGroup,
  faList,
} from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faHorseHead} className="header-icon" />
        </div>
      </title>
      <div className="hyperlinks">
        <div className="button-group">
          <a href="/">
            <FontAwesomeIcon icon={faUserGroup} className="hyperlink-icon" />
            Teams
          </a>
          <a href="/use-cases">
            <FontAwesomeIcon icon={faList} className="hyperlink-icon" />
            Use-Cases
          </a>
        </div>
        <a href="/sad-boy-hours">
          <FontAwesomeIcon icon={faSadCry} className="hyperlink-icon" />
          Help, I'm sad.
        </a>

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
