import React from 'react';

const PriorityTodoOverview = ({ items }) => {
  const priorityItems = () => {
    const priority = items.filter(
      (item) => item.isPriority === true && !item.isCompleted
    );
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
    <section className="p-5 h-96 ">
      <div className="font-bold text-lg w-[20rem]">
        Priority Items at a Glance
      </div>
      {priorityItems()}
    </section>
  );
};

export default PriorityTodoOverview;
