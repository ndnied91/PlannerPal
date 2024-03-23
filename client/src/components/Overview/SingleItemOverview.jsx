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
  isDarkTheme,
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
            <div htmlFor="title" className="text-sm font-bold text-gray-400">
              Title
            </div>
            <div className="font-bold capitalize">
              <input
                className={` ${
                  isDarkTheme
                    ? 'text-slate-50 border-none bg-neutral-700'
                    : 'text-gray-600 border-gray-200'
                } pl-3 cursor-pointer rounded-sm w-full capitalize pt-2 text-sm font-semibold pb-2 border md:min-w-96 `}
                name="title"
                required
                value={task.title}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div
              htmlFor="title"
              className={`${
                isDarkTheme ? 'text-slate-200' : 'text-gray-400'
              } text-sm font-bold mt-4 `}
            >
              Due Date
            </div>
            <DatePicker
              showTimeSelect
              selected={parseISO(date)}
              required
              placeholderText="Due date.."
              onChange={(date) => setDate(date.toISOString())}
              dateFormat="MMMM d, yyyy h:mmaa"
              className={`${
                isDarkTheme
                  ? 'bg-neutral-700 text-slate-50'
                  : 'text-gray-600 border-gray-200 border'
              } rounded-sm cursor-pointer text-sm font-semibold pb-3 pt-3 pl-3`}
              calendarContainer={({ className, children }) => (
                <div className={`custom-calendar-container ${className}`}>
                  {children}
                </div>
              )}
            />

            <div className="mt-12">
              <Select
                textPrompt={'Select'}
                className={`${
                  isDarkTheme ? 'bg-neutral-700' : 'border-gray-200 border'
                } relative p-3 text-sm font-semibold cursor-pointer`}
                userSettings={userSettings}
                setUserSettings={setUserSettings}
                updatable={false}
                updateCategory={updateCategory}
                category={category}
                isDarkTheme={isDarkTheme}
              />
            </div>

            <div
              htmlFor="title"
              className="text-sm font-bold mt-4 text-gray-400"
            >
              Description
            </div>
            <div className="font-light capitalize text-xs text-gray-900">
              <textarea
                className={` ${
                  isDarkTheme
                    ? 'text-slate-50 border-none bg-neutral-700'
                    : 'text-gray-600 border-gray-200'
                } pl-3 cursor-pointer rounded-sm w-full capitalize pt-3 mb-2 text-sm font-semibold pb-2 border md:min-w-96 `}
                name="description"
                required
                value={task.description}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button
              type="submit"
              className={` ${
                isDarkTheme
                  ? 'bg-neutral-400 text-slate-50'
                  : 'bg-gray-800 text-white'
              } hover:opacity-80 duration-200 px-6 py-2 rounded w-full tracking-wider md:tracking-normal ml-2 mr-2 flex justify-center md:ml-0 md:mr-0 md:w-fit cursor-pointer`}
            >
              Update
            </button>
          </div>
        </section>
      </form>

      <div className="flex flex-col self-end gap-4 absolute right-4">
        <Countdown
          date={item.dueDate}
          renderer={renderer}
          isDarkTheme={isDarkTheme}
        />

        <div className={`flex justify-end w-full items-center`}>
          <>
            <button
              className={`btn remove-btn }`}
              onClick={() => removeItem(item)}
            >
              <FaTrashAlt
                className={`${
                  isDarkTheme
                    ? 'text-slate-100 bg-neutral-900'
                    : 'text-gray-950 bg-white'
                } text-3xl  hover:text-4xl duration-300 `}
              />
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
