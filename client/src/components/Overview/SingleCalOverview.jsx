import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import GlobalContext from '../Calendar/context/GlobalContext';
import customFetch from '../../utils/customFetch';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

export const SingleItemOverview = ({ selectedEvent, setShowCalModal }) => {
  const { daySelected } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ''
  );

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

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
    e.preventDefault();

    const calendarEvent = {
      createdBy: selectedEvent.createdBy,
      title,
      description,
      label: selectedLabel,
      day: selectedEvent.day,
      _id: selectedEvent._id,
    };

    if (selectedEvent.calCode) {
      //patch
      try {
        await customFetch.patch(
          `items/update/${selectedEvent.calCode}`,
          calendarEvent
        );
      } catch (e) {
        console.log(e);
        toast.error('Error occurred with updating event, please try again');
      }

      setShowCalModal(false);
    }

    try {
      await customFetch.patch(`cal/${calendarEvent._id}`, calendarEvent);
    } catch (e) {
      toast.error(e.response.data.msg);
    }

    setShowCalModal(false);
  };

  return (
    <div className="h-96 ">
      <div className="w-max fixed left-0 top-0 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            event.keyCode === 13 ? handleSubmit(event) : null;
          }}
          className="w-[38rem] bg-white  shadow-2xl"
        >
          <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
            <span className="material-icons-outlined text-gray-400">
              drag_handle
            </span>
            <div>
              <span
                onClick={async () => {
                  try {
                    const { data } = await customFetch.delete(
                      `cal/${selectedEvent._id}`
                    );

                    setShowCalModal(false);
                  } catch (e) {
                    toast.error(
                      e.response.data.msg || 'Error occurred, please try again'
                    );
                  }
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>

              <button onClick={() => setShowCalModal(false)}>
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
                {!selectedEvent.calCode
                  ? labelsClasses.map((lblClass, i) => (
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
                    ))
                  : ''}
              </div>
            </div>

            <footer className="flex justify-end border-t pt-4">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-blue-600 px-6 py-2 rounded text-white "
              >
                Update
              </button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleItemOverview;
