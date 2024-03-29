import React from 'react';

const PriorityTodoOverview = ({ items, setItemsShowModal, setEvent }) => {
  const showEventModal = (i) => {
    setItemsShowModal(true);
    setEvent(i);
  };

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
            className="capitalize border-b-gray-300 border-b mt-5 text-sm cursor-pointer"
            key={i._id}
            onClick={() => showEventModal(i)}
          >
            {' '}
            {i.title}
          </div>
        );
      });
    }
  };

  return (
    <section className="p-5 max-h-80 overflow-x-auto">
      <div className="font-bold text-lg md:w-[20rem]">
        Priority Items at a Glance
      </div>
      {priorityItems()}
    </section>
  );
};

export default PriorityTodoOverview;
