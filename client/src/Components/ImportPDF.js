import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "../sass/components/_importpdf.scss";
import { useLocation, useNavigate } from "react-router-dom";

const ImportPDF = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const openWindow = () => {
    window.print();
  };
  useEffect(() => {
    setTimeout(openWindow, 1000);

    (function () {
      var beforePrint = function () {
        console.log("Printing...");
      };

      var afterPrint = function () {
        navigate("/manuscript");
      };

      if (window.matchMedia) {
        var mediaQueryList = window.matchMedia("print");
        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
            beforePrint();
          } else {
            afterPrint();
          }
        });
      }

      window.onbeforeprint = beforePrint;
      window.onafterprint = afterPrint;
    })();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="" />
        <div className="text-container">
          <p className="school">PAMANTASAN NG LUNGSOD NG VALENZUELA</p>
          <p className="address">Tongco St., Maysan, Valenzuela City</p>
        </div>
      </div>
      <div className="body">
        <div className="title">
          <h1>{location.state.title}</h1>
        </div>
        <div className="abstract">
          <p>{location.state.abstract}</p>
        </div>
        <div className="person">
          <p>Authors: {location.state.authors}</p>
          <p>Panelist: {location.state.panelists}</p>
          <p>Adviser: {location.state.adviser}</p>
          <p>Chairperson: {location.state.chairperson}</p>
        </div>
        <div className="information">
          <p>Year: {location.state.year}</p>
          <p>Course: {location.state.course}</p>
        </div>
      </div>
    </div>
  );
};

export default ImportPDF;
