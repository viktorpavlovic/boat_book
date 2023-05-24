import React from "react";
import { useState } from "react";
import "./choose-boat.scss";

const ChooseBoat = () => {
  const [boat, setBoat] = useState({});
  return (
    <div className="div-choose-boat">
      <h4>Click on the boat to make reservation now</h4>
      <div className="choose-boat">
        <img
          onClick={() =>
            setBoat({
              ...boat,
              boat: "Turtle Boat",
            })
          }
          src="https://www.cruisebelgrade.com/ws/resized-images/ad677e5881eb4e8abb5d321acd5a8e62/ca290560-8655-422b-b75d-7776fbec367a.webp"
          alt="Turtle Boat"
        />
        <img
          onClick={() =>
            setBoat({
              ...boat,
              boat: "Key Boat",
            })
          }
          src="https://www.cruisebelgrade.com/ws/resized-images/a73d79b39663486fbdc21cb3d6bfcf0f/38aafb5d-da4b-41b2-a382-3f85bb92bd26.webp"
          alt="Key Boat"
        />
        <img
          onClick={() =>
            setBoat({
              ...boat,
              boat: "Nikola Tesla",
            })
          }
          src="https://www.cruisebelgrade.com/ws/resized-images/ead6ef6716014b14afd39ddedffdc72a/794e2e9a-70d2-46fa-bcbd-99390cbcb4d1.webp"
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
