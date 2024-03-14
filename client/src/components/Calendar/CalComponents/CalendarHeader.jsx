import React, { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex, setDaySelected } =
    useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
    setDaySelected(dayjs());
  };

  return (
    <header className="px-4 py-2 flex items-center justify-center md:justify-start">
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button className="">
        <span
          className="material-icons-outlined cursor-pointer text-gray-600 mx-2 "
          onClick={() => {
            handlePrevMonth();
            setDaySelected(null);
          }}
        >
          chevron_left
        </span>
        <span
          className="material-icons-outlined cursor-pointer text-gray-600 mx-2"
          onClick={() => {
            handleNextMonth();
            setDaySelected(null);
          }}
        >
          chevron_right
        </span>
      </button>

      <h2 className="ml-4 text-lg text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMM YYYY')}
      </h2>
    </header>
  );
};

export default CalendarHeader;
