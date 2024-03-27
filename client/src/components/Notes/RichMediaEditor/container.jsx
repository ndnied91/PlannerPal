import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';
import { Spinner } from '../../../utils/Spinner';
import { isMobile } from 'react-device-detect';
import { LuArrowLeft } from 'react-icons/lu';
import parse from 'html-react-parser';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Add Quill's snow theme CSS

const container = ({
  _id,
  body,
  title,
  updateNotesArr,
  setIsDisabled,
  noteTitle,
  setNoteTitle,
  content,
  setContent,
  setSelectedNote,
  isDarkTheme,
}) => {
  // const [loading, setLoading] = useState(true);
  const [editorHeight, setEditorHeight] = useState('400px'); // Default height for desktop
  const isMobile = window.innerWidth < 768; // Assuming 768px is the breakpoint for mobile devices

  const [componentTitle, setComponentTitle] = useState(noteTitle);
  // const [value, setValue] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const newHeight = isMobile ? 400 : 200; // Adjust the heights as needed
      setEditorHeight(newHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  //might be able to remove ^^

  useEffect(() => {
    setContent(body);
    setNoteTitle(title);
  }, [body]);
  //not sure why I need this

  const handleChange = (content) => {
    setContent(content);
  };

  const saveItem = () => {
    // setNoteTitle(`<p>${noteTitle}</p>`);

    if (noteTitle === undefined && content === undefined) {
      toast.error('Title and body can not be empty');
    } else if (noteTitle === undefined) {
      toast.error('Title can not be empty');
    } else if (content === undefined) {
      toast.error('Body can not be empty');
    } else {
      updateNotesArr({ _id, title: noteTitle, content });
      setIsDisabled(false);

      if (isMobile) {
        console.log('is mobile is true');
        setSelectedNote(undefined);
      } else {
        console.log('not mobile');
      }

      if (_id === undefined) {
        //this id is still undefined for NEW notes so the text should reset
        //if this is NOT undefined, this is an existing note and we should keep focus where it's at
        setNoteTitle('');
        setContent('');
      }
    }
  };

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  return (
    <section className="flex flex-col">
      {isMobile && (
        <div
          className={` ${
            isDarkTheme ? 'bg-neutral-600' : 'bg-slate-300'
          } w-20 p-2 flex justify-center items-center rounded-md shadow-lg mb-4 ml-4`}
          onClick={() => setSelectedNote(undefined)}
        >
          <LuArrowLeft /> <span className={``}> Back</span>
        </div>
      )}

      <form
        className={`flex justify-center flex-col items-center md:block pb-12`}
      >
        {/* title */}
        <div
          className={`${
            isDarkTheme
              ? 'bg-neutral-500 border-2 border-neutral-600 text-slate-50'
              : 'bg-slate-100 border-2 border-slate-200'
          } `}
          style={{
            width: isMobile ? '95%' : 'calc(80vw - 100px)',
            marginBottom: '10px',
          }}
        >
          {/* <ReactQuill
            theme="bubble"
            value={noteTitle}
            placeholder={'Add one line title..'}
            onChange={(noteTitle) => setNoteTitle(noteTitle)}
            toolbar={false}
            style={{ width: '100%', height: '100%' }}
            onKeyDown={handleKeyDown}
            modules={{
              toolbar: null, // Hide the toolbar
              clipboard: {
                matchVisual: false,
              },
            }}
          /> */}
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            name="noteTitle"
            type="text"
            placeholder={'Add one line title..'}
            value={noteTitle}
            style={{ width: '100%', height: '100%' }}
            onKeyDown={handleKeyDown}
          />

          <style>{`
          .ql-toolbar.ql-snow {
            background-color: ${isDarkTheme ? 'rgb(229 231 235)' : 'white'}
          }
          .ql-editor.ql-blank::before {
          color: ${isDarkTheme ? 'lightgrey' : 'black'} !important;
        }
      `}</style>
        </div>

        <div
          className={`${
            isDarkTheme
              ? 'bg-neutral-500 border-2 border-neutral-600 text-slate-50'
              : 'bg-slate-100 border-2 border-slate-200'
          } `}
          style={{
            width: isMobile ? '95%' : 'calc(80vw - 100px)',
            height: '400px',
            paddingBottom: '45px',
          }}
        >
          <ReactQuill
            theme="snow"
            value={content}
            placeholder={'Add text here..'}
            onChange={handleChange}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </form>
      <div className="w-full flex justify-center md:justify-start">
        <div
          onClick={saveItem}
          className={`${
            isDarkTheme ? 'bg-neutral-600' : 'bg-slate-300'
          } text-center cursor-pointer shadow-md hover:shadow-lg duration-300 rounded-md w-3/4 mt-5 flex justify-center p-4 tracking-wider font-bold md:w-min md:p-3 md:mt-1 $
          }`}
        >
          Submit
        </div>
      </div>
    </section>
  );
};

export default container;
