import { useGlobalContext } from './todoContext';
import SingleItem from './SingleItem';
import { useEffect, useRef, useState } from 'react';
import Form from './Form';
import CompletedTodos from '../CompletedTodos/container.jsx';
import customFetch from '../../utils/customFetch.js';
import { TbSortDescending } from 'react-icons/tb';
import { FcNumericalSorting12 } from 'react-icons/fc';
import { FaArchive } from 'react-icons/fa';
import { LuListTodo } from 'react-icons/lu';
import FilterPopover from './FilterPopover.jsx';
import OutsideClickHandler from 'react-outside-click-handler';

import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from 'react-icons/fc';
import FilterSelect from './FilterSelect.jsx';

import Container from './Select/Container.jsx';

const MainContainer = ({ userSettings, setUserSettings }) => {
  const {
    items,
    setItems,
    filteredBy,
    userContext,
    setFilteredBy,
    updateSortedItems,
  } = useGlobalContext();

  const [showCompleted, setShowCompleted] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortOptions, setSortOptions] = useState();
  const [addNewFilter, setAddNewFilter] = useState(false);

  const updateItemsAfterEditTodo = async () => {
    updateSortedItems(
      userContext._id,
      userSettings.sortBy,
      userSettings.currentFilterOption
    );
  };

  useEffect(() => {
    setSortOptions(userSettings.sortBy);
  }, [userSettings]);

  const renderTitle = () => {
    const even = (element) => element.isPriority && !element.isCompleted;

    return items.some(even);
  };

  const isCountDown = () => {
    const countdown = (element) => element.isCountDown === true;
    return items.some(countdown);
  };

  const showDropdown = () => {
    const options = ['Due date', 'A-Z', 'Z-A'];

    return (
      <Container
        placeholderText={''}
        list={options}
        setValue={updateSortFilter}
        defaultValue={sortOptions}
        className="text-sm font-normal"
        setShowSortModal={setShowSortModal}
      />
    );
  };

  const updateSortFilter = async (sortBy) => {
    setSortOptions(sortBy);
    const { data } = await customFetch.post(`/settings/${userContext._id}`, {
      sortBy,
    });

    console.log(data);
    setUserSettings(data.settings);
  };

  useEffect(() => {
    const setOrder = async () => {
      const { data } = await customFetch.post(
        `items/filter/${userSettings?.currentFilterOption}`,
        {
          sortBy: userSettings.sortBy,
        }
      );
      setItems(data.items);
    };

    setOrder();
  }, [userSettings]);

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
            <div className="pt-4" key={item._id}>
              <SingleItem
                item={item}
                style={'flex items-center p-5 bg-white rounded-md shadow-2xl'}
                userSettings={userSettings}
                setUserSettings={setUserSettings}
                updateItemsAfterEditTodo={updateItemsAfterEditTodo}
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
                userSettings={userSettings}
                updateItemsAfterEditTodo={updateItemsAfterEditTodo}
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
            userSettings={userSettings}
            updateItemsAfterEditTodo={updateItemsAfterEditTodo}
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
              updateItemsAfterEditTodo={updateItemsAfterEditTodo}
            />
          </div>
        );
      });
    }
  };

  const filterItems = async (value, sortBy) => {
    // await customFetch.post(`/settings/${userContext._id}`, {
    //   sortBy,
    //   currentFilterOption,
    // });

    // TODO extract to todoContext
    if (value === 'add +') {
      setAddNewFilter(true); //pop input field to add new filter
    } else {
      setFilteredBy(value);
      setAddNewFilter(false);
      try {
        const { data } = await customFetch.post(`/items/filter/${value}`, {
          filter: value,
          sortBy,
        });
        setItems(data.items);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section className="pr-2 pt-5">
      <div className="flex mb-5">
        <div className="w-[100%] flex justify-items-start pl-28 text-center font-bold text-3xl tracking-wider">
          {showCompleted ? 'Archived Items' : 'Current Items'}
        </div>

        <div className="flex items-end">
          {!addNewFilter && (
            <FilterSelect
              className="relative p-2 cursor-pointer bg-gray-100 border-solid rounded-md"
              textPrompt={'Filter'}
              showFilterIcon={true}
              updatable={true}
              userSettings={userSettings}
              filterItems={filterItems}
              setUserSettings={setUserSettings}
              setFilteredBy={setFilteredBy}
              category={userSettings.currentFilterOption}
            />
          )}

          <div
            className={`pl-2 ${
              addNewFilter ? 'opacity-100' : 'opacity-0 hidden'
            }`}
          >
            <OutsideClickHandler
              onOutsideClick={() => {
                setAddNewFilter(false);
              }}
            >
              <FilterPopover
                setAddNewFilter={setAddNewFilter}
                userSettings={userSettings}
                setUserSettings={setUserSettings}
              />
            </OutsideClickHandler>
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
          <div className="flex justify-normal ml-28 gap-4 mr-10">
            <section className="flex justify-center items-center flex-auto">
              <div className="flex gap-4 grow lg:self-stretch">
                {/* normal list */}
                <div className="pb-5 bg-zinc-100 rounded-xl pt-3 grow">
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-3 ">
                    <div>
                      <span>Normal List</span>
                      <p className="text-xs text-gray-500 pb-5">
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
                      <div
                        className="hover:scale-110 duration-300"
                        onClick={() => setShowSortModal(!showSortModal)}
                      >
                        {renderIcon()}
                      </div>
                    </section>
                  </div>
                  <div className="pb-5 bg-zinc-100 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl">
                    <div>{renderPinned('normal')}</div>
                    {sortOptions ? renderSortedArray('normal') : null}
                  </div>
                </div>
                <div className="bg-zinc-100 rounded-xl pt-3 h-full grow">
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5 mb-5">
                    {renderTitle() ? (
                      'High Priority List'
                    ) : (
                      <div className="flex justify-center w-full h-full items-center mt-1/2">
                        No items currently in Priority{' '}
                      </div>
                    )}
                  </div>
                  <div className="pt-5 pb-5 bg-zinc-100 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl">
                    <div>{renderPinned()}</div>
                    <div>{renderSortedArray()}</div>
                  </div>
                </div>
              </div>
            </section>

            {isCountDown() && (
              <section>
                <div className="bg-slate-200 rounded-xl pt-3 h-full min-w-[28rem]">
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-3">
                    <span>Background Countdowns</span>
                    <span className="w-max flex items-center">
                      <FcNumericalSorting12 className="text-2xl mb-3" />
                    </span>
                  </div>
                  <div className="pt-8 pb-5 bg-slate-200 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl">
                    <div>{renderPinned('countdown')}</div>
                    {renderCountdown()}
                  </div>
                </div>
              </section>
            )}
          </div>

          <Form
            style={`cursor-pointer text-xl bg-black tracking-widest text-white p-4 w-[24rem] rounded-lg hover:shadow-xl hover:bg-gray-950 duration-300`}
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
