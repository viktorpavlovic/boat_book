import { React, useContext } from "react";
import { applicationContext } from "../../context";
import "./wrapper-home.scss";

const WrapperHome = () => {
  const { accessToken, loggedIn, notLoggedIn } = useContext(applicationContext);
  return (
    <div className="div-wrapper-home">
      {
        <button
          className="submit-btn"
          onClick={!!accessToken ? loggedIn : notLoggedIn}
        >
          BOOK NOW
        </button>
      }
    </div>
  );
};

export default WrapperHome;
