import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';
import { Spinner } from '../../../utils/Spinner';

const container = ({ _id, body, title, updateNotesArr }) => {
  const [content, setContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setContent(body);
    setNoteTitle(title);
  }, [body]);

  const handleChange = (content) => {
    setContent(content);
  };

  const saveItem = () => {
    if (noteTitle === undefined && content === undefined) {
      toast.error('Title and body can not be empty');
    } else if (noteTitle === undefined) {
      toast.error('Title can not be empty');
    } else if (content === undefined) {
      toast.error('Body can not be empty');
    } else {
      updateNotesArr({ _id, title: noteTitle, content });
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      <form
        className={`${setLoading ? 'opacity-100 duration-300' : 'opacity-0'}`}
      >
        {/* title */}
        <div className={`${!loading ? 'block' : 'hidden'}`}>
          <Editor
            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
            value={noteTitle}
            id="title"
            init={{
              required: true,
              width: 1200,
              height: 40,
              toolbar: false,
              menubar: false,
              placeholder: 'Add title..',
            }}
            onEditorChange={(newText) => setNoteTitle(newText)}
          />
          {/* title */}

          <Editor
            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
            value={content}
            init={{
              height: 500,
              width: 1200,
              menubar: false,
              placeholder: 'Add text here..',
            }}
            onInit={() => {
              setLoading(false);
            }}
            onEditorChange={handleChange}
          />
        </div>

        <div
          onClick={saveItem}
          className={`cursor-pointer bg-slate-300 rounded-md w-fit p-3 mt-1`}
        >
          Submit
        </div>
      </form>
    </div>
  );
};

export default container;
