import React from "react";

function ProgressBar({ progress, duration }) {
  const progressValue = progress * (100 / duration);
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${progressValue}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
