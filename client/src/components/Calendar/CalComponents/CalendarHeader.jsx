import React, { useContext } from 'react';

import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';

const CalendarHeader = ({ isDarkTheme }) => {
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
      <button
        className={`${
          isDarkTheme
            ? 'bg-neutral-500 border-neutral-500 hover:opacity-90 duration-200'
            : null
        }  border rounded-md py-2 px-4 mr-5`}
        onClick={handleReset}
      >
        Today
      </button>
      <button className="">
        <span
          className={`${
            isDarkTheme ? 'text-gray-100' : 'text-gray-600'
          } material-icons-outlined cursor-pointer mx-2`}
          onClick={() => {
            handlePrevMonth();
            setDaySelected(null);
          }}
        >
          chevron_left
        </span>
        <span
          className={`${
            isDarkTheme ? 'text-gray-100' : 'text-gray-600'
          } material-icons-outlined cursor-pointer mx-2`}
          onClick={() => {
            handleNextMonth();
            setDaySelected(null);
          }}
        >
          chevron_right
        </span>
      </button>

      <h2
        className={`${
          isDarkTheme ? 'text-slate-50' : 'text-gray-500'
        } ml-4 text-lg font-bold`}
      >
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMM YYYY')}
      </h2>
    </header>
  );
};

export default CalendarHeader;
