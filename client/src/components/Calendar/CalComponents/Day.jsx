import React, { useContext, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';

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
      ? 'bg-blue-600 text-white rounded-full w-7'
      : null;
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
        className="flex-1 cursor-pointer text-sm font-thiner tracking-tight"
        onClick={() => {
          setDaySelected(day); //responsible for showing the modal when day is clicked
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, id) => {
          return (
            <div
              key={id}
              className={`bg-${evt.label}-200 p-1 m-2 text-gray-600 text-sm rounded mb-1 truncate `}
              onClick={() => setSelectedEvent(evt)}
            >
              {evt.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
