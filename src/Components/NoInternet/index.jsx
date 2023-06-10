import React, { useState, useEffect } from "react";
import "./no-internet.scss";

const NoInternetConnection = (props) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="no-internet-div">
        <h1>No Interner Connection. Please check your connection.</h1>
      </div>
    );
  }
};

export default NoInternetConnection;
