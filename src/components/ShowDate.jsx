import React from "react";

const ShowDate = ({ timeStamp }) => {
  const date = new Date(timeStamp);

  const currentDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const currentTime = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // for 12-hour format with AM/PM
  });
  return (
    <div>
      <p className="text-xs">{currentDate}</p>
      <p className="text-xs">{currentTime}</p>
    </div>
  );
};

export default ShowDate;
