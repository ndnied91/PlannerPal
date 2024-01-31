import { createContext, useContext, useState } from 'react';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const TodoAppProvider = ({ children }) => {
  const [items, setItems] = useState([]); //main todos
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateItem, setUpdateItem] = useState({}); //for patch route update content
  const [countdownItems, setCountdownItems] = useState([]);
  const [filteredBy, setFilteredBy] = useState('default');

  // working for both
  const removeItem = async (item) => {
    const itemId = item._id;
    const response = await customFetch.delete(`/items/${item._id}`);

    if (response.status === 200) {
      const newItems = items.filter((item) => item._id !== itemId);
      newItems.map((i, index) => (i.id = index));
      setItems(newItems);
    }

    toast.success(`Successfully remove item`);
  };

  // working for both
  const updateStatus = async (item) => {
    const { data } = await customFetch.patch(`/items/${item._id}`, {
      isCompleted: !item.isCompleted,
      filteredBy,
    });

    setItems(data.items);
  };

  const addtoPriority = async (item) => {
    const { data } = await customFetch.patch(`/items/${item._id}`, {
      isPriority: !item.isPriority,
      filteredBy,
    });

    setItems(data.items);
  };

  const updateContent = async (item) => {
    const response = await customFetch.patch(`/items/${item._id}`, {
      ...item,
      filteredBy,
    });

    if (item.calCode) {
      try {
        const response = await customFetch.patch(
          `/cal/update/${item.calCode}`,
          {
            ...item,
          }
        );
      } catch (e) {
        toast.error(e.response.data.error);
      }
    }

    if (response.status === 201) {
      setShowEditModal(false);
      toast.success('Successful update to item');
    }
    setItems(response.data.items);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        setItems,
        removeItem,
        updateStatus,
        addtoPriority,
        showModal,
        setShowModal,
        showEditModal,
        setShowEditModal,
        updateContent,
        updateItem,
        setUpdateItem,
        countdownItems,
        setCountdownItems,
        filteredBy,
        setFilteredBy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
