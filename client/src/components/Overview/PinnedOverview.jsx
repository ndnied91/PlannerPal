import React from 'react';

const PinnedOverview = ({ items, setShowModal, setEvent }) => {
  const showEventModal = (i) => {
    setShowModal(true);
    setEvent(i);
  };

  const pinnedItems = () => {
    const priority = items.filter(
      (item) => item.isPinned === true && !item.isCompleted
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
    <section className="p-5 h-96 ">
      <div className="font-bold text-lg w-[20rem]">Pinned Items</div>
      {pinnedItems()}
    </section>
  );
};

export default PinnedOverview;
