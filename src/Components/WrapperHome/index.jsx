import React from "react";
import { Link } from "react-router-dom";
import "./wrapper-home.scss";

const Wrapper = () => {
  return (
    <div className="div-wrapper-home">
      <Link to="/login">
        <button>LogIn</button>
      </Link>
    </div>
  );
};

export default Wrapper;
