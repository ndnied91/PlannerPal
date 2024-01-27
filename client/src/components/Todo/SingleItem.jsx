import {
  FaTrashAlt,
  FaRegCheckCircle,
  FaFlag,
  FaPencilAlt,
} from 'react-icons/fa';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useGlobalContext } from './todoContext';
import EditModal from './EditModal';
import renderer from '../CountdownTimer';
import Countdown from 'react-countdown';
import { useState } from 'react';

export const SingleItem = ({ item, archivedList, style, type }) => {
  const [readMore, setReadMore] = useState(false);

  const {
    removeItem,
    updateStatus,
    addtoPriority,
    showEditModal,
    setShowEditModal,
    setUpdateItem,
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

          {type === 'trash' ? null : (
            <div>
              <div className="font-light pt-4 capitalize ">
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

      <div className="flex flex-col self-center gap-4">
        {!archivedList ? (
          <div className="">
            <Countdown date={item.dueDate} renderer={renderer} />
          </div>
        ) : null}

        <div className="flex justify-center w-full ">
          {!archivedList ? (
            <>
              <FaPencilAlt
                className="cursor-pointer text-blue-500 w-5 h-5 mt-0.5 mr-3"
                onClick={() => itemToUpdate(item)}
              />
              <FaFlag
                className="cursor-pointer text-red-500 w-6 h-6 mr-2"
                onClick={() => addtoPriority(item)}
              />
            </>
          ) : null}

          {showEditModal ? (
            <EditModal setShowEditModal={setShowEditModal} />
          ) : null}

          {!archivedList ? (
            <FaRegCheckCircle
              className="cursor-pointer text-green-600 w-6 h-6 ml-1 mr-1"
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
          <FaTrashAlt />
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
