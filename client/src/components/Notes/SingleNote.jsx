import React from 'react';

import parse from 'html-react-parser';
import { FaRegTrashAlt } from 'react-icons/fa';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';

const SingleNote = ({
  _id,
  title,
  body,
  setSelectedNote,
  selectedNote,
  setNotes,
  createdAt,
  setIsDisabled,
  setContent,
  setNoteTitle,
  isDarkTheme,
}) => {
  const deleteItem = async (_id) => {
    try {
      const { data } = await customFetch.delete(`notes/${_id}`);
      setNotes(data.items);
      setSelectedNote('');
      setContent('');
      setNoteTitle('');
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };

  const shortenTitle = (title) => {
    return title.props.children.length > (!isMobile ? 10 : 20)
      ? `${title.props.children.substring(0, !isMobile ? 10 : 20)}...`
      : title.props.children;
  };

  const renderTitle = (title) => {
    // return parse(title);
    return shortenTitle(parse(title));
  };

  const handleClick = () => {
    setIsDisabled(false);
    setSelectedNote({ _id, body, title });
  };

  const renderDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
    const dateWithoutCommas = formattedDate.replace(/,/g, '');

    const time = new Date(createdAt).toLocaleTimeString('en-US');

    return (
      <div className="flex flex-col mt-1">
        <span className="text-xs">{dateWithoutCommas} </span>
        <span className="text-xxs">{time} </span>
      </div>
    );
  };

  return (
    <div
      className={` ${
        selectedNote?._id === _id
          ? `${isDarkTheme ? 'bg-neutral-700' : 'bg-slate-300'}`
          : `${isDarkTheme ? 'bg-neutral-500' : 'bg-slate-200'}`
      } ${
        isDarkTheme ? 'hover:bg-neutral-700' : 'hover:bg-slate-300'
      }   w-full p-5 pt-3 pb-3 mb-2 flex justify-center items-center cursor-pointer `}
      onClick={handleClick}
    >
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col">
          <span className="capitalize text-sm font-bold tracking-wider">
            {renderTitle(title)}
          </span>
          <div
            className={`${
              isDarkTheme ? 'text-slate-300' : 'text-gray-700'
            } text-xs`}
          >
            {renderDate(createdAt)}
          </div>
        </div>
        {/* date */}
        <span>
          <FaRegTrashAlt
            className="hover:text-red-600"
            onClick={() => deleteItem(_id)}
          />
        </span>
      </div>
    </div>
  );
};
export default SingleNote;
