import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import useStore from "../globalStateManger/store";

const Welcome = () => {
  const { user, advertisment } = useStore();
  const [internet, setInternet] = useState(false);
  const handleFinish = () => {
    setInternet(true);
  };
  console.log({ advertisment });
  return (
    <div className="bg-indigo-200 h-screen flex justify-center items-center text-white ">
      <Header />
      <h1 className="font-bold text-4xl md:text-6xl animate-fade">
        {/* get username from user.details following register or user.user following login */}
        <div className="max-w-lg">
          {internet ? (
            <p> you can now enjoy your internet bundle</p>
          ) : (
            <video
              src={advertisment.advertisement}
              autoPlay
              controls
              onEnded={handleFinish}
              className="w-full"
            ></video>
          )}
        </div>
      </h1>
    </div>
  );
};

export default Welcome;
