import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import '../Notes/RichMediaEditor/style.css';
import { FaRegTrashAlt } from 'react-icons/fa';
const SingleNoteOverview = ({ item }) => {
  // console.log(item);

  // let body = '<p>lets see if it works on search!</p>';
  let createdAt = '2024-02-29T04:26:54.949Z';
  let createdBy = '659cb2843a62d13541e7be94';
  // let title = '<p>Test Note</p>';

  const [body, setBody] = useState('<p>lets see if it works on search!</p>');
  const [title, setTitle] = useState('<p>Test Note</p>');

  // const {title, body, createdBy, createdAt} = item;

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleChange = (content) => {
    setContent(content);
  };

  const saveItem = () => {
    if (title === undefined && content === undefined) {
      toast.error('Title and body can not be empty');
    } else if (title === undefined) {
      toast.error('Title can not be empty');
    } else if (content === undefined) {
      toast.error('Body can not be empty');
    } else {
      // updateNotesArr({ _id, title: title, content });
      // setIsDisabled(false);
    }
  };

  return (
    <div className="p-4">
      <div className="">
        <Editor
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
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
          }}
          onEditorChange={(newText) => setTitle(newText)}
          onKeyDown={handleKeyPress}
        />
        <Editor
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
          value={body}
          init={{
            height: 200,
            menubar: false,
            placeholder: 'Add text here..',
          }}
          onEditorChange={handleChange}
        />
      </div>
      <div className="float-right p-2 flex items-center">
        <div
          onClick={saveItem}
          className={`cursor-pointer text-sm outline outline-2 tracking-wider outline-gray-600 rounded-md w-fit flex items-center h-10 p-1 `}
        >
          Update
        </div>
        <div onClick={saveItem} className={`cursor-pointer p-3 mt-1 `}>
          <FaRegTrashAlt className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default SingleNoteOverview;
