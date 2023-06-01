import React from "react";
import Header from "../../Components/Header";
import WrapperAdmin from "../../Components/WrapperAdmin";
import Footer from "../../Components/Footer";
import "./admin-page.scss";

const AdminPage = () => {
  return (
    <div className="div-admin-page">
      <Header />
      <WrapperAdmin />
      <Footer />
    </div>
  );
};

export default AdminPage;
