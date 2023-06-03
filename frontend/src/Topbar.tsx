import React from "react";
import "./Topbar.css";

function Topbar() {
  return (
    <div className="topbar">
      <div className="button-div sidebar-button" role="button">
        <img
          className="button-svg"
          src="./src/assets/icons/sidebar-button.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Topbar;

