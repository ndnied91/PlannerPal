import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import '../Notes/RichMediaEditor/style.css';
import { FaRegTrashAlt } from 'react-icons/fa';
import customFetch from '../../utils/customFetch';
const SingleNoteOverview = ({ setShowNotesModal, showNotesModal, item }) => {
  const [body, setBody] = useState(item.body);
  const [title, setTitle] = useState(item.title);

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

  const deleteItem = async () => {
    try {
      await customFetch.delete(`notes/${item._id}`);
      toast.success('Item updated deleted!');
      setShowNotesModal(false);
    } catch (e) {
      toast.error(e.response.data.msg || 'Demo Only!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <div className="p-4">
      <div className="">
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
            height: 200,
            menubar: false,
            placeholder: 'Add text here..',
          }}
          onEditorChange={(e) => setBody(e)}
        />
      </div>
      <div className="float-right p-2 flex items-center">
        <div
          onClick={saveItem}
          className={`cursor-pointer text-sm outline outline-2 tracking-wider outline-gray-600 rounded-md w-fit flex items-center h-10 p-1 `}
        >
          Update
        </div>
        <div onClick={deleteItem} className={`cursor-pointer p-3 mt-1 `}>
          <FaRegTrashAlt className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default SingleNoteOverview;
