import { FaTrashAlt, FaRegCheckCircle, FaFlag } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { parseISO } from 'date-fns';

import renderer from '../CountdownTimer';
import Countdown from 'react-countdown';
import { useState } from 'react';
import { useGlobalContext } from '../Todo/todoContext';

export const SingleItemOverview = ({ item, style, setShowModal }) => {
  const { removeItem, updateStatus, updateContent } = useGlobalContext();

  const [task, setTask] = useState({
    title: item.title,
    description: item.description,
  });

  const [date, setDate] = useState(item.dueDate);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      _id: item._id,
      title: task.title,
      description: task.description,
      dueDate: date,
    };

    updateContent(obj);
    setShowModal(false);
  };

  return (
    <div className={style}>
      <form onSubmit={handleSubmit}>
        <section className="todoInfo text-gray-900 ">
          <div>
            <div className="font-bold capitalize">
              <input
                className="cursor-pointer pt-3 border-0 text-gray-600 text-sm font-semibold pb-2  border-b-2 border-gray-200 !w-60 focus:outline-none focus:ring-0 focus:border-blue-500"
                name="title"
                required
                value={task.title}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <DatePicker
              showTimeSelect
              selected={parseISO(date)}
              onChange={(date) => setDate(date.toISOString())}
              dateFormat="MMMM d, yyyy h:mmaa"
              className="cursor-pointer pt-3 border-0 text-gray-600 text-sm font-semibold pb-2  border-b-2 border-gray-200 !w-60 focus:outline-none focus:ring-0 focus:border-blue-500"
            />

            <div className="font-light pt-4 capitalize text-xs text-gray-900">
              <textarea
                className="cursor-pointer pt-3 text-gray-600 text-sm font-semibold pb-2  border-2 border-gray-200 min-w-60 !w-96  focus:outline-none focus:ring-0 focus:border-blue-500"
                name="description"
                required
                value={task.description}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              type="submit"
              className="bg-gray-600 text-white p-2 text-sm tracking-wider mt-2"
            >
              Update Content
            </button>
          </div>
        </section>
      </form>

      <div className={`flex flex-col self-center gap-4 `}>
        <Countdown date={item.dueDate} renderer={renderer} />

        <div className={`flex justify-end w-full`}>
          <>
            <button
              className={`btn remove-btn }`}
              onClick={() => removeItem(item)}
            >
              <FaTrashAlt className=" text-3xl hover:text-4xl duration-300" />
            </button>
          </>

          <FaRegCheckCircle
            className={`cursor-pointer text-green-600 w-8 h-8 ml-1  mr-1 hover:w-9 hover:h-9  duration-300 ${
              item.isCountDown ? 'hidden' : 'visible'
            }`}
            onClick={() => {
              updateStatus(item);
              setShowModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleItemOverview;
