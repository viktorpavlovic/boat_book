import { React, useContext, useState } from "react";
import { applicationContext } from "../../context";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment/moment";
import "./admin-tours.scss";

const AdminTours = ({ handleOpen }) => {
  const { allDocs, freshData, setFreshData } = useContext(applicationContext);
  const [pastTours, setPastTours] = useState(false);
  const handleDelete = async (e) => {
    await deleteDoc(doc(db, "tours", e.id));
    setFreshData(!freshData);
  };
  const filteredDocs = allDocs
    .sort((a, b) =>
      pastTours
        ? moment(b.data.date) - moment(a.data.date)
        : moment(a.data.date) - moment(b.data.date)
    )
    .filter((e) =>
      pastTours
        ? moment(e.data.date) < moment(new Date())
        : moment(e.data.date) >= moment(new Date())
    );
  return (
    <div className="div-admin-tours">
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
        {filteredDocs.map((e) => (
          <section key={e.id}>
            <p>{moment(e?.data?.date).format("LL")}</p>
            <p>{e.data.time}</p>
            <button onClick={() => handleOpen(e)}>Tour Info</button>
            <button className="del" onClick={() => handleDelete(e)}>
              Delete
            </button>
          </section>
        ))}
      </main>
    </div>
  );
};

export default AdminTours;
