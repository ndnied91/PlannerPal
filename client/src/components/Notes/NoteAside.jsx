import React, { useEffect } from 'react';
import SingleNote from './SingleNote';
import { FaPlus } from 'react-icons/fa';

const NoteAside = ({
  notes,
  setSelectedNote,
  selectedNote,
  setNotes,
  updatePosition,
  _id,
}) => {
  useEffect(() => {
    updatePosition(notes);
  }, [notes.length]);

  return (
    <div className="bg-slate-100 min-w-48 h-[85vh] max-h-fit overflow-scroll">
      <button
        className="w-full bg-slate-400 p-5 border-b-2 border-slate-400 flex justify-center items-center cursor-pointer hover:bg-slate-500 disabled:opacity-40 disabled:cursor-default"
        disabled={!(notes[notes.length - 1]?.title !== '')}
        onClick={() => {
          setNotes([
            ...notes, // that contains all the old items
            {
              id: Math.random().toString(36),
              title: '',
              body: '',
            }, // and one new item at the end
          ]);
          //
          //
        }}
      >
        <p className=" text-xl pl-2">
          <FaPlus />
        </p>
      </button>

      {notes.map((note, i) => {
        if (note.title.length > 0) {
          return (
            <SingleNote
              key={i}
              {...note}
              setSelectedNote={setSelectedNote}
              setNotes={setNotes}
              selectedNote={selectedNote}
            />
          );
        }
      })}
    </div>
  );
};

export default NoteAside;
