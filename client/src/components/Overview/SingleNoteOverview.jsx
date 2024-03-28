import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import '../Notes/RichMediaEditor/style.css';
import customFetch from '../../utils/customFetch';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Add Quill's snow theme CSS
import 'react-quill/dist/quill.bubble.css'; // Add Quill's bubble theme CSS

const SingleNoteOverview = ({
  setShowNotesModal,
  showNotesModal,
  item,
  isDarkTheme,
}) => {
  const [body, setBody] = useState(item.body);
  const [title, setTitle] = useState(item.title);

  const [editorHeight, setEditorHeight] = useState('400px'); // Default height for desktop
  const isMobile = window.innerWidth < 768; // Assuming 768px is the breakpoint for mobile devices

  useEffect(() => {
    if (showNotesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showNotesModal]);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = isMobile ? 400 : 300; // Adjust the heights as needed
      setEditorHeight(newHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const saveItem = async () => {
    if (title === undefined && body === undefined) {
      toast.error('Title and body can not be empty');
    } else if (title === undefined) {
      toast.error('Title can not be empty');
    } else if (body === undefined) {
      toast.error('Body can not be empty');
    } else {
      try {
        await customFetch.post('/notes', {
          createdBy: item.createdBy,
          _id: item._id,
          body, //update from modal
          title, //update from modal
        });

        toast.success('Item updated successfully!');
        setShowNotesModal(false);
      } catch (e) {
        toast.error(e.response.data.msg || 'Demo Only!');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div className="p-4 pt-0 h-screen w-full md:h-fit">
      <div
        className={`${
          isDarkTheme
            ? 'bg-neutral-500 border-2 border-neutral-600 text-slate-50'
            : 'bg-slate-100 border-2 border-slate-200'
        } `}
        style={{
          marginBottom: '10px',
        }}
      >
        <input
          onChange={(e) => setTitle(e.target.value)}
          id="noteTitle"
          name="noteTitle"
          className={`${isDarkTheme ? 'bg-neutral-500' : 'bg-slate-100'} p-3 `}
          type="text"
          placeholder={'Add title..'}
          value={title || ''} // Ensure noteTitle is always defined
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
      `}</style>
      </div>
      <div
        className={`${
          isDarkTheme
            ? 'bg-neutral-500 border-2 border-neutral-600 text-slate-50'
            : 'bg-slate-100 border-2 border-slate-200'
        } `}
        style={{
          width: '100%',
          height: editorHeight,
          paddingBottom: '45px',
        }}
      >
        <ReactQuill
          theme="snow"
          value={body}
          placeholder={'Add text here..'}
          onChange={(e) => setBody(e)}
          style={{
            width: '100%',
          }}
        />
      </div>
      <div className="float-right md:p-2 flex items-center w-full md:w-fit md:pr-0">
        <div
          onClick={saveItem}
          className={`${
            isDarkTheme
              ? 'bg-neutral-600 text-slate-50'
              : 'bg-gray-800 text-white'
          } md:p-2 mt-4 md:mt-0 hover:opacity-80 duration-200 py-2 rounded w-full tracking-wider md:tracking-normal flex justify-center md:ml-0 md:mr-0 md:w-fit cursor-pointer`}
        >
          Update
        </div>
      </div>
    </div>
  );
};

export default SingleNoteOverview;
