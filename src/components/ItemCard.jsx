/* eslint-disable react/prop-types */
import { useState } from "react";
import { useItems } from "../context/ItemsContext";
import DropDownIcon from "../svg/dropdown";
import "./TagsView.css";
import LinkIcon from "../svg/link";
import TrashIcon from "../svg/trash";

const ItemCard = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const { removeItem, items, updateItems } = useItems();
  const [dragItem, setDragItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  function handleDragOver(index, event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const offset = rect.height / 2;
    const currentY = event.clientY - rect.top;

    let newIndex;

    const topBoundary = offset - 40;
    const bottomBoundary = offset + 40;

    if (currentY > bottomBoundary) {
      newIndex = index + 1; // Mover hacia abajo
    } else if (currentY < topBoundary) {
      newIndex = index - 1; // Mover hacia arriba
    } else {
      // Si la posición del ratón está dentro del rango, no hay cambio
      newIndex = index;
    }

    const itemsLength = items.length;
    console.log(newIndex, itemsLength)
    if (newIndex !== -1 && newIndex !== itemsLength) {
      setDraggedOverItem(newIndex);
    }
  }

  function handleDragStart() {
    if (!expanded) {
      setDragItem(index);
    }
  }

  function handleDragEnter() {
    if (!expanded) {
      setDraggedOverItem(index);
    }
  }

  function handleSort() {
    if (!expanded) {
      if (dragItem === null || draggedOverItem === null) {
        // No hay suficiente información para ordenar
        return;
      }

      const itemClone = [...items];
      const temp = itemClone[dragItem];
      itemClone[dragItem] = itemClone[draggedOverItem];
      itemClone[draggedOverItem] = temp;
      updateItems(itemClone);
    }
  }

  return (
    <div
      draggable
      onDragStart={() => {
        handleDragStart(index);
      }}
      onDragEnter={() => {
        handleDragEnter(index);
      }}
      onDragEnd={handleSort}
      onDragOver={(e) => handleDragOver(index, e)}
      className={`item ${expanded ? "expanded" : ""}`}
    >
      <div className="items-order">
        <div className="first-items">
          {item.img && <img src={item.img} alt="Imagen Destino" />}
        </div>
        <h4>{item.nombreDestino}</h4>
        <h4>{item.fecha}</h4>
        {!expanded && (
          <div className="second-items">
            <button onClick={() => removeItem(item.id)}>
              <TrashIcon />
            </button>
            <h4 onClick={toggleExpand}>
              Ampliar <DropDownIcon />
            </h4>
          </div>
        )}
        {expanded && (
          <>
            <div className="expanded-text">
              <h4>{item.direccion}</h4>
              <h4>{item.precio}</h4>
              <a
                href={"https://" + item.enlace}
                target="_blank"
                alt="Enlace para actividad"
              >
                <LinkIcon />
              </a>
            </div>
          </>
        )}
      </div>

      <div className="area-text">
        <p>{item.mensaje}</p>
      </div>

      {expanded && (
        <div className="second-items-2">
          <button onClick={() => removeItem(item.id)}>
            <TrashIcon />
          </button>
          <h4 className="Contract" onClick={toggleExpand}>
            Contraer <DropDownIcon />
          </h4>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
