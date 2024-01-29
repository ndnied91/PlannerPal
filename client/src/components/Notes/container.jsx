import React, { useEffect, useState } from 'react';
import NoteAside from './NoteAside';
import NoteEditor from './NoteEditor';
import customFetch from '../../utils/customFetch';

const container = ({ userContext }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await customFetch('/notes');

        setNotes(data.items);
      } catch (e) {}

      notes[0] !== undefined ? setSelectedNote(notes[0]) : null;
    };

    getData();
  }, []);

  const updateNotesArr = async ({ _id, content, title }) => {
    setNotes(
      notes.map((item) => {
        if (item._id === _id) {
          return { ...item, body: content, title };
        } else {
          return item;
        }
      })
    );

    const { data } = await customFetch.post('/notes', {
      _id,
      body: content,
      title,
      createdBy: userContext._id,
    });
    setNotes(data.items);
  };

  const updatePosition = (notes) => {
    setSelectedNote(notes[notes.length - 1]);
  };

  return (
    <div className="pl-20 pt-5">
      <aside className="flex">
        <NoteAside
          notes={notes}
          setSelectedNote={setSelectedNote}
          setNotes={setNotes}
          updatePosition={updatePosition}
          selectedNote={selectedNote}
        />
        <NoteEditor updateNotesArr={updateNotesArr} {...selectedNote} />
      </aside>
    </div>
  );
};

export default container;
