import React, { useEffect, useState } from 'react';

const UrgentTodoOverview = ({
  items,
  userSettings,
  setItemsShowModal,
  setEvent,
}) => {
  const convertTimeDeadLine = (date) => new Date(date).getTime() - Date.now();

  const urgencySetting = (time) => {
    return time * 3600000;
  };

  const showEventModal = (i) => {
    setItemsShowModal(true);
    setEvent(i);
  };

  const filterNdSortItems = () => {
    const tempArr = [];
    items.forEach((item) => {
      const time = convertTimeDeadLine(item.dueDate); // convert time to milliseconds

      if (time < urgencySetting(userSettings.urgency) && !item.isCompleted) {
        tempArr.push(item);
      }
    });

    const collator = new Intl.Collator('en', {
      numeric: true,
      sensitivity: 'base',
    });
    tempArr.sort((a, b) => {
      return collator.compare(a.dueDate, b.dueDate);
    });
    return tempArr;
  };

  const day = userSettings.urgency / 24;

  const renderItems = () => {
    return filterNdSortItems().map((i) => {
      return (
        <div
          key={i._id}
          className="capitalize border-b-gray-300 border-b mt-5 text-sm cursor-pointer"
        >
          <div
            className="flex justify-between p-1"
            onClick={() => showEventModal(i)}
          >
            <p>{i.title}</p>
            <p>{new Date(i.dueDate).toLocaleString()}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <section className="p-5 h-fit">
      <div className="font-bold text-lg  w-[30rem]">Urgent Tasks</div>
      <span className="text-sm">Tasks passed and ending in </span>

      <span className="font-bold text-xs">
        {' '}
        {day} {day < 2 ? 'day' : 'days'}{' '}
      </span>
      <div className="overflow-scroll">{renderItems()}</div>
    </section>
  );
};

export default UrgentTodoOverview;
