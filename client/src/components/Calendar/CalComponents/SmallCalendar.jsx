import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { getMonth } from '../../../utils/util';
import { LuDot } from 'react-icons/lu';

export default function SmallCalendar({ isDarkTheme }) {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  console.log(isDarkTheme);
  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
    savedEvents,
  } = useContext(GlobalContext);

  let tempArr = savedEvents;

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return 'bg-gray-300 rounded-full text-gray-900';
    } else if (currDay === slcDay) {
      return 'bg-gray-100 rounded-full text-gray-600 font-bold';
    } else {
      return '';
    }
  }
  const renderDot = (day) => {
    return tempArr.some((i) => {
      const savedEventDate = new Date(i.day)
        .toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })
        .replace(/,/g, '');

      if (day.$d.toString().includes(savedEventDate)) {
        tempArr = tempArr.filter(
          (item) => new Date(item.day).toString() !== savedEventDate.toString()
        );
        return true;
      }
    });
  };

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p
          className={`${
            isDarkTheme ? 'text-gray-100' : 'text-gray-500'
          } font-bold pb-2`}
        >
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
        </p>
        <div>
          <button
            onClick={() => {
              handlePrevMonth();
              setDaySelected(null);
            }}
          >
            <span
              className={`${
                isDarkTheme ? 'text-gray-100' : 'text-gray-600'
              } material-icons-outlined cursor-pointer mx-2`}
            >
              chevron_left
            </span>
          </button>
          <button
            onClick={() => {
              handleNextMonth();
              setDaySelected(null);
            }}
          >
            <span
              className={`${
                isDarkTheme ? 'text-gray-100' : 'text-gray-600'
              } material-icons-outlined cursor-pointer mx-2`}
            >
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center font-bold">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full self-start ${getDayClass(day)}`}
              >
                <div className="text-sm flex flex-col">
                  {day.format('D')}

                  {renderDot(day) ? (
                    <p className="h-5 flex justify-center md:items-center">
                      <LuDot className="text-3xl text-red-700" />
                    </p>
                  ) : null}
                </div>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
