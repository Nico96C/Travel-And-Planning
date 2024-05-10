/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const ItemsContext = createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
  // Obtén el estado inicial de los elementos del almacenamiento local
  const itemsFromLocalStorage = JSON.parse(localStorage.getItem("items")) || [];
  const [items, setItems] = useState(itemsFromLocalStorage);

  // Guarda el estado de los elementos en el almacenamiento local cuando cambie
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    console.log(items)
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