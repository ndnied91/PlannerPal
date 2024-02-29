import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';
import { Spinner } from '../../../utils/Spinner';

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
}) => {
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
      setIsDisabled(false);

      if (_id === undefined) {
        //this id is still undefined for NEW notes so the text should reset
        //if this is NOT undefined, this is an existing note and we should keep focus where it's at
        setNoteTitle('');
        setContent('');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <section>
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
              selector: 'textarea',
              inline_boundaries: false,
              required: true,
              toolbar: false,
              menubar: false,
              selector: 'textarea',
              inline_boundaries_selector: 'span',
              placeholder: 'Add title..',
            }}
            onEditorChange={(newText) => setNoteTitle(newText)}
            onKeyDown={handleKeyPress}
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
          className={`cursor-pointer bg-slate-300 rounded-md w-fit p-3 mt-1 ${
            !loading ? 'block' : 'hidden'
          }`}
        >
          Submit
        </div>
      </form>
    </section>
  );
};

export default container;
