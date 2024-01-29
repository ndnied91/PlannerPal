import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormModal = ({ sendToServer, setShowModal }) => {
  const [date, setDate] = useState('');

  const [currentItem, setCurrentItem] = useState({
    currentTitle: 'Title testing',
    description: 'desc',
    isAddedToCal: true,
    isPriority: false,
  });

  const [currentPane, setCurrentPane] = useState('todo');

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentItem.isAddedToCal) {
      currentItem['day'] = dayjs(date).valueOf();
      currentItem['label'] = 'red';
      currentItem['calCode'] = Math.random().toString(36).substr(2, 10);
    }
    currentItem['dueDate'] = date;

    if (currentItem.isAddedToCal && date.length === 0) {
      toast.error('Date must be selected!');
    } else {
      sendToServer(currentItem, currentPane);
    }
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-slate-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl self-center">
            <div className="font-bold text-4xl p-4 border-b border-x-slate-300 flex justify-between items-center">
              {currentPane === 'todo' ? (
                <p>Add Todo </p>
              ) : (
                <p>Add Countdown </p>
              )}

              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="text-red-700 max-w-fit rounded-md px-3 py-2 text-sm font-semibold hover:scale-110 duration-300"
              >
                <ImCross className="text-2xl" />
              </button>
            </div>

            <section className="flex justify-around capitalize">
              <div
                onClick={() => setCurrentPane('todo')}
                className={`${
                  currentPane === 'todo'
                    ? 'bg-slate-200 font-bold '
                    : 'bg-slate-400 '
                } w-1/2 h-10 text-center flex justify-center items-center cursor-pointer hover:opacity-90 duration-300`}
              >
                {' '}
                todo
              </div>
              <div
                className={`${
                  currentPane === 'countdown'
                    ? 'bg-slate-200 font-bold '
                    : 'bg-slate-400'
                } w-1/2 h-10 text-center flex justify-center items-center cursor-pointer hover:opacity-90 duration-300`}
                onClick={() => setCurrentPane('countdown')}
              >
                {' '}
                countdown
              </div>
            </section>

            <div className="bg-slate-200 100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div className="align-center ">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-md tracking-wide font-bold mb-2 "
                            htmlFor="currentTitle"
                          >
                            Title
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                            id="currentTitle"
                            type="text"
                            name="currentTitle"
                            maxLength="20"
                            value={currentItem.currentTitle}
                            placeholder="Title"
                            required
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                        {/* description */}
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-md tracking-wide font-bold mb-2 "
                            htmlFor=""
                          >
                            Description
                          </label>
                          <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            type="textarea"
                            name="description"
                            placeholder="Description"
                            required
                            value={currentItem.description}
                            onChange={handleChange}
                          />
                        </div>
                        {/* time */}
                        <label className="block text-gray-700 text-md tracking-wide font-bold mb-2 ">
                          Due date
                        </label>

                        <DatePicker
                          showTimeSelect
                          selected={date}
                          placeholderText="Select a date.."
                          className="cursor-pointer mb-3"
                          onChange={(date) => setDate(date)}
                          dateFormat="MMMM d, yyyy h:mmaa"
                        />

                        {/* cal */}
                        {currentPane === 'todo' ? (
                          <div className="pb-5 items-baseline block">
                            <label
                              className=" text-gray-700 text-sm font-bold pr-2 "
                              htmlFor="isAddedToCal"
                            >
                              Add to Cal?
                            </label>
                            <input
                              className="bg-white"
                              type="checkbox"
                              name="isAddedToCal"
                              checked={currentItem.isAddedToCal}
                              onChange={handleCheckboxChange}
                            />
                          </div>
                        ) : (
                          <div className="pb-5">
                            <input className="invisible" type="checkbox" />
                          </div>
                        )}

                        {currentPane === 'todo' ? (
                          <div className="pb-2">
                            <label
                              className=" text-gray-700 text-sm font-bold pr-2 "
                              htmlFor="isAddedToCal"
                            >
                              Add to Priority?
                            </label>
                            <input
                              className=""
                              type="checkbox"
                              name="isPriority"
                              checked={currentItem.isPriority}
                              onChange={handleCheckboxChange}
                            />
                          </div>
                        ) : (
                          <div className="pb-2">
                            <input className="invisible" type="checkbox" />
                          </div>
                        )}

                        <div className="flex justify-center">
                          <button
                            className="block w-96 text-blue-500 text-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
                            type="submit"
                          >
                            {currentPane === 'todo'
                              ? 'Create Todo'
                              : 'Create Countdown'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
