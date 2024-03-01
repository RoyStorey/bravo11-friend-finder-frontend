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
  faHamburger,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Modal() {
  return (
    <div className="modal mobile-only" id="modal">
      <div className="modal-header">
        <FontAwesomeIcon
          icon={faBars}
          className="modal-icon"
          onClick={toggleModal}
        />
      </div>
      <div className="modal-content">
        <a href="/">Teams</a>
        <a href="/tasks">Tasks</a>
        <a href="/add-team/">Add Team</a>
        <a href="/add-task/">Add Task</a>
        <a href="/sad-boy-hours/">Help, I'm sad.</a>
      </div>
    </div>
  );
}

function toggleModal() {
  let modal = document.getElementById("modal");
  if (modal) {
    modal.classList.toggle("active");
  }
}

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <Modal />
      <title>
        <div className="icon-container">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => toggleModal()}
            className=" modal-icon mobile-only"
          />
          <h1 onClick={() => navigate(`/`)} className="desktop-only">
            Team Builder
          </h1>
          <FontAwesomeIcon icon={faHorseHead} className="header-icon" />
        </div>
      </title>
      <div className="hyperlinks desktop-only">
        <div className="button-group">
          <a onClick={() => navigate(`/`)}>
            <FontAwesomeIcon icon={faUserGroup} className="hyperlink-icon" />
            <p className="desktop-only">Teams</p>
          </a>
          <a onClick={() => navigate(`/tasks`)}>
            <FontAwesomeIcon icon={faList} className="hyperlink-icon" />
            <p className="desktop-only">Tasks</p>
          </a>
        </div>
        <a onClick={() => navigate(`/sad-boy-hours`)}>
          <FontAwesomeIcon icon={faSadCry} className="hyperlink-icon" />
          <p className="desktop-only">Help, I'm sad.</p>
        </a>

        <div className="button-group">
          <a onClick={() => navigate(`/add-team`)}>
            <FontAwesomeIcon icon={faPlus} />
            <p className="desktop-only">Add Team</p>
          </a>
          <a onClick={() => navigate(`/add-task`)}>
            <FontAwesomeIcon icon={faPlus} />
            <p className="desktop-only">Add Task</p>
          </a>
        </div>
      </div>
    </div>
  );
}
