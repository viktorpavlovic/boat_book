import { React, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ApplicationProvider } from "./context";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ReservationPage from "./Pages/ReservationPage";
import "./app.scss";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );

  const navigate = useNavigate();
  const loggedIn = () => {
    navigate("/reservation");
  };
  const notLoggedIn = () => {
    navigate("/login");
  };
  const logOut = () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    navigate("/home");
  };

  return (
    <div className="div-app">
      <ApplicationProvider
        value={{
          accessToken,
          setAccessToken,
          loggedIn,
          navigate,
          notLoggedIn,
          logOut,
        }}
      >
        {accessToken ? (
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </ApplicationProvider>
    </div>
  );
};

export default App;
