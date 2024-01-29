import React, { useState, useContext, useEffect } from 'react';
import './calendar.css';
import { getMonth } from '../../utils/util';
import CalendarHeader from './CalComponents/CalendarHeader';
import Sidebar from './CalComponents/Sidebar';
import Month from './CalComponents/Month';
import GlobalContext from './context/GlobalContext';
import EventModal from './CalComponents/EventModal';

const container = ({ userContext }) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="ml-12 h-[85vh] flex flex-col mr-5 pt-5">
      {showEventModal ? <EventModal userContext={userContext} /> : null}

      <CalendarHeader />

      <div className="flex flex-1">
        <Sidebar />
        <Month month={currentMonth} />
      </div>
    </div>
  );
};

export default container;

// https://www.youtube.com/watch?v=KUKyTRYGrnU
