import React, { useEffect, useState } from 'react';

const UrgentTodoOverview = ({ items, userSettings }) => {
  const [approaching, setApproaching] = useState([]);

  const convertTimeDeadLine = (date) => new Date(date).getTime() - Date.now();

  const urgencySetting = (time) => {
    return time * 3600000;
  };

  useEffect(() => {
    const tempArr = [];
    items.forEach((item) => {
      const time = convertTimeDeadLine(item.dueDate); // convert time to milliseconds

      if (time < urgencySetting(userSettings.urgency) && !item.isCompleted) {
        tempArr.push({
          key: item._id,
          title: item.title,
          // due: time,
          dueDate: item.dueDate,
        });
      }

      //sort them here
      const collator = new Intl.Collator('en', {
        numeric: true,
        sensitivity: 'base',
      });
      tempArr.sort((a, b) => {
        return collator.compare(a.dueDate, b.dueDate);
      });
    });
    setApproaching(tempArr);
  }, [userSettings]);

  const renderItems = () => {
    if (approaching.length > 0) {
      return approaching.map((i) => {
        {
        }
        return (
          <div
            className="capitalize border-b-gray-300 border-b mt-5 text-sm"
            key={i.key}
          >
            <div className="flex justify-between p-1">
              <p>{i.title}</p>
              <p>{new Date(i.dueDate).toLocaleString()}</p>
            </div>
          </div>
        );
      });
    }
  };

  const day = userSettings.urgency / 24;

  return (
    <section className="p-5 h-fit">
      <div className="font-bold text-lg  w-[30rem]">Urgent Tasks</div>
      <span className="text-sm">Tasks ending in </span>

      <span className="font-bold text-xs">
        {' '}
        {day} {day < 2 ? 'day' : 'days'}{' '}
      </span>
      <div className="overflow-scroll ">{renderItems()}</div>
    </section>
  );
};

export default UrgentTodoOverview;
