import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <section>
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="container container-fluid">
          <img src="assets/imgs/attendance.png" height={300} alt="logo" />
          <h1 className="u-text u-text-default u-title u-text-1">Eklavya</h1>
          <p
            className="
                            u-large-text
                            u-text
                            u-text-default-xl
                            u-text-variant
                            u-text-2
                        "
          >
            Please select your role
          </p>
          <span>
            <Link
              to={{
                pathname: "/login",
                state: { role: "mentor" },
              }}
              className="u-btn-1"
            >
              Mentor
            </Link>
            <Link
              to={{
                pathname: "/login",
                state: { role: "mentee" },
              }}
              className="u-btn-2"
            >
              Mentee
            </Link>
          </span>
        </div>
      </section>
    </>
  );
};

export default Landing;
