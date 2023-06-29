import React from "react";
import Header from "../../Components/Header";
import WrapperReservation from "../../Components/WrapperReservation";
import Footer from "../../Components/Footer";
import "./reservation-page.scss";
// import { TicketContextProvider } from '../../store/ticket-context';
const ReservationPage = () => {
  return (
    <div className="div-reservation-page">
      <Header />
        {/* <TicketContextProvider> */}
          <WrapperReservation />
        {/* </TicketContextProvider> */}
      <Footer />
    </div>
  );
};

export default ReservationPage;
