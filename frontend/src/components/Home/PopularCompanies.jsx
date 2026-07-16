import React, { useState } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const [selectedCompany, setSelectedCompany] =
    useState(null);

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Hyderabad, Telangana, India",
      openPositions: 10,
      positions: [
        "Software Engineer",
        "Frontend Developer",
        "Cloud Engineer",
        "Data Analyst",
        "DevOps Engineer",
      ],
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Bangalore, Karnataka, India",
      openPositions: 5,
      positions: [
        "Embedded Engineer",
        "Software Engineer",
        "Automation Engineer",
        "Data Engineer",
      ],
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Hyderabad, Telangana, India",
      openPositions: 20,
      positions: [
        "iOS Developer",
        "UI Engineer",
        "Backend Developer",
        "Cloud Engineer",
        "Product Engineer",
      ],
      icon: <FaApple />,
    },
  ];

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>

        <div className="banner">
          {companies.map((element) => {
            return (
              <div
                className="card"
                key={element.id}
              >
                <div className="content">
                  <div className="icon">
                    {element.icon}
                  </div>

                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedCompany(
                      element
                    )
                  }
                >
                  Open Positions{" "}
                  {element.openPositions}
                </button>
              </div>
            );
          })}
        </div>

        {selectedCompany && (
          <div className="positions-box">
            <button
              className="close-btn"
              onClick={() =>
                setSelectedCompany(null)
              }
            >
              ✕
            </button>

            <h3>
              {selectedCompany.title}
              {" "}Hiring
            </h3>

            {selectedCompany.positions.map(
              (
                position,
                index
              ) => (
                <div
                  key={index}
                  className="company-position"
                >
                   💼 {position}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularCompanies;