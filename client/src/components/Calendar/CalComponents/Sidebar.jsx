import React, { useContext, useEffect, useState } from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import Labels from './Labels';
import GlobalContext from '../context/GlobalContext';
import { isMobile } from 'react-device-detect';

const Sidebar = () => {
  const { daySelected, savedEvents, setShowEventModal, setSelectedEvent } =
    useContext(GlobalContext);

  const renderItems = () => {
    let date = new Date(daySelected).getTime();
    return savedEvents.map((i) => {
      if (i.day === date) {
        const time = new Date(i.day);
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

        return (
          <div
            className="bg-slate-300 p-3 flex text-sm justify-between"
            onClick={() => {
              setSelectedEvent(i);
              setShowEventModal(true);
            }}
          >
            <p> {i.title}</p> <p>{formattedTime}</p>{' '}
          </div>
        );
      }
    });
  };

  return (
    <section>
      <aside className="border p-5 w-full md:w-64 content-center">
        <CreateEventButton />
        <SmallCalendar />
        {!isMobile ? <Labels /> : null}
      </aside>

      {isMobile ? <div className="mt-2">{renderItems()}</div> : null}
    </section>
  );
};

export default Sidebar;
