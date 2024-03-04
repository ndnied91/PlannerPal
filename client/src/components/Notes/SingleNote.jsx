import React from 'react';

import parse from 'html-react-parser';
import { FaRegTrashAlt } from 'react-icons/fa';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

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
    return title.props.children.length > 10
      ? `${title.props.children.substring(0, 10)}...`
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

  return (
    <div
      className={` ${
        selectedNote?._id === _id ? 'bg-slate-300' : ' bg-slate-200'
      }   w-full p-5 border-b-2 border-slate-400 flex justify-center items-center cursor-pointer hover:bg-slate-300`}
      onClick={handleClick}
    >
      <div className="flex items-center w-full justify-between">
        <div className="flex flex-col">
          <span className="capitalize text-sm">{renderTitle(title)}</span>
          <p className="text-xs text-gray-700">
            {new Date(createdAt).toLocaleTimeString('en-US')}{' '}
          </p>
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
