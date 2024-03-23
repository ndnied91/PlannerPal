import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import '../Notes/RichMediaEditor/style.css';
import customFetch from '../../utils/customFetch';

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
      const newHeight = isMobile ? 400 : 200; // Adjust the heights as needed
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

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div className="p-4 h-screen md:h-fit w-screen md:w-fit">
      <div>
        <Editor
          apiKey="l2ud205bb4bd74c618458n58240pxs53x3rp5by3320bh1qz"
          value={title}
          id="title"
          init={{
            selector: 'textarea',
            inline_boundaries: false,
            required: true,
            height: 50,
            toolbar: false,
            menubar: false,
            inline_boundaries_selector: 'span',
            resize: false,
            content_style: 'body { overflow: hidden; }',
          }}
          onEditorChange={(e) => setTitle(e)}
          onKeyDown={handleKeyPress}
        />
        <Editor
          apiKey="l2ud205bb4bd74c618458n58240pxs53x3rp5by3320bh1qz"
          value={body}
          init={{
            height: editorHeight,
            menubar: false,
            background: 'red',
            placeholder: 'Add text here..',
          }}
          onEditorChange={(e) => setBody(e)}
        />
      </div>
      <div className="float-right p-2 flex items-center w-full md:w-fit ">
        <div
          onClick={saveItem}
          className={`${
            isDarkTheme
              ? 'bg-neutral-400 text-slate-50'
              : 'bg-gray-800 text-white'
          }  hover:opacity-80 duration-200 px-6 py-2 rounded text-white w-full tracking-wider md:tracking-normal ml-2 mr-2 flex justify-center md:ml-0 md:mr-0 md:w-fit cursor-pointer`}
        >
          Update
        </div>
      </div>
    </div>
  );
};

export default SingleNoteOverview;
