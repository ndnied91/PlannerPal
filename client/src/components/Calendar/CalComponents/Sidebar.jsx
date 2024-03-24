import React, { useContext } from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';
import Labels from './Labels';
import GlobalContext from '../context/GlobalContext';
import { isMobile } from 'react-device-detect';

const Sidebar = ({ isDarkTheme }) => {
  const { daySelected, savedEvents, setShowEventModal, setSelectedEvent } =
    useContext(GlobalContext);

  const renderItems = () => {
    const formattedDate = new Date(daySelected)
      .toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
      .replace(/,/g, '');

    return savedEvents.map((i) => {
      let eventDate = new Date(i.day).toString();
      console.log(eventDate);

      if (eventDate.includes(formattedDate)) {
        const dateObj = new Date(i.day);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = dateObj.toLocaleString('en-US', options);

        console.log(formattedTime);

        return (
          <div
            key={i._id}
            className={`${
              isDarkTheme ? 'bg-neutral-700' : 'bg-slate-300'
            }  p-3 flex text-sm justify-between rounded-md mb-1`}
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
      <aside
        className={` ${
          isDarkTheme ? 'border-neutral-500 rounded-sm' : 'null'
        } border p-5 w-full md:w-64 content-center md:mr-5`}
      >
        <CreateEventButton isDarkTheme={isDarkTheme} />
        <SmallCalendar isDarkTheme={isDarkTheme} />
        {!isMobile ? <Labels isDarkTheme={isDarkTheme} /> : null}
      </aside>

      {isMobile ? <div className="mt-2">{renderItems()}</div> : null}
    </section>
  );
};

export default Sidebar;
