import { React, useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApplicationProvider } from "./context";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import LoginPage from "./Pages/LoginPage";
import ReservationPage from "./Pages/ReservationPage";
import AdminPage from "./Pages/AdminPage";
import "./app.scss";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );
  const [user,setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )
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
  }, []);

  // console.log(allDocs);

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
      <ApplicationProvider
        value={{
          setAccessToken,
          setIsAdmin,
          logOut,
          setBookValues,
          bookValues,
          allDocs,
          user,
          setUser
        }}
      >
        {accessToken ? (
          isAdmin ? (
            <Routes>
              <Route exact path="/admin_page" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/admin_page" replace />} />
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
    </div>
  );
};

export default App;
