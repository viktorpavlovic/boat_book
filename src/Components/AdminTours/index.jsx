import { React, useContext } from "react";
import { applicationContext } from "../../context";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment/moment";
import "./admin-tours.scss";

const AdminTours = ({ handleOpen }) => {
  const { allDocs, freshData, setFreshData } = useContext(applicationContext);
  const handleDelete = async (e) => {
    await deleteDoc(doc(db, "tours", e.id));
    setFreshData(!freshData);
  };
  return (
    <div className="div-admin-tours">
      <main>
        {allDocs?.sort((a,b)=>moment(a.data.date)-moment(b.data.date)).map((e) => (
            <section key={e.id}>
              <p>{moment(e?.data?.date).format("LL")}</p>
              <p>{e.data.time}</p>
              <button onClick={() => handleOpen(e)}>Tour Info</button>
              <button className="del" onClick={() => handleDelete(e)}>Delete</button>
            </section>
        ))}
      </main>
    </div>
  );
};

export default AdminTours;
