/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

const ItemsContext = createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, toggleItem, removeItem }}>
      {children}
    </ItemsContext.Provider>
  );
};