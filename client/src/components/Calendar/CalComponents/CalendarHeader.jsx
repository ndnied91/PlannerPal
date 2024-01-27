import React, { useContext } from 'react';
import logo from '../assets/logo.svg';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button className="">
        <span
          className="material-icons-outlined cursor-pointer text-gray-600 mx-2"
          onClick={handlePrevMonth}
        >
          chevron_left
        </span>
        <span
          className="material-icons-outlined cursor-pointer text-gray-600 mx-2"
          onClick={handleNextMonth}
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
