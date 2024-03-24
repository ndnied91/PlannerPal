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
  isDarkTheme,
}) => {
  return (
    <div
      className={`${
        isDarkTheme ? 'bg-neutral-800' : 'bg-slate-100'
      }  min-w-48 h-auto md:h-[85vh] overflow-scroll m-3 md:m-0`}
    >
      <button
        className={`${
          isDarkTheme ? 'bg-neutral-400 rounded-t-md' : 'bg-slate-400 '
        } w-full p-5 flex justify-center items-center cursor-pointer mb-3 ${
          isDisabled
            ? 'disabled:opacity-40 disabled:cursor-default'
            : `${isDarkTheme ? 'hover:bg-neutral-500' : 'hover:bg-slate-500'}`
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
        <p className="text-xl pl-2 flex justify-center items-center">
          <span className="font-bold tracking-wide mr-2">Add Note</span>
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
              isDarkTheme={isDarkTheme}
            />
          );
        }
      })}
    </div>
  );
};

export default NoteAside;
