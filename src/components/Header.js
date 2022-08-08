import React from "react";
import useStore from "../globalStateManger/store";

const Header = () => {
  const { logout } = useStore();
  return (
    <div className="flex justify-between items-center fixed top-0 w-full px-4 py-2 ">
      {/* <img src="/logo.png" alt="logo" /> */}
      <div />
      <button
        className="font-bold font-xl bg-indigo-400 rounded p-2 text-white shadow-white hover:font-4xl hover:text-indigo-400 hover:bg-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
