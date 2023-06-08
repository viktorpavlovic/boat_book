import { React, useContext } from "react";
import { applicationContext } from "../../context";
import moment from "moment/moment";
import "./admin-tours.scss";

const AdminTours = ({ handleOpen }) => {
  const { allDocs } = useContext(applicationContext);

  return (
    <div className="div-admin-tours">
      <main>
        {allDocs?.map((e) => (
            <section key={e.id}>
              <p>{moment(e?.data?.date).format("LL")}</p>
              <p>{e.data.time}</p>
              <button onClick={() => handleOpen(e)}>Tour Info</button>
            </section>
        ))}
      </main>
    </div>
  );
};

export default AdminTours;
