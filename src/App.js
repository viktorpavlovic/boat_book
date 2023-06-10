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
  const [bookValues, setBookValues] = useState({
    boat: "",
    date: "",
    time: "",
    availableSeats: 0,
    reservations: [],
  });
  const [allDocs, setAllDocs] = useState([]);

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

  const logOut = () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");
    setIsAdmin(false);
    setBookValues({
      ...bookValues,
      boat: "",
      date: "",
      time: "",
    });
  };

  return (
    <div className="div-app">
      <NoInternetConnection>
        <ApplicationProvider
          value={{
            setAccessToken,
            setIsAdmin,
            logOut,
            setBookValues,
            bookValues,
            allDocs,
            user,
            setUser,
            setFreshData,
            freshData,
          }}
        >
          {accessToken ? (
            isAdmin ? (
              <Routes>
                <Route exact path="/boat_book/admin_page" element={<AdminPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/boat_book/admin_page" replace />}
                />
              </Routes>
            ) : (
              <Routes>
                <Route path="/boat_book/reservation" element={<ReservationPage />} />
                <Route
                  path="*"
                  element={<Navigate to="/boat_book/reservation" replace />}
                />
              </Routes>
            )
          ) : (
            <Routes>
              <Route exact path="/boat_book" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/boat_book" replace />} />
            </Routes>
          )}
        </ApplicationProvider>
      </NoInternetConnection>
    </div>
  );
};

export default App;
