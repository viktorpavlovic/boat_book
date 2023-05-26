import React from "react";
import { useState, useRef } from "react";
import "./choose-boat.scss";

const ChooseBoat = () => {
  const boatRef = useRef(null);
  const [boat, setBoat] = useState({ boat: "" });
  const handleImageClick = (selectedBoat) => {
    setBoat({ boat: selectedBoat });
    boatRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="div-choose-boat">
      <h4>Click on the boat to make reservation now</h4>
      <div className="choose-boat">
        <img
          onClick={() => handleImageClick("Turtle Boat")}
          src="https://www.cruisebelgrade.com/ws/resized-images/ad677e5881eb4e8abb5d321acd5a8e62/ca290560-8655-422b-b75d-7776fbec367a.webp"
          alt="Turtle Boat"
        />
        <img
          onClick={() => handleImageClick("Key Boat")}
          src="https://www.cruisebelgrade.com/ws/resized-images/a73d79b39663486fbdc21cb3d6bfcf0f/38aafb5d-da4b-41b2-a382-3f85bb92bd26.webp"
          alt="Key Boat"
        />
        <div ref={boatRef}></div>
        <img
          onClick={() => handleImageClick("Nikola Tesla")}
          src="https://www.cruisebelgrade.com/ws/resized-images/25ae30aae97849689bde343a5b5e8b12/6ad65232-9270-4799-b443-ead6a7a92d9f.webp"
          alt="Nikola Tesla Boat"
        />
      </div>

      <p>
        Selected Boat: <span>{boat.boat}</span>
      </p>
    </div>
  );
};

export default ChooseBoat;
