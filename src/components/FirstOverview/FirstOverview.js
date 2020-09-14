import React from "react";
import "./FirstOverview.css";

const FirstOverview = () => {
  return (
    <div className="m-auto animate__animated animate__zoomInDown animate__slow md:block hidden">
      <div className="max-w-lg flex flex-col space-y-3">
        <img
          src="https://web.whatsapp.com/img/intro-connection-light_c98cc75f2aa905314d74375a975d2cf2.jpg"
          alt="what-img"
          className="inline-block w-full h-full"
        />
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-4xl leading-8 text-gray-600">
            Keep your phone connected
          </h2>
          <div className="font-light text-gray-600 text-sm pb-12 border-b border-gray-200">
            WhatsApp-Clone connects to your phone to sync messages. To reduce
            data
            <p className="text-center">usage, connect your phone to Wi-Fi.</p>
          </div>
          <p className="text-center font-light text-gray-600 text-sm ">
            Soon WhatsApp-Clone will be available for Windows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstOverview;
