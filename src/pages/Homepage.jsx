import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const link = useNavigate();
  return (
    <>
      <div className="homecontainer"></div>
      <div className="subhomecontainer d-flex justify-content-between p-4">
        <h1>
          Book<span className="text-white">nify</span>
        </h1>
        <button className="homebtn" onClick={() => link("/signup")}>
          create account
        </button>
      </div>
      <div className="homeinfo">
        <h3 className="mb-0  fs-1">Build your business with us.</h3>
        <p className="fs-4" style={{ textAlign: "justify" }}>
          This site help you to increase you hotels business online Now find
          your customer from any where easily.
        </p>
        <button
          className="homebtn px-5 d-flex align-items-center gap-4"
          onClick={() => link("/signin")}
        >
          Log In <IoIosArrowRoundForward className="fs-4" />
        </button>
      </div>
    </>
  );
};

export default Homepage;
