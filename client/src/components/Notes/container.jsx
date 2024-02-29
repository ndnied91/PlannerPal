import React, { useEffect, useState } from 'react';
import NoteAside from './NoteAside';
import NoteEditor from './NoteEditor';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const container = ({ userContext }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState();
  const [isDisabled, setIsDisabled] = useState(false); //plus button
  const [noteTitle, setNoteTitle] = useState(''); //note editor
  const [content, setContent] = useState(''); //note editor

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

    try {
      const { data } = await customFetch.post('/notes', {
        _id,
        body: content,
        title,
        createdBy: userContext._id,
      });
      setNotes(data.items);
      toast.success('Item saved successfully!');
    } catch (e) {
      toast.error(e.response.data.msg || 'Demo Only!');
    }
  };

  const updatePosition = (notes) => {
    //determine if this is a new note or this is an updated note
    setSelectedNote('');
  };

  return (
    <div className="pl-32 pt-5">
      <aside className="flex">
        <NoteAside
          notes={notes.sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
          setSelectedNote={setSelectedNote}
          setNotes={setNotes}
          updatePosition={updatePosition}
          selectedNote={selectedNote}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          setContent={setContent}
          setNoteTitle={setNoteTitle}
        />
        <NoteEditor
          updateNotesArr={updateNotesArr}
          {...selectedNote}
          setIsDisabled={setIsDisabled}
          setSelectedNote={setSelectedNote}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          content={content}
          setContent={setContent}
        />
      </aside>
    </div>
  );
};

export default container;
