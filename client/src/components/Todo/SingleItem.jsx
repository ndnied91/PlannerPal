import {
  FaTrashAlt,
  FaRegCheckCircle,
  FaFlag,
  FaPencilAlt,
} from 'react-icons/fa';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useGlobalContext } from './todoContext';
import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';

import EditModal from './EditModal';
import renderer from '../CountdownTimer';
import Countdown from 'react-countdown';
import { useState } from 'react';
import customFetch from '../../utils/customFetch';

export const SingleItem = ({ item, archivedList, style, type }) => {
  const [readMore, setReadMore] = useState(false);

  const {
    removeItem,
    updateStatus,
    addtoPriority,
    showEditModal,
    setShowEditModal,
    setUpdateItem,
    setItems,
  } = useGlobalContext();

  const itemToUpdate = (item) => {
    setUpdateItem(item);
    setShowEditModal(true);
  };

  const convertDate = (date) => {
    return new Date(date).toString().slice(0, 15);
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

  const renderDescExpand = (desc) => {
    if (desc.length < 100) return;
    if (readMore) {
      return 'show less';
    } else {
      return 'read more';
    }
  };

  const setPinnedItem = async (item) => {
    const { data } = await customFetch.patch(`/items/pinned/${item._id}`, {
      isPinned: !item.isPinned,
    });
    setItems(data.items);
    // /items/pinned/id
    //make PATCH API call
    //set this item with the isPinned key/val
    //return new list and update UI with pinned item
  };

  return (
    <div className={style} style={item.isPriority ? { color: 'maroon' } : null}>
      <section className="todoInfo">
        <div className="pb-2 ">
          <p className="font-bold capitalize">{item.title}</p>

          <p className="font-light text-sm">
            {item.dueDate !== '-1' ? convertDate(item.dueDate) : ''}
            <br />
            {!archivedList ? (
              <>
                Due:
                {item.dueDate !== '-1' ? convertTime(item.dueDate) : ''}
              </>
            ) : null}
          </p>

          {!type === 'trash' ? null : (
            <div>
              <div className="font-light pt-4 capitalize text-xs">
                {renderDesc(item.description)}

                <button
                  className="info-btn"
                  onClick={() => setReadMore(!readMore)}
                >
                  <p className="font-bold">
                    {renderDescExpand(item.description)}
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <div
        className={`${
          type !== 'trash'
            ? 'flex flex-col self-center gap-4'
            : 'flex justify-between flex-row-reverse'
        } `}
      >
        {!archivedList ? (
          <div className="">
            <Countdown date={item.dueDate} renderer={renderer} />
          </div>
        ) : null}

        <div
          className={`${type !== 'trash' ? 'flex justify-end w-full' : null}  `}
        >
          {!archivedList ? (
            <>
              {item.isPinned ? (
                <RiUnpinLine
                  className="cursor-pointer scale-x-[-1] text-black w-5 h-5 mt-0.5 mr-2"
                  onClick={() => setPinnedItem(item)}
                />
              ) : (
                <RiPushpinLine
                  className="cursor-pointer scale-x-[-1] text-black w-5 h-5 mt-0.5 mr-2"
                  onClick={() => setPinnedItem(item)}
                />
              )}

              <FaPencilAlt
                className="cursor-pointer text-blue-500 w-5 h-5 mt-0.5 mr-3"
                onClick={() => itemToUpdate(item)}
              />

              {!item.isCountDown ? (
                <FaFlag
                  className="cursor-pointer text-red-500 w-6 h-6 mr-2"
                  onClick={() => addtoPriority(item)}
                />
              ) : (
                <button
                  className={`btn remove-btn ${!archivedList ? 'block' : null}`}
                  onClick={() => removeItem(item)}
                >
                  <FaTrashAlt className=" text-xl hover:text-2xl duration-300" />
                </button>
              )}
            </>
          ) : null}

          {showEditModal ? (
            <EditModal setShowEditModal={setShowEditModal} />
          ) : null}

          {!archivedList ? (
            <FaRegCheckCircle
              className={`cursor-pointer text-green-600 w-6 h-6 ml-1 mr-1 ${
                item.isCountDown ? 'hidden' : 'visible'
              }`}
              onClick={() => updateStatus(item)}
            />
          ) : (
            <BsArrowReturnLeft
              className="cursor-pointer text-green-600 w-6 h-6  ml-1 mr-1"
              onClick={() => updateStatus(item)}
            />
          )}
        </div>
        <button
          className={`btn remove-btn ${!archivedList ? 'hidden' : null}`}
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
