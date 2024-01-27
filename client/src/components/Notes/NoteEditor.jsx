import React from 'react';
import Container from './RichMediaEditor/container';

const NoteEditor = ({ updateNotesArr, body, title, _id }) => {
  const selectedNote = { body, _id, title };

  return (
    <div className="m-4 w-148 p-4">
      <Container {...selectedNote} updateNotesArr={updateNotesArr} />
    </div>
  );
};

export default NoteEditor;
