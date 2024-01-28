import { toast } from 'react-toastify';

import customFetch from '../../utils/customFetch';
import { useGlobalContext } from './todoContext';
import FormModal from './FormModal';

const Form = ({ style, text, type }) => {
  const { showModal, setShowModal, setItems } = useGlobalContext();

  const sendToServer = async (e, pane) => {
    let newItemName = {};

    if (pane === 'countdown') {
      newItemName = {
        text: e.currentTitle,
        description: e.description,
        dueDate: e.dueDate,
        day: e.day,
        isCountDown: true,
      };
    } else {
      newItemName = {
        text: e.currentTitle,
        description: e.description,
        dueDate: e.dueDate,
        isPriority: e.isPriority,
        day: e.day,
        label: e.label,
        calCode: e.calCode,
      };
    }

    if (!newItemName) {
      toast.error('Please enter a valid todo');
      return;
    } else {
      try {
        if (pane !== 'countdown') {
          await customFetch.post('/cal', newItemName);
        }

        const { data } = await customFetch.post('/items', {
          todo: newItemName,
        });

        setItems(data.items);

        setShowModal(false);
        if (pane === 'countdown') {
          toast.success('Countdown Created!');
        } else {
          toast.success('Todo Created!');
        }
      } catch (error) {
        // toast.error(error?.response?.data?.msg || 'error creating!');
        return error;
      }
    }
  };

  return (
    <div className="text-center">
      <button
        className={style}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {text}
      </button>

      {showModal ? (
        <FormModal
          sendToServer={sendToServer}
          setShowModal={setShowModal}
          type={type}
        />
      ) : null}
    </div>
  );
};

export default Form;
