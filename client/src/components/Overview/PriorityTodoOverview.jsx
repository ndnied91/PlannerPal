import React from 'react';

const PriorityTodoOverview = ({ items }) => {
  const priorityItems = () => {
    const priority = items.filter((item) => item.isPriority === true);
    if (priority.length < 1) {
      return 'No priority tasks exist at the minute';
    } else {
      return priority.map((i) => {
        return (
          <div
            className="capitalize border-b-gray-300 border-b mt-5 text-sm"
            key={i._id}
          >
            {' '}
            {i.title}
          </div>
        );
      });
    }
  };

  return (
    <section className="p-5">
      <div className="font-bold text-lg  w-[30rem]">
        Priority Items at a Glance
      </div>
      <div className="overflow-scroll h-96">{priorityItems()}</div>
    </section>
  );
};

export default PriorityTodoOverview;
