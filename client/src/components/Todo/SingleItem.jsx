import {
  FaTrashAlt,
  FaRegCheckCircle,
  FaFlag,
  FaPencilAlt,
} from 'react-icons/fa';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useGlobalContext } from './todoContext';
import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';
import { FaRegTrashCan } from 'react-icons/fa6';

import EditModal from './EditModal';
import renderer from '../CountdownTimer';
import Countdown from 'react-countdown';
import { useState } from 'react';

export const SingleItem = ({
  item,
  archivedList,
  style,
  type,
  userSettings,
  setUserSettings,
  updateItemsAfterEditTodo,
  isDarkTheme,
}) => {
  const [readMore, setReadMore] = useState(false);
  const {
    removeItem,
    updateStatus,
    addtoPriority,
    showEditModal,
    setShowEditModal,
    setUpdateItem,
    setPinnedItem,
  } = useGlobalContext();

  const itemToUpdate = (item, sortBy) => {
    setUpdateItem(item);
    setShowEditModal(true);
  };

  const convertDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };

  const convertTime = (date) => {
    const updatedDate = new Date(date);
    var hours = updatedDate.getHours();

    var AmOrPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    var minutes = updatedDate.getMinutes();

    if (minutes < 10) {
      return hours + ':' + '0' + minutes + '' + AmOrPm;
    }
    return hours + ':' + minutes + '' + AmOrPm;
  };

  const renderDesc = (desc) => {
    if (!readMore && desc.length > 100) {
      return `${item.description.substring(0, 100)}...`;
    } else {
      return desc;
    }
  };

  const renderDescTrash = (desc) => {
    if (!readMore && desc.length > 25) {
      return `${item.description.substring(0, 15)}...`;
    } else {
      return desc;
    }
  };

  const renderDescExpand = (desc) => {
    if (desc.length < 100) return;
    if (readMore) {
      return 'show less';
    } else {
      return 'read more';
    }
  };

  const dynamicStyle = {
    color: item.isPriority ? 'maroon' : null,
    backgroundColor: item.isPinned ? userSettings?.pinnedColor : null,
  };

  const dynamicStyleDark = {
    color: item.isPriority ? '#ef4444' : null,
    backgroundColor: item.isPinned ? userSettings?.pinnedColor : null,
  };

  return (
    <div
      className={style}
      style={isDarkTheme ? dynamicStyleDark : dynamicStyle}
    >
      <section className="todoInfo">
        <div>
          <div className="font-bold capitalize">
            <p className="">{item.title}</p>
            <p className="text-sm capitalize font-normal">{item?.category}</p>
          </div>

          <p className="font-light text-sm tracking-wider">
            {item.dueDate !== '-1' ? convertDate(item.dueDate) : ''}

            <span className="pl-1">
              {!archivedList ? (
                <>{item.dueDate !== '-1' ? convertTime(item.dueDate) : ''}</>
              ) : null}
            </span>
          </p>

          {!type === 'trash' ? null : (
            <div className="font-light pt-4 capitalize text-xs mb-3">
              {renderDescTrash(item.description)}

              <button
                className="info-btn"
                onClick={() => setReadMore(!readMore)}
              >
                <p className="font-bold">
                  {renderDescExpand(item.description)}
                </p>
              </button>
            </div>
          )}
        </div>
      </section>

      <div
        className={`${
          type !== 'trash'
            ? 'flex flex-col self-center gap-4'
            : 'sticky b-0 w-full flex justify-between flex-row-reverse'
        } `}
      >
        {!archivedList ? (
          <>
            <Countdown date={item.dueDate} renderer={renderer} />
          </>
        ) : null}

        <div
          className={`${type !== 'trash' ? 'flex justify-end w-full' : null}  `}
        >
          {!archivedList ? (
            <>
              {item.isPinned ? (
                <RiUnpinLine
                  className={` ${
                    isDarkTheme ? 'text-gray-200' : 'text-black'
                  } cursor-pointer scale-x-[-1]  w-5 h-5 mt-0.5 mr-2 hover:opacity-80 duration-300`}
                  onClick={() => setPinnedItem(item, userSettings.sortBy)}
                />
              ) : (
                <RiPushpinLine
                  className={` ${
                    isDarkTheme ? 'text-gray-200' : 'text-black'
                  } cursor-pointer scale-x-[-1]  w-5 h-5 mt-0.5 mr-2 hover:opacity-80 duration-300`}
                  onClick={() => setPinnedItem(item, userSettings.sortBy)}
                />
              )}

              <FaPencilAlt
                className={`${
                  isDarkTheme ? 'text-blue-900' : ' text-blue-500'
                } cursor-pointer w-5 h-5 mt-0.5 mr-3 hover:opacity-80 duration-300`}
                onClick={() => itemToUpdate(item, userSettings.sortBy)}
              />

              {!item.isCountDown ? (
                <FaFlag
                  className={`${
                    isDarkTheme ? 'text-red-800' : 'text-red-500'
                  } cursor-pointer  w-6 h-6 mr-2 hover:opacity-80 duration-300`}
                  onClick={() => addtoPriority(item, userSettings.sortBy)}
                />
              ) : (
                <button
                  className={`${!archivedList ? 'block' : null}`}
                  onClick={() => removeItem(item, userSettings.sortBy)}
                >
                  <FaRegTrashCan
                    className={`text-xl hover:opacity-90 duration-300`}
                  />
                </button>
              )}
            </>
          ) : null}

          {showEditModal && userSettings ? (
            <EditModal
              setShowEditModal={setShowEditModal}
              showEditModal={showEditModal}
              userSettings={userSettings}
              setUserSettings={setUserSettings}
              updateItemsAfterEditTodo={updateItemsAfterEditTodo}
              isDarkTheme={isDarkTheme}
            />
          ) : null}

          {!archivedList ? (
            <FaRegCheckCircle
              className={`cursor-pointer text-green-600 w-6 h-6 ml-1 mr-1 hover:opacity-80 duration-300 ${
                item.isCountDown ? 'hidden' : 'visible'
              }`}
              onClick={() => {
                updateStatus(item, userSettings.sortBy);
              }}
            />
          ) : (
            <BsArrowReturnLeft
              className="cursor-pointer text-green-600 w-6 h-6  ml-1 mr-1"
              onClick={() => updateStatus(item)}
            />
          )}
        </div>

        <button
          className={`${!archivedList ? 'hidden' : null}`}
          onClick={() => removeItem(item)}
        >
          <FaTrashAlt className=" text-xl hover:text-2xl duration-300" />
        </button>
      </div>
    </div>
  );
};

export default SingleItem;

// toast
// user submits empty form
// when new item is added
// when we remove the item
