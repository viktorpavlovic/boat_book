import { React} from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { ApplicationProvider } from "./context";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ReservationPage from "./Pages/ReservationPage";
import "./app.scss";

const App = () => {
  // const [form,setForm] = useState({})
  return (
    <div className="div-app">
      {/* <ApplicationProvider> */}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* </ApplicationProvider> */}
    </div>
  );
};

export default App;
