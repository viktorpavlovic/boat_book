import React, { useContext } from "react";
import { applicationContext } from "../../context";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./tour-modal.scss";

const TourModal = ({ handleClose, clickedTour }) => {
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
  const children = selectedTour.data.reservations.reduce(
    (a, b) => a + b.children,
    0
  );
  console.log(children);
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
                <div className="user-email">
                  <h5>Seller email:</h5>
                  <p>{e.userEmail}</p>
                </div>
                <div className="modal-content">
                  <h5>Reservation room:</h5>
                  <p>{e.roomNumber}</p>
                </div>
                <div className="modal-content">
                  <h5>Number of adults:</h5>
                  <p>{e.numberOfPassengers}</p>
                </div>
                <div className="modal-content">
                  <h5>Preteens:</h5>
                  <p>{e.preteens}</p>
                </div>
                <div className="modal-content">
                  <h5>Small children:</h5>
                  <p>{e.children}</p>
                </div>
                <div className="modal-content">
                  <h5>Is Paid:</h5>
                  <p>{e.isPaid === true ? "paid" : "not paid"}</p>
                </div>
                <div className="modal-content">
                  <h5>Phone number:</h5>
                  <p>{e.phoneNumber}</p>
                </div>
                <button
                  onClick={() =>
                    handleDelete(e.id, e.numberOfPassengers + e.preteens)
                  }
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
