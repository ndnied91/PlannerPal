import { useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormModal = ({ sendToServer, setShowModal }) => {
  const [date, setDate] = useState('');
  const [currentItem, setCurrentItem] = useState({
    currentTitle: 'Title testing',
    description: 'desc',
    isAddedToCal: true,
  });

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setCurrentItem({ ...currentItem, isAddedToCal: e.target.checked });
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
      sendToServer(currentItem);
    }
  };

  return (
    <div className="relative z-10" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-slate-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl self-center">
            <div className="font-bold text-4xl p-4 border-b border-x-slate-300 flex justify-between items-center">
              <p>Add Task </p>
              <div className="">
                {/* <div className="flex place-items-center"></div> */}
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-red-700 max-w-fit rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
                >
                  Close
                </button>
              </div>
            </div>

            <div className="bg-slate-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div className="align-center outline-none">
                      <form onSubmit={handleSubmit}>
                        {/* title */}
                        <div className="mb-4 ">
                          <label
                            className="block text-gray-700 text-md tracking-wide font-bold mb-2 "
                            htmlFor="currentTitle"
                          >
                            Title
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
                            id="currentTitle"
                            type="text"
                            name="currentTitle"
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
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-none"
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
                        <label
                          className="block text-gray-700 text-md tracking-wide font-bold mb-2 "
                          htmlFor=""
                        >
                          Due date
                        </label>

                        <DatePicker
                          showTimeSelect
                          selected={date}
                          placeholderText="Select a date.."
                          className="cursor-pointer border-none"
                          onChange={(date) => setDate(date)}
                          dateFormat="MMMM d, yyyy h:mmaa"
                        />

                        {/* cal */}
                        <div className="mb-4 flex items-baseline" id="asdas">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 "
                            htmlFor="isAddedToCal"
                          >
                            Add to Cal?
                          </label>
                          <input
                            className="bg-slate-200 mt-4 ml-1 "
                            type="checkbox"
                            checked={currentItem.isAddedToCal}
                            onChange={handleCheckboxChange}
                          />
                        </div>

                        <div className="flex justify-center">
                          <button
                            className="block w-96 text-blue-500 text-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 "
                            type="submit"
                          >
                            Create Todo
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
