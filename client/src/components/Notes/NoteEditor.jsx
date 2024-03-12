import React from 'react';
import Container from './RichMediaEditor/container';

const NoteEditor = ({
  updateNotesArr,
  body,
  title,
  _id,
  setIsDisabled,
  setSelectedNote,
  noteTitle,
  setNoteTitle,
  content,
  setContent,
}) => {
  const selectedNote = { body, _id, title };

  return (
    <div className="md:m-4 md:p-4">
      <Container
        {...selectedNote}
        updateNotesArr={updateNotesArr}
        setIsDisabled={setIsDisabled}
        setSelectedNote={setSelectedNote}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        content={content}
        setContent={setContent}
      />
    </div>
  );
};

export default NoteEditor;
