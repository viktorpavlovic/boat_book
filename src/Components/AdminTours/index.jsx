import { React, useContext } from "react";
import { applicationContext } from "../../context";
import moment from "moment/moment";
import "./admin-tours.scss";

const AdminTours = () => {
  const { allDocs } = useContext(applicationContext);

  console.log(allDocs);
  return (
    <div className="div-admin-tours">
      <main>
        {allDocs?.map((e) => (
          <>
            <section>
              <p>{moment(e?.data?.date).format("LL")}</p>
              <p>{e.data.time}</p>
              <button>Tour Info</button>
            </section>
          </>
        ))}
      </main>
    </div>
  );
};

export default AdminTours;
