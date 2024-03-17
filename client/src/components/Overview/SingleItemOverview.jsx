import { FaTrashAlt, FaRegCheckCircle } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { parseISO } from 'date-fns';

import renderer from '../CountdownTimer';
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../Todo/todoContext';
import Select from '../Todo/Select';

export const SingleItemOverview = ({
  item,
  style,
  setItemsShowModal,
  showItemsModal,
  userSettings,
  setUserSettings,
}) => {
  const { removeItem, updateStatus, updateContent } = useGlobalContext();

  useEffect(() => {
    if (showItemsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showItemsModal]);

  const [task, setTask] = useState({
    title: item.title,
    description: item.description,
  });

  const [category, setCategory] = useState(item.category);

  const updateCategory = (e) => setCategory(e);

  const [date, setDate] = useState(item.dueDate);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      _id: item._id,
      title: task.title,
      description: task.description,
      dueDate: date,
      category,
      calCode: item.calCode,
    };

    updateContent(obj);
    setItemsShowModal(false);
  };

  console.log(date);

  return (
    <div className={style}>
      <form onSubmit={handleSubmit} className="mt-[10%] md:mt-0">
        <section className="text-gray-900">
          <div>
            <div className="font-bold capitalize ">
              <input
                className="cursor-pointer w-full capitalize pt-3 mb-4 text-gray-600 text-sm font-semibold pb-2 border-2 border-gray-200 md:min-w-96 focus:outline-none focus:ring-0 focus:border-blue-500"
                name="title"
                required
                value={task.title}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <DatePicker
              showTimeSelect
              selected={parseISO(date)}
              required
              placeholderText="Due date.."
              className="text-gray-600 text-sm font-semibold pb-3 pt-3 border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(date) => setDate(date.toISOString())}
              dateFormat="MMMM d, yyyy h:mmaa"
              calendarContainer={({ className, children }) => (
                <div className={`custom-calendar-container ${className}`}>
                  {children}
                </div>
              )}
            />

            <Select
              textPrompt={'Select'}
              className="relative mt-14 p-3 w-full text-sm  font-semibold cursor-pointer bg-white border-solid border-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              userSettings={userSettings}
              setUserSettings={setUserSettings}
              updatable={false}
              updateCategory={updateCategory}
              category={category}
            />

            <div className="font-light pt-4 capitalize text-xs text-gray-900">
              <textarea
                className="cursor-pointer pt-3 text-gray-600 text-sm font-semibold pb-2  border-2 border-gray-200 w-full focus:outline-none focus:ring-0 focus:border-blue-500"
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

      <div className="flex flex-col self-end gap-4 absolute right-4">
        <Countdown date={item.dueDate} renderer={renderer} />

        <div className={`flex justify-end w-full items-center`}>
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
              setItemsShowModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleItemOverview;
