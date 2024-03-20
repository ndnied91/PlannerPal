import React, { useContext, useEffect, useState, useRef } from 'react';
import GlobalContext from '../context/GlobalContext';
import customFetch from '../../../utils/customFetch';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal = ({ userContext }) => {
  const {
    setShowEventModal,
    showEventModal,
    selectedEvent,
    setSavedEvents,
    daySelected,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [date, setDate] = useState(
    selectedEvent ? new Date(selectedEvent?.day).toISOString() : daySelected
  );

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const [isCalCode, setIsCalCode] = useState(true);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowEventModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowEventModal]);

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

  useEffect(() => {
    if (showEventModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEventModal]);

  const handleSubmit = async (e) => {
    if (title.length === 0) return;

    e.preventDefault();
    const calendarEvent = {
      createdBy: userContext._id,
      title,
      description,
      label: selectedLabel,
      day: new Date(date).getTime(),
      _id: selectedEvent ? selectedEvent._id : null,
    };

    if (selectedEvent && isCalCode) {
      //patch
      try {
        await customFetch.patch(
          `items/update/${selectedEvent.calCode}`,
          calendarEvent
        );
        setShowEventModal(false);
      } catch (e) {
        toast.error('Error occurred, please try again');
      }
    }

    if (selectedEvent) {
      //dont todo as well
      try {
        const { data } = await customFetch.patch(
          `cal/${calendarEvent._id}`,
          calendarEvent
        );
        setSavedEvents([...data.items]);
        setShowEventModal(false);
      } catch (e) {
        toast.error('Error occurred, please try again');
      }
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
    <section>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-80 transition-opacity z-10"></div>
      <div className="h-screen w-screen fixed left-0 top-0 flex justify-center items-center z-20 ">
        <div
          ref={modalRef}
          className="bg-white h-screen md:h-fit md:shadow-2xl w-full max-w-screen-md md:m-2"
        >
          <form
            onSubmit={handleSubmit}
            onKeyDown={(event) => {
              event.keyCode === 13 ? handleSubmit(event) : null;
            }}
            className="bg-white rounded-lg md:shadow-2xl"
          >
            <header className="bg-gray-100 px-2 py-2 flex justify-end items-center ">
              <div className="flex items-center">
                {selectedEvent && (
                  <span
                    onClick={async () => {
                      try {
                        const { data } = await customFetch.delete(
                          `cal/${selectedEvent._id}`
                        );

                        setSavedEvents([...data.items]);
                        setShowEventModal(false);
                      } catch (e) {
                        toast.error('Error occurred, please try again');
                      }
                    }}
                    className="material-icons-outlined text-gray-400 cursor-pointer"
                  >
                    <FaRegTrashAlt className="cursor-pointer text-2xl text-gray-950 " />
                  </span>
                )}
                <button onClick={() => setShowEventModal(false)}>
                  <MdOutlineClose className="cursor-pointer text-3xl text-gray-950 " />
                </button>
              </div>
            </header>
            <div className="p-3 mt-[10%] md:mt-0">
              <div className="flex flex-col items-start">
                <div
                  htmlFor="title"
                  className="text-sm font-bold text-gray-400"
                >
                  Title
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Add title"
                  value={title}
                  required
                  className="text-gray-600 text-sm mb-4 w-full border border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  onChange={(e) => setTitle(e.target.value)}
                />

                <div>
                  <div
                    htmlFor="title"
                    className="text-sm font-bold text-gray-400"
                  >
                    Due Date
                  </div>
                  <DatePicker
                    showTimeSelect
                    selected={new Date(date)}
                    onChange={(date) => setDate(date.toISOString())}
                    dateFormat="MMMM d, yyyy h:mmaa"
                    className="text-gray-600 cursor-pointer text-sm border border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    calendarContainer={({ className, children }) => (
                      <div className={`custom-calendar-container ${className}`}>
                        {children}
                      </div>
                    )}
                  />
                </div>

                <div
                  htmlFor="title"
                  className="text-sm font-bold text-gray-400 mt-3"
                >
                  Description
                </div>
                <input
                  type="text"
                  name="description"
                  placeholder="Add a description"
                  value={description}
                  className="text-gray-600 w-full border border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex gap-x-2 mb-3 mt-3">
                  <div
                    htmlFor="title"
                    className="text-sm font-bold text-gray-400 mt-3"
                  >
                    Label
                  </div>
                  {labelsClasses.map((lblClass, i) => (
                    <span
                      key={i}
                      onClick={() => setSelectedLabel(lblClass)}
                      className={`bg-${lblClass}-500 w-6 h-6 mt-3 rounded-full flex items-center justify-center cursor-pointer`}
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
                  className="bg-gray-800 hover:opacity-80 duration-200 px-6 py-2 rounded text-white md:w-fit cursor-pointer"
                >
                  Save
                </button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventModal;
