import React from 'react';
import Day from './Day';

const Month = ({ month, isDarkTheme }) => {
  return (
    <div
      className={`${
        isDarkTheme ? 'bg-neutral-700 divide-neutral-500' : 'bg-white'
      } flex-1 grid grid-cols-7 grid-rows-5 `}
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
