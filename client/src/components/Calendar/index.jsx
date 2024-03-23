import React, { useState, useContext, useEffect } from 'react';
import './calendar.css';
import { getMonth } from '../../utils/util';
import CalendarHeader from './CalComponents/CalendarHeader';
import Sidebar from './CalComponents/Sidebar';
import Month from './CalComponents/Month';
import GlobalContext from './context/GlobalContext';
import EventModal from './CalComponents/EventModal';
import { isMobile } from 'react-device-detect';

const container = ({ userContext, isDarkTheme }) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="md:ml-32 h-[85vh] flex flex-col ml-5 mr-5 pt-5 ">
      {showEventModal ? (
        <EventModal userContext={userContext} isDarkTheme={isDarkTheme} />
      ) : null}

      <CalendarHeader isDarkTheme={isDarkTheme} />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar isDarkTheme={isDarkTheme} />

        {!isMobile ? (
          <Month month={currentMonth} isDarkTheme={isDarkTheme} />
        ) : null}
      </div>
    </div>
  );
};
export default container;
