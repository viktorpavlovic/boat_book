import React from "react";
import Header from "../../Components/Header";
import WrapperReservation from "../../Components/WrapperReservation";
import Footer from "../../Components/Footer";
import "./reservation-page.scss";

const ReservationPage = () => {
  return (
    <div className="div-reservation-page">
      <Header />
      <WrapperReservation />
      <Footer />
    </div>
  );
};

export default ReservationPage;
