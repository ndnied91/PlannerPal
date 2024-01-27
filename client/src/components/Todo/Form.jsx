import { toast } from 'react-toastify';

import customFetch from '../../utils/customFetch';
import { useGlobalContext } from './todoContext';
import FormModal from './FormModal';
import { FaPlus } from 'react-icons/fa';

const Form = ({ style, text }) => {
  const { showModal, setShowModal, setItems } = useGlobalContext();

  const sendToServer = async (e) => {
    const newItemName = {
      text: e.currentTitle,
      description: e.description,
      dueDate: e.dueDate,
      day: e.day,
      label: e.label,
      calCode: e.calCode,
    };

    if (!newItemName) {
      toast.error('Please enter a valid todo');
      return;
    } else {
      try {
        const res = await customFetch.post('/cal', newItemName);

        const { data } = await customFetch.post('/items', {
          todo: newItemName,
        });

        setItems(data.items);

        setShowModal(false);
        toast.success('Todo Created!');
      } catch (error) {
        // toast.error(error?.response?.data?.msg || 'error creating!');
        return error;
      }
    }
  };

  return (
    <div className="text-center">
      <button className={style} onClick={() => setShowModal(true)}>
        {text}
      </button>

      {showModal ? (
        <FormModal sendToServer={sendToServer} setShowModal={setShowModal} />
      ) : null}
    </div>
  );
};

export default Form;
