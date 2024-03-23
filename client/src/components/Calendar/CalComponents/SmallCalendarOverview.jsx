import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { getMonth } from '../../../utils/util';
import { LuDot } from 'react-icons/lu';

export default function SmallCalendar({
  setPreviewEvents,
  setPopupPosition,
  isDarkTheme,
}) {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, daySelected, savedEvents } = useContext(GlobalContext);

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
      return 'font-extrabold text-blue-500 ';
    } else if (currDay === slcDay) {
      return 'text-red-600 font-bold';
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

  const previewEvents = (e) => {
    let position = { upDown: e.clientY - 150, leftRight: e.clientX };

    setPopupPosition(position);
    let filteredEvents = savedEvents.filter((user) => {
      const savedEventDate = new Date(user.day).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

      const targetDate = new Date(e.target.id).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

      return savedEventDate === targetDate;
    });
    setPreviewEvents(filteredEvents);
  };

  return (
    <div className="">
      <header className="flex justify-between">
        <p
          className={`${
            isDarkTheme ? 'text-gray-100' : 'text-gray-500'
          } font-bold pb-2`}
        >
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span
              className={`${
                isDarkTheme ? 'text-gray-100' : 'text-gray-600'
              } material-icons-outlined cursor-pointer mx-2`}
            >
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
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
          <span key={i} className="text-md py-1 text-center font-bold">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`w-full self-start min-h-10 flex justify-center ${getDayClass(
                  day
                )}`}
              >
                <div className="text-sm flex flex-col absolute">
                  {day.format('D')}

                  {renderDot(day) ? (
                    <div
                      className="self-center translate-y-[-0.6rem]"
                      onMouseEnter={(e) => previewEvents(e)}
                      onMouseLeave={() => setPreviewEvents([])}
                    >
                      <LuDot
                        id={`${day.$d}`}
                        className="text-3xl text-red-700"
                      />
                      <LuDot
                        id={`${day.$d}`}
                        className="invisibleBtn opacity-0 fixed translate-y-[-3rem] translate-x-[.5rem] text-2xl"
                      />
                    </div>
                  ) : null}
                  {/*  */}
                </div>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
