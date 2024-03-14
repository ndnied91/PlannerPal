import React, { useState, useContext, useEffect } from 'react';
import './calendar.css';
import { getMonth } from '../../utils/util';
import CalendarHeader from './CalComponents/CalendarHeader';
import Sidebar from './CalComponents/Sidebar';
import Month from './CalComponents/Month';
import GlobalContext from './context/GlobalContext';
import EventModal from './CalComponents/EventModal';
import { isMobile } from 'react-device-detect';
import OutsideClickHandler from 'react-outside-click-handler';

const container = ({ userContext }) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="md:ml-32 h-[85vh] flex flex-col ml-5 mr-5 pt-5">
      {showEventModal ? <EventModal userContext={userContext} /> : null}

      <CalendarHeader />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar />

        {!isMobile ? <Month month={currentMonth} /> : null}
      </div>
    </div>
  );
};
export default container;
