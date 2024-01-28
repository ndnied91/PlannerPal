import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { getMonth } from '../../../utils/util';
import { LuDot } from 'react-icons/lu';
import PreviewModal from './PreviewModal';

export default function SmallCalendar({ setPreviewEvents, setPopupPosition }) {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

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
      return 'font-extrabold text-blue-500 ';
    } else if (currDay === slcDay) {
      return 'text-red-600 font-bold';
    } else {
      return '';
    }
  }
  const renderDot = (day) => {
    return tempArr.some((i) => {
      let savedEventDate = new Date(i.day);

      if (day.$d.toString() == savedEventDate.toString()) {
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
    let filteredEvents = savedEvents.filter(
      (user) => new Date(user.day).toString() === e.target.id
    );
    setPreviewEvents(filteredEvents);
  };

  return (
    <div className="">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold pb-8">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
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
                className={`w-full self-start min-h-14 flex justify-center ${getDayClass(
                  day
                )}`}
              >
                <div className="text-md flex flex-col">
                  {day.format('D')}

                  {renderDot(day) ? (
                    <div
                      className="self-center translate-y-[-0.6rem]"
                      id="sdfsfasdf"
                      onMouseEnter={(e) => previewEvents(e)}
                      onMouseLeave={(e) => setPreviewEvents([])}
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
