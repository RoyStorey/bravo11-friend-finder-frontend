import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  faPlus,
  faPerson,
  faHorseHead,
  faSadCry,
  faUserGroup,
  faList,
} from "@fortawesome/free-solid-svg-icons";



export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <title>
        <div className="icon-container">
          <h1
            onClick={() => navigate(`/`)}
          >
            Bravo 11 Team Builder
          </h1>
          <FontAwesomeIcon icon={faHorseHead} className="header-icon" />
        </div>
      </title>
      <div className="hyperlinks">
        <div className="button-group">
          <a onClick={() => navigate(`/`)}>
            <FontAwesomeIcon icon={faUserGroup} className="hyperlink-icon" />
            Teams
          </a>
          <a onClick={() => navigate(`/use-cases`)}>
            <FontAwesomeIcon icon={faList} className="hyperlink-icon" />
            Tasks
          </a>
        </div>
        <a onClick={() => navigate(`/sad-boy-hours`)}>
          <FontAwesomeIcon icon={faSadCry} className="hyperlink-icon" />
          Help, I'm sad.
        </a>

        <div className="button-group">
          <a onClick={() => navigate(`/add-team`)}>
            <FontAwesomeIcon icon={faPlus} />
            Add Team
          </a>
          <a onClick={() => navigate(`/add-use-case`)}>
            <FontAwesomeIcon icon={faPlus} />
            Add Task
          </a>
        </div>
      </div>
    </div>
  );
}
