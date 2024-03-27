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

const Container = ({
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
  const [editorHeight, setEditorHeight] = useState('400px');
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      const newHeight = isMobile ? '400px' : '200px';
      setEditorHeight(newHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    setContent(body);
    setNoteTitle(title);
  }, [body, title]);

  const handleChange = (content) => {
    setContent(content);
  };

  const saveItem = () => {
    if (!noteTitle || !content) {
      toast.error('Title and body can not be empty');
    } else if (!noteTitle) {
      toast.error('Title can not be empty');
    } else if (!content) {
      toast.error('Body can not be empty');
    } else {
      updateNotesArr({ _id, title: noteTitle, content });
      setIsDisabled(false);

      if (isMobile) {
        setSelectedNote(undefined);
      }

      if (!_id) {
        setNoteTitle('');
        setContent('');
      }
    }
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
          } w-20 p-2 flex justify-center items-center rounded-md shadow-lg mb-4 ml-4 `}
          onClick={() => setSelectedNote(undefined)}
        >
          <LuArrowLeft /> <span className={``}> Back</span>
        </div>
      )}

      <form
        className={`flex justify-center flex-col items-center md:block pb-12`}
      >
        <div
          className={`${
            isDarkTheme
              ? 'bg-neutral-500 border-2 border-neutral-600'
              : 'bg-slate-100 border-2 border-slate-200'
          } mb-3 font-sans text-sm`}
          style={{ width: isMobile ? '95%' : 'calc(80vw - 100px)' }}
        >
          <input
            onChange={(e) => setNoteTitle(e.target.value)}
            id="noteTitle"
            name="noteTitle"
            className={`${
              isDarkTheme ? 'bg-neutral-500' : 'bg-slate-100'
            } p-3 `}
            type="text"
            placeholder={'Add title..'}
            value={noteTitle || ''} // Ensure noteTitle is always defined
            style={{
              width: '100%',
              height: '100%',
              color: isDarkTheme ? 'white' : 'black',
            }}
            onKeyDown={handleKeyDown}
          />

          <style>{`
            .ql-toolbar.ql-snow {
              background-color: ${isDarkTheme ? 'rgb(229 231 235)' : 'white'}
            }
            .ql-editor.ql-blank::before {
              color: ${isDarkTheme ? 'lightgrey' : 'black'} !important;
            }

            #noteTitle::placeholder{
              color: ${isDarkTheme ? 'white' : 'black'} !important;
            }

          `}</style>
        </div>

        <div
          className={`${
            isDarkTheme
              ? 'bg-neutral-500 border-2 border-neutral-600 text-white'
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
          } text-center cursor-pointer shadow-md hover:shadow-lg duration-300 rounded-md w-3/4 mt-5 flex justify-center p-4 tracking-wider font-bold md:w-min md:p-3 md:mt-1`}
        >
          Submit
        </div>
      </div>
    </section>
  );
};

export default Container;
