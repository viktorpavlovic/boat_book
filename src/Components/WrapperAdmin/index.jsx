import React from "react";
import AdminReservationForm from "../../Components/AdminReservationForm";
import AdminTours from "../AdminTours";
import "./wrapper-admin.scss";

const WrapperAdmin = ({ handleOpen }) => {
  return (
    <div className="div-wrapper-admin">
      <AdminReservationForm />
      <AdminTours handleOpen={handleOpen} />
    </div>
  );
};

export default WrapperAdmin;
