import React from "react";
import Header from "../../Components/Header";
import WrapperHome from "../../Components/WrapperHome";
import Footer from "../../Components/Footer";
import "./home-page.scss";
const HomePage = () => {
  return (
    <div className="div-home-page">
      <Header />
      <WrapperHome />
      <Footer />
    </div>
  );
};

export default HomePage;
