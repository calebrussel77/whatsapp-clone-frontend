import React from "react";
import "./FirstOverview.css";

const FirstOverview = () => {
  return (
    <div
      className="firstOverview"
      style={{
        textAlign: "center",
        maxWidth: "26rem",
        margin: "auto",
        paddingBottom: "5rem",
      }}
    >
      <img
        src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg"
        alt="what-img"
      />
      <div>
        <h2>Keep your phone connected</h2>
        <div>
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </div>
        <p>WhatsApp is available for Windows.</p>
      </div>
    </div>
  );
};

export default FirstOverview;
