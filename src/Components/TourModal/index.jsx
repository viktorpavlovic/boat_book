import React from "react";
import "./tour-modal.scss";

const TourModal = ({ handleClose, clickedTour }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
    console.log(clickedTour)
  };
  return (
    <div className="div-modal-tour" onClick={handleOverlayClick}>
      <div className="modal-container">
        <main>
          <h1>Tour Info</h1>
          <button onClick={handleClose}>X</button>
        </main>
        <section>
          <div className="seats-boat">
            <h5>Available Seats:</h5>
            <p>{clickedTour.data.availableSeats} seats</p>
            <h5>Name of Boat:</h5>
            <p>{clickedTour.data.boat} </p>
          </div>
          <div className="reservation-passengers">
            <h4>Reservations:</h4>
            {clickedTour.data.reservations?.map((e) => (
              <>
              <div className="reservation-content">
                <h5>Name of Passenger:</h5>
                <p>{e.nameInfo}</p>
                <h5>Number of Passengers:</h5>
                <p>{e.numberOfPassengers}</p>
                </div>
              </>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TourModal;
