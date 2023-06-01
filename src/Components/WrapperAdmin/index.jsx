import React from "react";
import AdminReservationForm from "../../Components/AdminReservationForm";
import AdminTours from "../AdminTours";
import "./wrapper-admin.scss";

const WrapperAdmin = () => {
  return (
    <div className="div-wrapper-admin">
      <AdminReservationForm />
      <AdminTours />
    </div>
  );
};

export default WrapperAdmin;
