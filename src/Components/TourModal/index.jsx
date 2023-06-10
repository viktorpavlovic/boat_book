import React, { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./tour-modal.scss";

const TourModal = ({ handleClose, clickedTour }) => {
  const [deleteRes, setDeleteRes] = useState("");
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  const handleDelete = async () => {
    console.log(deleteRes);
    const docRef = doc(db, "tours", clickedTour?.id);
    await updateDoc(docRef, {});
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
            {clickedTour.data.reservations?.map((e, i) => (
              <div key={i} className="reservation-content">
                <h5>Name:</h5>
                <p>{e.nameInfo}</p>
                <h5>Number of Passengers:</h5>
                <p>{e.numberOfPassengers}</p>
                <button
                  onClick={() => {
                    setDeleteRes(e?.nameInfo);
                    handleDelete();
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TourModal;
