/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const ItemsContext = createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
  const itemsFromLocalStorage = JSON.parse(localStorage.getItem("items")) || [];
  const [items, setItems] = useState(itemsFromLocalStorage);
  const [formData, setFormData] = useState({
    nombreDestino: "",
    direccion: "",
    fecha: "",
    precio: "",
    mensaje: "",
    enlace: "",
    img: null,
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const updateItem = (id, updatedItem) => {
    setItems(items.map(item => item.id === id ? updatedItem : item));
  };

  const replaceItem = (updatedItems) => {
    setItems(updatedItems);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, updateItem, removeItem, formData, setFormData, replaceItem }}>
      {children}
    </ItemsContext.Provider>
  );
};