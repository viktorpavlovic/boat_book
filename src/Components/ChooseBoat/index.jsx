import { React, useContext } from "react";
import { useRef } from "react";
import { applicationContext } from "../../context";
import busImg from "../../assets/open-bus.jpg";
import keyImg from "../../assets/kej.jpeg";
import teslaImg from "../../assets/tesla.jpeg";
import turtleImg from "../../assets/turtle.jpeg";

import "./choose-boat.scss";

const ChooseBoat = ({ setAvailableDates, setSelectedRide, selectedRide,setSelectedDate }) => {
  
  const { allDocs, rides } = useContext(applicationContext);
  const boatRef = useRef(null);
  const handleImageClick = (selectedBoat) => {
    const dates = allDocs?.filter((e) => e.data.boat === selectedBoat)
      .map((e) => e.data.date);
    setAvailableDates(dates);
    // setSelectedDate(null)
    setSelectedRide(()=>rides.find((e)=>selectedBoat === e.data.name))
    setTimeout(() => {
      boatRef.current.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  return (
    <div className="div-choose-boat">
      <h4>Click on the boat to make reservation now</h4>
      <div className="choose-boat">
        <img
          onClick={() => handleImageClick("turtle-boat")}
          src={turtleImg}
          alt="Turtle Boat"
        />
        <img
          onClick={() => handleImageClick("key-boat")}
          src={keyImg}
          alt="Key Boat"
        />
        <img
          onClick={() => handleImageClick("nikola-tesla-boat")}
          src={teslaImg}
          alt="Nikola Tesla Boat"
        />
        <img
          onClick={() => handleImageClick("open-bus")}
          src={busImg}
          alt="Open Bus"
        />
      </div>

      <p>
        Selected Boat: 
        <span ref={boatRef}>
          {selectedRide?.data.name.split('-').join(' ')}
        </span>
      </p>
    </div>
  );
};

export default ChooseBoat;
