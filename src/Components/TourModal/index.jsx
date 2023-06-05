import React from "react";
import "./tour-modal.scss";

const TourModal = ({ handleClose, clickedTour }) => {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  return (
    <div className="div-modal-tour" onClick={handleOverlayClick}>
      <div className="modal-container">
        <main>
          <h1>Tour Info</h1>
          <button onClick={handleClose}>X</button>
        </main>
        <section>
          <div className="left">
            <h5>Date of Tour:</h5>
            <p>{clickedTour.data.date}</p>
            <h5>Available Seats:</h5>
            <p>{clickedTour.data.availableSeats} seats</p>
            <h5>Name of Boat:</h5>
            <p>{clickedTour.data.boat} </p>
            <h5>Time of tour</h5>
            <p>{clickedTour.data.time}</p>
          </div>
          <div className="right">
            {clickedTour.data.reservations?.map((e) => (
              <>
                <h5>Reservations:</h5>
                <h6>Email of passenger</h6>
                <p>{e.email}</p>
                <h6>Number of Passengers</h6>
                <p>{e.num_of_passengers}</p>
              </>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TourModal;
