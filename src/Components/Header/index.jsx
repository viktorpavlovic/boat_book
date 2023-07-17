import { React, useContext } from "react";
import { applicationContext } from "../../context";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const { logOut } = useContext(applicationContext);
  const path = useLocation().pathname;
  return (
    <div className="div-header">
        <h3>Penélope Cruz</h3>
        {(path === '/admin_page' || path === '/reservation') && <Link><button className="log-out" onClick={logOut}>
          Log Out
        </button></Link>}
    </div>
  );
};

export default Header;
