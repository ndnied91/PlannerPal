import React, { useContext, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import GlobalContext from '../Calendar/context/GlobalContext';
import customFetch from '../../utils/customFetch';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const SingleItemOverview = ({
  selectedEvent,
  setShowCalModal,
  showCalModal,
}) => {
  const { setSavedEvents } = useContext(GlobalContext);
  const modalRef = useRef(null);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [date, setDate] = useState(new Date(selectedEvent.day).toISOString());
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCalModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowCalModal]);

  useEffect(() => {
    if (showCalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCalModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const calendarEvent = {
      createdBy: selectedEvent.createdBy,
      title,
      description,
      label: selectedLabel,
      day: new Date(date).getTime(),
      _id: selectedEvent._id,
    };

    if (selectedEvent.calCode) {
      try {
        const response = await customFetch.patch(
          `items/update/${selectedEvent.calCode}`,
          calendarEvent
        );
        console.log(response);
      } catch (e) {
        console.log(e);
        toast.error('Error occurred with updating event, please try again');
      }

      setShowCalModal(false);
    }

    try {
      const { data } = await customFetch.patch(
        `cal/${calendarEvent._id}`,
        calendarEvent
      );

      setSavedEvents(data.items);
      toast.success('Event updated!');
    } catch (e) {
      toast.error(e.response.data.msg);
    }

    setShowCalModal(false);
  };

  return (
    <section>
      <div className="fixed left-0 top-0 flex text-left w-screen h-screen justify-center items-center bg-gray-400 bg-opacity-50">
        <div
          ref={modalRef}
          className="bg-white shadow-2xl md:m-0 md:max-w-[38rem] w-max-h-full overflow-y-auto w-screen h-screen md:h-fit "
        >
          <form
            onSubmit={handleSubmit}
            onKeyDown={(event) => {
              event.keyCode === 13 ? handleSubmit(event) : null;
            }}
          >
            <header className="bg-gray-100 px-4 py-2 flex justify-end items-center">
              <div
                onClick={async () => {
                  try {
                    await customFetch.delete(`cal/${selectedEvent._id}`);
                    setShowCalModal(false);
                  } catch (e) {
                    toast.error(
                      e.response.data.msg || 'Error occurred, please try again'
                    );
                  }
                }}
              >
                {' '}
                <FaRegTrashAlt className="cursor-pointer text-2xl text-gray-950" />
              </div>

              <button onClick={() => setShowCalModal(false)}>
                <MdOutlineClose className="cursor-pointer text-3xl text-gray-950" />
              </button>
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
                  className="text-gray-600 text-sm  mb-4 w-full border border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="">
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
                  {!selectedEvent.calCode
                    ? labelsClasses.map((lblClass, i) => (
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
                      ))
                    : ''}
                </div>
              </div>
              <footer className="flex justify-center mt-10 md:mt-0 md:justify-end md:border-t md:pt-4">
                <button
                  type="submit"
                  className="bg-gray-800 hover:opacity-80 duration-200 px-6 py-2 rounded text-white md:w-fit cursor-pointer"
                >
                  Update
                </button>
              </footer>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SingleItemOverview;
