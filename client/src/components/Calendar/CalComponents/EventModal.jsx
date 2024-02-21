import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import customFetch from '../../../utils/customFetch';
import { toast } from 'react-toastify';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal = ({ userContext }) => {
  const { setShowEventModal, daySelected, selectedEvent, setSavedEvents } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const [isCalCode, setIsCalCode] = useState(true);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        handleSubmit(event);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const handleSubmit = async (e) => {
    if (title.length === 0) return;

    e.preventDefault();
    const calendarEvent = {
      createdBy: userContext._id,
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      _id: selectedEvent ? selectedEvent._id : null,
    };

    if (selectedEvent && isCalCode) {
      //patch
      await customFetch.patch(
        `items/update/${selectedEvent.calCode}`,
        calendarEvent
      );
      setShowEventModal(false);
    }

    if (selectedEvent) {
      //dont todo as well
      const { data } = await customFetch.patch(
        `cal/${calendarEvent._id}`,
        calendarEvent
      );

      setSavedEvents([...data.items]);
      setShowEventModal(false);
    } else {
      //create
      // if its a new event
      try {
        const { data } = await customFetch.post('cal', calendarEvent);
        setSavedEvents([...data.items]);
        setShowEventModal(false);
      } catch (e) {
        toast.error(e.response.data.msg || 'Demo Only!');
      }
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        onKeyDown={(event) => {
          event.keyCode === 13 ? handleSubmit(event) : null;
        }}
        className="bg-white rounded-lg shadow-2xl w-1/4 "
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={async () => {
                  const { data } = await customFetch.delete(
                    `cal/${selectedEvent._id}`
                  );

                  setSavedEvents([...data.items]);
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3 customMax">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format('dddd, MMMM DD')}</p>
            <span className="material-icons-outlined text-gray-400 ">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400 mb-3">
              bookmark_border
            </span>
            <div className="flex gap-x-2 mb-3">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* checkbox for calCode */}
          {selectedEvent?.calCode ? (
            <div className="p-1 mt-2 mb-2">
              <input
                type="checkbox"
                name="calCode"
                checked={isCalCode}
                className="text-gray-600 border-gray-200 "
                onChange={(e) => setIsCalCode(!isCalCode)}
              />
              <span className="ml-3 ">Update todo</span>
            </div>
          ) : null}

          <footer className="flex justify-end border-t pt-4">
            <button
              type="submit"
              // onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white "
            >
              Save
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
};

export default EventModal;
