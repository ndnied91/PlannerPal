import Form from './Form';

import { useGlobalContext } from './todoContext';

import SingleItem from './SingleItem';
import { useEffect, useState } from 'react';

import Select from 'react-dropdown-select';
import { FaSortAmountDown } from 'react-icons/fa';
import CompletedTodos from '../CompletedTodos/container.jsx';
import customFetch from '../../utils/customFetch.js';

const Container = ({ userContext, userSettings }) => {
  const { items, setItems } = useGlobalContext();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortOptions, setSortOptions] = useState();

  useEffect(() => {
    setSortOptions(userSettings.sortBy);
  }, [userSettings, items]);

  const renderTitle = () => {
    const even = (element) => element.isPriority === true;
    return items.some(even);
  };

  const showDropdown = () => {
    const options = [
      {
        value: 1,
        label: 'Due date',
      },
      {
        value: 2,
        label: 'A-Z',
      },
      {
        value: 3,
        label: 'Z-A',
      },
    ];

    return (
      <Select
        options={options}
        onChange={(e) => updateSortFilter(e[0].label)}
        value={sortOptions}
        placeholder="Select "
      />
    );
  };

  const updateSortFilter = async (sortBy) => {
    setSortOptions(sortBy);
    const { data } = await customFetch.post(`/settings/${userContext._id}`, {
      sortBy,
    });
    setItems(data.sortedOrder);
  };

  useEffect(() => {
    const setOrder = async () => {
      const { data } = await customFetch.post(`/settings/${userContext._id}`, {
        sortBy: userSettings.sortBy,
      });
      setItems(data.sortedOrder);
    };

    setOrder();
  }, []);

  const renderSortedArray = (text) => {
    if (text === 'normal') {
      return items.map((item) => {
        if (!item.isPriority && !item.isCompleted) {
          return (
            <div className="pt-4 " key={item._id}>
              <SingleItem
                item={item}
                style={'flex items-center p-5 bg-white rounded-md shadow-2xl'}
              />
            </div>
          );
        }
      });
    } else {
      return items.map((item) => {
        if (item.isPriority && !item.isCompleted) {
          return (
            <div className="pt-4" key={item._id}>
              <SingleItem
                item={item}
                style={'flex items-center p-5 bg-white rounded-md shadow-2xl'}
              />
            </div>
          );
        }
      });
    }
  };

  return (
    <section className="">
      <div className="flex gap-2 justify-around w-full">
        <section className="flex gap-2 items-center">
          <div
            className="bg-black text-white p-3 cursor-pointer w-fit h-fit rounded-md"
            onClick={() => setShowSortModal(!showSortModal)}
          >
            <FaSortAmountDown />
          </div>

          <div
            className={`w-48 duration-300 ${
              showSortModal ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {showDropdown()}
          </div>
        </section>
        <div
          className="bg-black text-white tracking-wider rounded-lg self-center	p-3 cursor-pointer"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? 'View Current Todos' : 'Show Completed'}
        </div>
      </div>

      {showCompleted ? (
        <CompletedTodos
          // className="bg-red-400"
          items={items}
          userSettings={userSettings}
        />
      ) : (
        <>
          <div className="text-center font-bold mb-2">
            Sorted by: {sortOptions}
          </div>
          {/*  */}
          <div className="flex justify-center gap-20">
            <section className="pb-10 flex justify-center flex-col items-center ">
              <div className="flex gap-4">
                <div className="bg-zinc-100 rounded-xl pt-3">
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5">
                    {renderTitle() ? 'High Priority List' : null}
                    {/* <span className="text-sm font-normal tracking-normal bg-black text-white p-1 w-7 text-center rounded-md cursor-pointer ">
                      <FaSortAmountDown />
                    </span> */}
                  </div>
                  <div className="pb-10 bg-zinc-100 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl w-[28rem] ">
                    <div>{renderSortedArray()}</div>
                  </div>
                </div>
                {/* normal list */}

                <div className="bg-zinc-100 rounded-xl pt-3">
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5">
                    <span>Normal List</span>
                    {/* <span className="text-sm font-normal tracking-normal bg-black text-white p-1 w-7 text-center rounded-md cursor-pointer">
                      <FaSortAmountDown />
                    </span> */}
                  </div>
                  <div className="pb-10 bg-zinc-100 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl w-[28rem] ">
                    {sortOptions ? renderSortedArray('normal') : null}
                  </div>
                </div>
              </div>
              <div>
                <Form
                  style={`cursor-pointer text-center mt-6 text-lg bg-black tracking-wider text-white p-4 w-[32rem] rounded-lg`}
                  text={'Add item'}
                />
              </div>
              {/* </div> */}
            </section>

            <section>
              <div className="bg-zinc-100 rounded-xl pt-3 h-fit">
                <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5">
                  <span>Background Countdowns</span>
                  {/* <span className="text-sm font-normal tracking-normal bg-black text-white p-1 w-7 text-center rounded-md cursor-pointer">
                    <FaSortAmountDown />
                  </span> */}
                </div>
                <div className="pb-10 bg-zinc-100 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl w-[28rem] ">
                  <div className="">
                    {sortOptions ? renderSortedArray('normal') : null}
                  </div>
                </div>
              </div>
              <Form
                style={`cursor-pointer text-center mt-6 text-lg bg-black tracking-wider text-white p-4 w-[20rem] rounded-lg `}
                text={'Add to countdowns'}
              />
            </section>
          </div>
        </>
      )}
    </section>
  );
};

export default Container;
