import React, { useEffect, useState } from 'react';
import SingleNote from './SingleNote';
import { FaPlus } from 'react-icons/fa';

const NoteAside = ({
  notes,
  setSelectedNote,
  selectedNote,
  setNotes,
  isDisabled,
  setIsDisabled,
  setContent,
  setNoteTitle,
}) => {
  return (
    <div className="bg-slate-100 min-w-48 h-[85vh] max-h-fit overflow-scroll">
      <button
        className={`w-full bg-slate-400 p-5 border-b-2 border-slate-400 flex justify-center items-center cursor-pointer  ${
          isDisabled
            ? 'disabled:opacity-40 disabled:cursor-default'
            : 'hover:bg-slate-500'
        }`}
        disabled={isDisabled}
        onClick={() => {
          setNotes([
            ...notes, // that contains all the old items
            {
              id: Date.now(),
              title: '',
              body: '',
              createdAt: Date.now(),
            }, // and one new item at the end
          ]);
          //
          setSelectedNote(null);
          setIsDisabled(true);
          setContent('');
          setNoteTitle('');
        }}
      >
        <p className="text-xl pl-2 ">
          <FaPlus />
        </p>
      </button>

      {notes.map((note, i) => {
        if (notes[notes.length - 1].title.length === 0) {
          notes.pop();
        }
        if (note.title.length > 0) {
          return (
            <SingleNote
              setIsDisabled={setIsDisabled}
              key={i}
              {...note}
              setSelectedNote={setSelectedNote}
              setNotes={setNotes}
              selectedNote={selectedNote}
              setContent={setContent}
              setNoteTitle={setNoteTitle}
            />
          );
        }
      })}
    </div>
  );
};

export default NoteAside;
