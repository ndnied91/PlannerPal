import React from 'react';

import parse from 'html-react-parser';
import { FaRegTrashAlt } from 'react-icons/fa';
import customFetch from '../../utils/customFetch';

const SingleNote = ({
  _id,
  title,
  body,
  setSelectedNote,
  selectedNote,
  setNotes,
}) => {
  const deleteItem = async (_id) => {
    try {
      const { data } = await customFetch.delete(`notes/${_id}`);
      setNotes(data.items);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={` ${
        selectedNote?._id === _id ? 'bg-slate-300' : ' bg-slate-200'
      }   w-full p-5 border-b-2 border-slate-400 flex justify-center items-center cursor-pointer hover:bg-slate-300`}
      onClick={() => setSelectedNote({ _id, body, title })}
    >
      <div className="flex items-center w-full justify-between">
        <span className="capitalize">{parse(title)}</span>
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
