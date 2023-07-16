import { React, useContext, useState } from "react";
import { applicationContext } from "../../context";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment/moment";
import dayjs from "dayjs";
import "./admin-tours.scss";

const AdminTours = ({ handleOpen }) => {
  const { allDocs, freshData, setFreshData } = useContext(applicationContext);
  const boats = ["Turtle Boat", "Key Boat", "Nikola Tesla Boat", "Open Bus"];
  const dateFormat = "YYYY-M-D HH:mm";
  const [selectedBoat, setSelectedBoat] = useState(boats[0]);
  const [pastTours, setPastTours] = useState(false);
  const handleDelete = async (e) => {
    await deleteDoc(doc(db, "tours", e.id));
    setFreshData(!freshData);
  };
  const filteredDocs = allDocs
    .filter(
      (e) =>
        (selectedBoat === boats[0] && e?.data?.boat === "turtle-boat") ||
        (selectedBoat === boats[1] && e?.data?.boat === "key-boat") ||
        (selectedBoat === boats[2] && e?.data?.boat === "nikola-tesla-boat") ||
        (selectedBoat === boats[3] && e?.data?.boat === "open-bus")
      // selectedBoat === boats[0]
      //   ? e.data.boat === "turtle-boat"
      //   : selectedBoat === boats[1]
      //   ? e.data.boat === "key-boat"
      //   : e.data.boat === "nikola-tesla-boat"
    )
    .sort((a, b) =>
      pastTours
        ? moment(b.data.date, dateFormat) - moment(a.data.date, dateFormat)
        : moment(a.data.date, dateFormat) - moment(b.data.date, dateFormat)
    )
    .filter((e) =>
      pastTours
        ? moment(e.data.date, dateFormat) < moment(new Date())
        : moment(e.data.date, dateFormat) >= moment(new Date())
    );
  return (
    <div className="div-admin-tours">
      <div className="boat-toggle-div">
        {boats.map((boat, i) => (
          <button
            key={i}
            className={boat === selectedBoat ? "selected" : ""}
            onClick={() => setSelectedBoat(boats[i])}
          >
            {boat}
          </button>
        ))}
      </div>
      <div className="past-toggle-div">
        <button
          className={pastTours ? "selected" : ""}
          onClick={() => setPastTours(!pastTours)}
        >
          Past
        </button>
        <button
          className={pastTours ? "" : "selected"}
          onClick={() => setPastTours(!pastTours)}
        >
          Upcoming
        </button>
      </div>
      <main>
        {filteredDocs[0] ? (
          filteredDocs.map((e) => (
            <section key={e.id}>
              <p>{dayjs(e?.data?.date).format("ddd DD-MM hh:mm")}</p>
              {/* <p>{e.data.time}</p> */}
              <button onClick={() => handleOpen(e)}>Tour Info</button>
              <button className="del" onClick={() => handleDelete(e)}>
                Delete
              </button>
            </section>
          ))
        ) : (
          <p>No tours found!</p>
        )}
      </main>
    </div>
  );
};

export default AdminTours;
