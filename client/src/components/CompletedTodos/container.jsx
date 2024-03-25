import React from 'react';
import SingleItem from '../Todo/SingleItem';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const container = ({ items, userSettings, setItems, isDarkTheme }) => {
  const deleteAll = async () => {
    const filter = items.filter((item) => item.isCompleted);
    updateDeleted(filter);
  };

  const deletePastDue = async () => {
    const isoDateString = new Date(Date.now()).toISOString();

    const filter = items.filter(
      (item) =>
        new Date(item.dueDate).toISOString() < isoDateString && item.isCompleted
    );
    updateDeleted(filter);
  };

  const updateDeleted = async (filter) => {
    const deleteItems = filter.map((obj) => obj._id);

    try {
      const { data } = await customFetch.post('/items/deleteMany/delete', {
        ids: deleteItems,
      });

      setItems(data.items);
      toast.success(data.message);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.msg);
    }
  };

  return (
    <section className="pr-2 pl-2">
      <div>
        <p
          className={` ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-900'
          } text-center w-full font-semibold text-lg `}
        >
          Items will automatically delete in {userSettings.deleteTime / 24} days
        </p>

        <div className="flex justify-center gap-10 mt-6">
          <div
            className="border-red-500 border-2 p-2 rounded-md text-red-500 tracking-wide cursor-pointer shadow-lg hover:shadow-md hover:duration-300"
            onClick={deleteAll}
          >
            {' '}
            Delete all
          </div>
          <div
            className="border-red-500 border-2 p-2 rounded-md text-red-500 tracking-wide cursor-pointer shadow-lg hover:shadow-md hover:duration-300"
            onClick={deletePastDue}
          >
            {' '}
            Delete past due
          </div>
        </div>
        <p className="text-center mt-10 text-sm">
          Click arrow to bring it back to main todos
        </p>
      </div>

      <div className="flex justify-center gap-1 flex-wrap mt-5 md:mt-20 md:ml-32 md:mr-32">
        {items.map((item) => {
          if (item.isCompleted) {
            return (
              <div
                className="hover:scale-[1.05] hover:-translate-y-4 duration-300"
                key={item._id}
              >
                <SingleItem
                  item={item}
                  archivedList
                  style={`${
                    isDarkTheme ? 'bg-neutral-600 text-slate-50' : ''
                  } p-5 rounded-md shadow-2xl m-2 w-40 md:max-w-56 md:min-w-48 md:min-h-44 md:max-h-48 opacity-70 hover:opacity-100 duration-300`}
                  type={'trash'}
                />
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default container;
