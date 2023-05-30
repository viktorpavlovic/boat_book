import { React, useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ApplicationProvider } from "./context";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ReservationPage from "./Pages/ReservationPage";
import AdminPage from "./Pages/AdminPage";
import "./app.scss";

const App = () => {
  const [userUid, setUserUid] = useState("");
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [bookValues, setBookValues] = useState({
    boat: "",
    date: "",
    time: "",
    email: "",
    num_of_passengers: "",
    phone_number: "",
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
          setUserUid,
          loggedIn,
          navigate,
          notLoggedIn,
          logOut,
          setBookValues,
          bookValues,
        }}
      >
        {accessToken ? (
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/admin_page" element={<AdminPage />} />
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
