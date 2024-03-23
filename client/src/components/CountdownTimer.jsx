import React from 'react';

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  isDarkTheme,
}) => {
  if (completed) {
    // Render a complete state
    return <span className="text-xs">Countdown Finished</span>;
  } else {
    // Render a countdown
    return (
      <div className="text-sm flex">
        <div className="flex flex-col p-1">
          <p className="text-xs">Days</p>
          <p>{days}</p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs">Hrs</p>
          <p>{hours}</p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs">Min</p>
          <p>{minutes}</p>
        </div>

        <div className="flex flex-col p-1">
          <p className="text-xs">Sec</p>
          <p>{seconds}</p>
        </div>
      </div>
    );
  }
};

export default renderer;
