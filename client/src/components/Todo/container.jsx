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
import { toast } from 'react-toastify';

const MainContainer = ({ userSettings, setUserSettings, isDarkTheme }) => {
  const {
    items,
    setItems,
    filteredBy,
    userContext,
    setFilteredBy,
    addNewFilter,
    setAddNewFilter,
    updateSortedItems,
  } = useGlobalContext();

  const [showCompleted, setShowCompleted] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortOptions, setSortOptions] = useState();

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
        isDarkTheme={isDarkTheme}
      />
    );
  };

  const updateSortFilter = async (sortBy) => {
    try {
      setSortOptions(sortBy);
      const { data } = await customFetch.post(`/settings/${userContext._id}`, {
        sortBy,
      });

      setUserSettings(data.settings);
    } catch (e) {
      console.log(e);
      toast.error('Error occurred, please try again');
    }
  };

  useEffect(() => {
    const setOrder = async () => {
      try {
        const { data } = await customFetch.post(
          `items/filter/${userSettings?.currentFilterOption}`,
          {
            sortBy: userSettings.sortBy,
          }
        );
        setItems(data.items);
      } catch (e) {
        console.log(e);
        toast.error('Error occurred, please try again');
      }
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
                style={`${
                  isDarkTheme
                    ? 'bg-gray-500 text-slate-100'
                    : 'bg-white text-gray-950'
                } flex items-center p-5 rounded-md shadow-2xl`}
                userSettings={userSettings}
                setUserSettings={setUserSettings}
                updateItemsAfterEditTodo={updateItemsAfterEditTodo}
                isDarkTheme={isDarkTheme}
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
                style={`${
                  isDarkTheme
                    ? 'bg-gray-500 text-slate-100'
                    : 'bg-white text-gray-950'
                } flex items-center p-5 rounded-md shadow-2xl`}
                userSettings={userSettings}
                updateItemsAfterEditTodo={updateItemsAfterEditTodo}
                isDarkTheme={isDarkTheme}
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
            style={`${
              isDarkTheme
                ? 'bg-gray-500 text-slate-100'
                : 'bg-white text-gray-950'
            } flex items-center p-5 rounded-md shadow-2xl`}
            type={'countdown'}
            userSettings={userSettings}
            updateItemsAfterEditTodo={updateItemsAfterEditTodo}
            isDarkTheme={isDarkTheme}
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
              style={`${
                isDarkTheme
                  ? 'bg-gray-500 text-slate-100'
                  : 'bg-white text-gray-950'
              }  flex items-center p-5 rounded-md shadow-2xl`}
              userSettings={userSettings}
              updateItemsAfterEditTodo={updateItemsAfterEditTodo}
              isDarkTheme={isDarkTheme}
            />
          </div>
        );
      });
    }
  };

  return (
    <section className="md:pr-2 pt-5">
      <div className="flex mb-5">
        <div className="w-[100%] flex justify-items-start pl-5 items-center md:pl-28 text-center font-bold md:text-3xl tracking-wider">
          {showCompleted ? 'Archive' : ' Current'}
        </div>

        <div className="">
          {!addNewFilter && (
            <FilterSelect
              className={`${
                isDarkTheme ? 'bg-slate-200' : 'bg-slate-100'
              } relative h-10 pt-2 pb-2 cursor-pointer border-solid rounded-sm`}
              textPrompt={'Filter'}
              showFilterIcon={true}
              updatable={true}
              userSettings={userSettings}
              setUserSettings={setUserSettings}
              setFilteredBy={setFilteredBy}
              category={userSettings.currentFilterOption}
              isDarkTheme={isDarkTheme}
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
              <div className="">
                <FilterPopover
                  userSettings={userSettings}
                  setUserSettings={setUserSettings}
                  isDarkTheme={isDarkTheme}
                />
              </div>
            </OutsideClickHandler>
          </div>
        </div>

        <div
          className={`${
            isDarkTheme ? 'bg-slate-100 text-gray-800' : 'bg-black text-white'
          } h-10 tracking-wider rounded-lg self-center p-3 cursor-pointer mr-4`}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? <LuListTodo /> : <FaArchive className="" />}
        </div>
      </div>

      {showCompleted ? (
        <CompletedTodos
          items={items}
          setItems={setItems}
          userSettings={userSettings}
          isDarkTheme={isDarkTheme}
        />
      ) : (
        <>
          {/*  */}
          <div className="flex flex-col lg:flex-row justify-center md:ml-28 md:gap-4 md:mr-10 custom-class">
            <section className="flex flex-col md:justify-center md:items-center">
              <div className="xs:flex sm:flex flex-col md:flex-row flex gap-1 md:gap-4 lg:grow md:self-stretch mb-2 ">
                {/* normal list */}
                <div
                  className={`${
                    isDarkTheme ? 'bg-neutral-800' : 'bg-slate-100'
                  } pb-5 lg:min-w-[28rem] rounded-xl pt-3 grow ml-4 mr-4 md:mr-0 md:ml-0`}
                >
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-3 items-start ">
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
                  <div
                    className={`${
                      isDarkTheme ? 'bg-neutral-800' : 'bg-slate-100'
                    } pb-5 pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl`}
                  >
                    <div>{renderPinned('normal')}</div>
                    {sortOptions ? renderSortedArray('normal') : null}
                  </div>
                </div>
                <div
                  className={`  ${
                    isDarkTheme ? 'bg-neutral-800' : 'bg-slate-100'
                  } rounded-xl pt-3 grow ml-4 mr-4 md:mr-0 md:ml-0`}
                >
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-5 mb-5">
                    {renderTitle() ? (
                      'High Priority List'
                    ) : (
                      <div className="flex justify-center w-full h-full items-center mt-1/2">
                        No items currently in Priority{' '}
                      </div>
                    )}
                  </div>
                  <div
                    className={` ${
                      isDarkTheme ? 'bg-neutral-800' : 'bg-slate-100'
                    } pt-5 pb-5 lg:min-w-[28rem] pl-5 pr-5 max-h-[660px] overflow-scroll rounded-xl`}
                  >
                    <div>{renderPinned()}</div>
                    <div>{renderSortedArray()}</div>
                  </div>
                </div>
              </div>
            </section>
            {isCountDown() && (
              <section className="mb-2 ml-4 mr-4 md:ml-0 md:mr-0">
                <div
                  className={` ${
                    isDarkTheme ? 'bg-neutral-700' : 'bg-slate-200'
                  }  rounded-xl pt-3 h-full lg:min-w-[28rem]`}
                >
                  <div className="font-bold tracking-widest text-lg pl-5 flex justify-between pr-3">
                    <span>Background Countdowns</span>
                    <span className="w-max flex items-center">
                      <FcNumericalSorting12 className="text-2xl mb-3" />
                    </span>
                  </div>
                  <div
                    className={` ${
                      isDarkTheme ? 'bg-neutral-700' : 'bg-slate-200'
                    } pt-8 pb-5 pl-5 pr-5 overflow-scroll rounded-xl`}
                  >
                    <div>{renderPinned('countdown')}</div>
                    {renderCountdown()}
                  </div>
                </div>
              </section>
            )}
          </div>

          <Form
            style={`${
              isDarkTheme
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-gray-800 hover:bg-gray-950'
            } mb-4 md:mb-0 cursor-pointer bg-secondary text-xl tracking-widest text-white p-4 w-56 md:w-[24rem] rounded-lg hover:shadow-xl duration-300`}
            text={'Add item'}
            userSettings={userSettings}
            setUserSettings={setUserSettings}
            isDarkTheme={isDarkTheme}
          />
        </>
      )}
    </section>
  );
};

export default MainContainer;
