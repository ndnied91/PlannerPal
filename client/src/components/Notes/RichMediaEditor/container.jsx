import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';
import { Spinner } from '../../../utils/Spinner';
import { isMobile } from 'react-device-detect';
import { LuArrowLeft } from 'react-icons/lu';

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
}) => {
  const [loading, setLoading] = useState(true);

  // const width = isMobile ?

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

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  return (
    <section className="">
      {loading && <Spinner />}

      {isMobile && (
        <div
          className="bg-slate-300 w-20 p-2 flex justify-center items-center rounded-md shadow-lg mb-4 ml-4"
          onClick={() => setSelectedNote(undefined)}
        >
          <LuArrowLeft /> Back
        </div>
      )}

      <form
        className={`flex justify-center flex-col items-center md:block ${
          setLoading ? 'opacity-100 duration-300' : 'opacity-0'
        }`}
      >
        {/* title */}
        <div className={`mx-4 md:m-0 ${!loading ? 'block' : 'hidden'}`}>
          <Editor
            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
            value={noteTitle}
            id="title"
            init={{
              selector: 'textarea',
              inline_boundaries: false,
              required: true,
              toolbar: false,
              width: 'fit',
              menubar: false,
              inline_boundaries_selector: 'span',
              height: 500,
              placeholder: 'Add title..',
            }}
            onEditorChange={(newText) => setNoteTitle(newText)}
            onKeyDown={handleKeyPress}
          />
          {/* title */}

          <Editor
            apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
            value={content}
            className="w-min"
            init={{
              height: 500,
              width: !isMobile ? 1200 : undefined,
              resize: 'both',
              autoresize: true,
              autoresize_margin: 50,
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
          className={`cursor-pointer shadow-md hover:shadow-lg duration-300 bg-slate-300 rounded-md w-3/4 mt-5 flex justify-center p-4 tracking-wider font-bold md:w-min md:p-3 md:mt-1 ${
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
