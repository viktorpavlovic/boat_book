import { React, useContext } from "react";
import { applicationContext } from "../../context";
import downArrow from "../../assets/down-arrow-svgrepo-com.svg";
import "./wrapper-home.scss";

const WrapperHome = () => {
  const { accessToken, loggedIn, notLoggedIn } = useContext(applicationContext);
  return (
    <div className="div-wrapper-home">
      <h4>No. 1 CRUISE IN BELGRADE !</h4>
      <h5>Reserve your cruise here</h5>
      <div className="arrows">
        <img src={downArrow} alt="down" />
        <img src={downArrow} alt="down" />
        <img src={downArrow} alt="down" />
      </div>
      <button
        className="submit-btn book"
        onClick={!!accessToken ? loggedIn : notLoggedIn}
      >
        BOOK NOW
      </button>
      <h5>Inform about cruise belgrade here</h5>
      <div className="arrows">
        <img src={downArrow} alt="down" />
        <img src={downArrow} alt="down" />
        <img src={downArrow} alt="down" />
      </div>
      <a
        href="https://www.cruisebelgrade.com/"
        target="_blank"
        className="submit-btn book"
        rel="noreferrer"
      >
        cruise belgrade
      </a>
    </div>
  );
};

export default WrapperHome;
