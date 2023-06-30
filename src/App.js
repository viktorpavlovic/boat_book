import { React, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApplicationProvider } from "./context";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import LoginPage from "./Pages/LoginPage";
import NoInternetConnection from "./Components/NoInternet";
import ReservationPage from "./Pages/ReservationPage";
import AdminPage from "./Pages/AdminPage";
import "./app.scss";

const App = () => {
  const [freshData, setFreshData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [allDocs, setAllDocs] = useState([]);
  const [rides, setAllRides] = useState([]);

  useEffect(() => {
    const fetchAllDocs = async () => {
      const collectionRef = collection(db, "tours");
      const querySnapshot = await getDocs(collectionRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllDocs(docsData);
    };
    fetchAllDocs();
  }, [freshData]);

  useEffect(() => {
    const fetchAllRides = async () => {
      const collectionRef = collection(db, "rides");
      const querySnapshot = await getDocs(collectionRef);
      const ridesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllRides(ridesData);
    };
    fetchAllRides();
  }, []);

  const logOut = () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
    setIsAdmin(false);
  };

  return (
    <div className="div-app">
      <NoInternetConnection>
        <ApplicationProvider
          value={{
            setAccessToken,
            setIsAdmin,
            logOut,
            allDocs,
            user,
            setUser,
            setFreshData,
            freshData,
            rides,
          }}
        >
          {accessToken ? (
            isAdmin ? (
              <Routes>
                <Route exact path="/admin_page" element={<AdminPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/admin_page" replace />}
                />
              </Routes>
            ) : (
              <Routes>
                <Route path="/reservation" element={<ReservationPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/reservation" replace />}
                />
              </Routes>
            )
          ) : (
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </ApplicationProvider>
      </NoInternetConnection>
    </div>
  );
};

export default App;
