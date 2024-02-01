import { toast } from 'react-toastify';

import customFetch from '../../utils/customFetch';
import { useGlobalContext } from './todoContext';
import FormModal from './FormModal';

const Form = ({ style, text, type, userSettings }) => {
  const { showModal, setShowModal, setItems, filteredBy } = useGlobalContext();

  const sendToServer = async (e, pane) => {
    console.log(e);
    let newItemName = {};

    if (pane === 'countdown') {
      newItemName = {
        text: e.currentTitle,
        description: e.description,
        dueDate: e.dueDate,
        day: e.day,
        isCountDown: true,
        category: e.category,
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
        category: e.category,
      };
    }
    console.log(e);

    if (!newItemName) {
      toast.error('Please enter a valid todo');
      return;
    } else {
      try {
        if (pane !== 'countdown' && e.isAddedToCal) {
          console.log('sending to cal...', newItemName);
          await customFetch.post('/cal', newItemName);
        }

        const { data } = await customFetch.post('/items', {
          todo: newItemName,
          filteredBy,
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
          userSettings={userSettings}
        />
      ) : null}
    </div>
  );
};

export default Form;
