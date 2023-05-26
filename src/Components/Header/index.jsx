import { React, useContext } from "react";
import { applicationContext } from "../../context";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = ({ goToRoute, content }) => {
  const { logOut } = useContext(applicationContext);

  return (
    <div className="div-header">
      <Link to={"/"}>
        <h3>Cruise Belgrade</h3>
      </Link>
      <nav>
        <Link to={"/"}>
          <button>Home</button>
        </Link>
        <button className="log-out" onClick={logOut}>
          {content}
        </button>
      </nav>
    </div>
  );
};

export default Header;
