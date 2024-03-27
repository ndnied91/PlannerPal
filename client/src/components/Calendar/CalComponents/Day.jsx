import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import { isMobile } from 'react-device-detect';
const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    savedEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY') //gives us events that correspond to a specific day
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format(`DD-MM-YY`) === dayjs().format(`DD-MM-YY`)
      ? 'bg-gray-600 text-white rounded-full w-7'
      : null;
  };

  const renderTime = (day) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = new Date(day).toLocaleString('en-US', options);
    return formattedTime;
  };

  const shortenTitle = (title) => {
    return title.length > 10 ? `${title.substring(0, 10)}...` : title;
  };

  return (
    <div className="border border-gray-200 flex flex-col max-h-40 overflow-scroll">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm font-bold mt-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}

        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>

      <div
        className="flex-1 cursor-pointer text-sm font-thinner tracking-tight"
        onClick={() => {
          setDaySelected(day); //responsible for showing the modal when day is clicked
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, id) => {
          return (
            <div
              key={id}
              className={`bg-${evt.label}-200 p-1 m-1 text-gray-600 text-xs rounded mb-1 truncate`}
              onClick={() => setSelectedEvent(evt)}
            >
              <div className="flex justify-between ">
                <span>{shortenTitle(evt.title)}</span>
                <span className="md:invisible lg:visible">
                  {renderTime(evt.day)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
