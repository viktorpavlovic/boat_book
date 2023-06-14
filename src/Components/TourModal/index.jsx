import React, { useContext } from "react";
import { applicationContext } from "../../context";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./tour-modal.scss";

const TourModal = ({ handleClose, clickedTour, setClickedTour }) => {
  const { freshData, setFreshData, allDocs } = useContext(applicationContext);
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  const selectedTour = allDocs.filter((tour) => tour.id === clickedTour.id)[0];
  const handleDelete = async (resID, seats) => {
    const docRef = doc(db, "tours", selectedTour?.id);
    const updatedReservations = selectedTour?.data.reservations.filter(
      (reservation) => reservation.id !== resID
    );
    await updateDoc(docRef, {
      availableSeats: selectedTour.data.availableSeats + seats,
      reservations: updatedReservations,
    });
    setFreshData(!freshData);
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
            <p>{selectedTour.data.availableSeats} seats</p>
            <h5>Name of Boat:</h5>
            <p>{selectedTour.data.boat} </p>
          </div>
          <div className="reservation-passengers">
            <h4>Reservations:</h4>
            {selectedTour.data.reservations?.map((e, i) => (
              <div key={i} className="reservation-content">
                <h5>Name:</h5>
                <p>{e.nameInfo}</p>
                <h5>Number of Passengers:</h5>
                <p>{e.numberOfPassengers}</p>
                <button
                  onClick={() => handleDelete(e.id, e.numberOfPassengers)}
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
