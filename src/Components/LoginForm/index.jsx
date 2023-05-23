import React from "react";
import { Link } from "react-router-dom";
import "./login-form.scss";

const LoginForm = () => {
  return (
    <div className="div-login-form">
      LoginForm
      <Link to={"/reservation"}>
        <button>LogIn</button>
      </Link>
    </div>
  );
};

export default LoginForm;
