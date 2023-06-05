import { React, useContext } from "react";
import { useRef } from "react";
import { applicationContext } from "../../context";
import "./choose-boat.scss";

const ChooseBoat = ({setAvailableDates}) => {
  const { bookValues, setBookValues,allDocs } = useContext(applicationContext);
  const boatRef = useRef(null);
  const handleImageClick = (selectedBoat) => {
    const dates = allDocs?.filter((e) => e.data.boat === selectedBoat).map(e=>new Date(e.data.date))
    setAvailableDates(dates)
    setBookValues({
      ...bookValues,
      boat: selectedBoat,
    });
    boatRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="div-choose-boat">
      <h4>Click on the boat to make reservation now</h4>
      <div className="choose-boat">
        <img
          onClick={() => handleImageClick("turtle-boat")}
          src="https://www.cruisebelgrade.com/ws/resized-images/ad677e5881eb4e8abb5d321acd5a8e62/ca290560-8655-422b-b75d-7776fbec367a.webp"
          alt="Turtle Boat"
        />
        <img
          onClick={() => handleImageClick("key-boat")}
          src="https://www.cruisebelgrade.com/ws/resized-images/a73d79b39663486fbdc21cb3d6bfcf0f/38aafb5d-da4b-41b2-a382-3f85bb92bd26.webp"
          alt="Key Boat"
        />
        <img
          onClick={() => handleImageClick("nikola-tesla-boat")}
          src="https://www.cruisebelgrade.com/ws/resized-images/25ae30aae97849689bde343a5b5e8b12/6ad65232-9270-4799-b443-ead6a7a92d9f.webp"
          alt="Nikola Tesla Boat"
        />
      </div>

      <p>
        Selected Boat:{" "}
        <span ref={boatRef}>
          {bookValues.boat === "turtle-boat"
            ? "Turtle boat"
            : bookValues.boat === "key-boat"
            ? "Key Boat"
            : bookValues.boat === "key-boat"
            ? "Nikola Tesla Boat"
            : ""}
        </span>
      </p>
    </div>
  );
};

export default ChooseBoat;
