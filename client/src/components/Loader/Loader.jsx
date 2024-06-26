import React from "react";

function Loader() {
  return (
    <div>
      <svg className="circleLoader" viewBox="25 25 50 50">
        <circle className="cLoader" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}

export default Loader;
