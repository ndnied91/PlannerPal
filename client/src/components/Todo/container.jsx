import { useGlobalContext } from './todoContext';
import SingleItem from './SingleItem';
import { useEffect, useRef, useState } from 'react';
// import Select from 'react-dropdown-select';
import Form from './Form';
import CompletedTodos from '../CompletedTodos/container.jsx';
import customFetch from '../../utils/customFetch.js';
import { TbSortDescending } from 'react-icons/tb';
import { FcNumericalSorting12 } from 'react-icons/fc';
import { FaArchive } from 'react-icons/fa';
import { LuListTodo } from 'react-icons/lu';
import FilterPopover from './FilterPopover.jsx';

import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from 'react-icons/fc';
import FilterSelect from './FilterSelect.jsx';

import Container from './Select/Container.jsx';

const MainContainer = ({ userContext, userSettings, setUserSettings }) => {
  console.log('notes container loaded..');
  const { items, setItems, filteredBy, setFilteredBy } = useGlobalContext();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortOptions, setSortOptions] = useState();
  const [addNewFilter, setAddNewFilter] = useState(false);

  useEffect(() => {
    setSortOptions(userSettings.sortBy);
  }, [userSettings]);

  const renderTitle = () => {
    const even = (element) => element.isPriority === true;
    return items.some(even);
  };

  const showDropdown = () => {
    const options = ['Due date', 'A-Z', 'Z-A'];

    return (
      <Container
        placeholderText={'Select an urgency'}
        list={options}
        setValue={updateSortFilter}
        defaultValue={sortOptions}
        className="text-sm font-normal"
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
        if (
          !item.isPriority &&
          !item.isCompleted &&
          !item.isCountDown &&
          !item.isPinned
        ) {
          return (
            <div className="pt-4 " key={item._id}>
              <SingleItem
                item={item}
                style={'flex items-center p-5 bg-white rounded-md shadow-2xl'}
                userSettings={userSettings}
                userContext={userContext}
                setUserSettings={setUserSettings}
              />
            </div>
          );
        }
      });
    } else {
      return items.map((item) => {
        if (
          item.isPriority &&
          !item.isCompleted &&
          !item.isCountDown &&
          !item.isPinned
        ) {
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

  const renderCountdown = () => {
    const filter = items
      .filter((item) => item.isCountDown && !item.isPinned)
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

    return filter.map((item) => {
      return (
        <div className="pt-4" key={item._id}>
          <SingleItem
            item={item}
            style={'flex items-center p-5 bg-white rounded-md shadow-2xl '}
            type={'countdown'}
          />
        </div>
      );
    });
  };

  const renderIcon = () => {
    if (sortOptions === 'Z-A') {
      return (
        <FcAlphabeticalSortingZa className="transform text-2xl cursor-pointer" />
      );
    } else if (sortOptions === 'A-Z') {
      return (
        <FcAlphabeticalSortingAz className="transform text-2xl cursor-pointer" />
      );
    } else if (sortOptions === 'Due date') {
      return (
        <FcNumericalSorting12 className="transform text-2xl cursor-pointer" />
      );
    } else {
      <TbSortDescending className="transform scale-x-[-1] text-2xl cursor-pointer" />;
    }
  };

  const renderPinned = (filter) => {
    let filtered = [];

    if (filter === 'countdown') {
      filtered = items.filter(
        (item) => item.isPinned && item.isCountDown && !item.isCompleted
      );
    } else {
      filtered = items.filter(
        (item) =>
          item.isPinned &&
          !item.isCountDown &&
          !item.isCompleted &&
          (filter === 'normal' ? !item.isPriority : item.isPriority)
      );
    }

    if (filtered.length > 0) {
      return filtered.map((result) => {
        return (
          <div className="pt-4" key={result._id}>
            <SingleItem
              item={result}
              style={`flex items-center p-5 bg-white rounded-md shadow-2xl`}
              userSettings={userSettings}
            />
          </div>
        );
      });
    }
  };

  const filterItems = async (value) => {
    if (value === 'add +') {
      setAddNewFilter(true);
    } else {
      setFilteredBy(value);
      setAddNewFilter(false);
      try {
        const { data } = await customFetch.get(`/items/filter/${value}`, {
          filter: value,
        });
        setItems(data.items);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section className="pr-2 pt-5">
      <div className="flex w-full justify-end">
        <div className="w-screen text-center font-bold text-2xl tracking-wider">
          {showCompleted ? 'Archived Items' : 'Current Items'}
        </div>

        <div className="flex ml-40 items-end ">
          <FilterSelect
            updatable={true}
            userSettings={userSettings}
            filterItems={filterItems}
            setUserSettings={setUserSettings}
            userContext={userContext}
            setFilteredBy={setFilteredBy}
          />
          <div
            className={`pl-2 ${
              addNewFilter ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <FilterPopover
              setAddNewFilter={setAddNewFilter}
              userSettings={userSettings}
              userContext={userContext}
              setUserSettings={setUserSettings}
            />
          </div>
        </div>

        <div
          className="bg-black text-white tracking-wider rounded-lg self-center	p-3 cursor-pointer"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? <LuListTodo /> : <FaArchive />}
        </div>
      </div>

      {showCompleted ? (
        <CompletedTodos
          items={items}
          setItems={setItems}
          userSettings={userSettings}
        />
      ) : (
        <>
          {/*  */}
          <div className="flex justify-center gap-20 mt-2">
            <section className="pb-10 flex justify-center flex-col items-center ">
              <div className="flex gap-4">
                <div className="bg-zinc-100 rounded-xl pt-3">
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5">
                    {renderTitle() ? 'High Priority List' : null}
                  </div>
                  <div className="pb-10 bg-zinc-100 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl w-[28rem]">
                    <div className="mb-6">{renderPinned()}</div>
                    <div>{renderSortedArray()}</div>
                  </div>
                </div>
                {/* normal list */}

                <div className="bg-zinc-100 rounded-xl pt-3">
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5">
                    <div>
                      <span>Normal List</span>
                      <p className="text-xs text-gray-500">
                        {' '}
                        Filtered by:{' '}
                        <span className="capitalize">{filteredBy}</span>
                      </p>
                    </div>

                    {/* sort by */}
                    <section className="flex gap-2 items-center">
                      <div
                        className={`duration-300 ${
                          showSortModal ? 'opacity-100' : 'opacity-0 '
                        }`}
                      >
                        {showDropdown()}
                      </div>
                      <div onClick={() => setShowSortModal(!showSortModal)}>
                        {renderIcon()}
                      </div>
                    </section>
                  </div>

                  <div className="pb-10 bg-zinc-100 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl w-[28rem]">
                    <div className="mb-6">{renderPinned('normal')}</div>
                    {sortOptions ? renderSortedArray('normal') : null}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="bg-slate-200 rounded-xl pt-3 h-fit">
                <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5">
                  <span>Background Countdowns</span>
                  <span className="w-max flex items-center">
                    <FcNumericalSorting12 className="text-2xl mb-3" />
                  </span>
                </div>
                <div className="pb-10 bg-slate-200 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl w-[28rem] ">
                  <div className="mb-6">{renderPinned('countdown')}</div>
                  {renderCountdown()}
                </div>
              </div>
            </section>
          </div>

          <Form
            style={`cursor-pointer text-center text-xl bg-black tracking-wider text-white p-4 w-[24rem] rounded-lg hover:text-red-300 duration-300`}
            text={'Add item'}
            userSettings={userSettings}
            setUserSettings={setUserSettings}
          />
        </>
      )}
    </section>
  );
};

export default MainContainer;
