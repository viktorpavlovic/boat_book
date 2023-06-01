import React from "react";
import "./login-page.scss";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import WrapperLogin from "../../Components/WrapperLogin";

const LoginPage = () => {
  return (
    <div className="div-login-page">
      <Header />
      <WrapperLogin/>
      <Footer />
    </div>
  );
};

export default LoginPage;
