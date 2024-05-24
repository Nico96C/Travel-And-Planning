/* eslint-disable react/prop-types */
import { useState } from "react";
import { useItems } from "../context/ItemsContext";
import DropDownIcon from "../svg/dropdown";
import "./TagsView.css";
import LinkIcon from "../svg/link";
import TrashIcon from "../svg/trash";
import Plus2Icon from "../svg/plus-2";
import { Link } from "react-router-dom";
import InfoIcon from "../svg/info";

const ItemCard = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const { removeItem, items, replaceItem } = useItems();
  const [dragItem, setDragItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    if (newIndex >= 0 && newIndex < itemsLength) {
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
      const temp = itemClone[draggedOverItem];
      itemClone[draggedOverItem] = itemClone[dragItem];
      itemClone[dragItem] = temp;
      replaceItem(itemClone);
      setDragItem(null);
      setDraggedOverItem(null);
    }
  }

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {modalOpen && !expanded && (
        <div className="modal-1">
          <div className="modal-content-1">
            <span className="close" onClick={handleModal}>
              &times;
            </span>
            <p>Aquí va tu mensaje o contenido de la modal.</p>
          </div>
        </div>
      )}

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
            {!expanded && (
              <div>
                <h3 className="info-text" onClick={handleModal}>
                  INFORMACION <InfoIcon />
                </h3>
              </div>
            )}
          </div>

          {modalOpen && expanded && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleModal}>
                  &times;
                </span>
                <p>Aquí va tu mensaje o contenido de la modal.</p>
              </div>
            </div>
          )}

          {!expanded && (
            <div className="items-primary">
              <h2>{item.nombreDestino}</h2>
              <h4>{item.fecha}</h4>
            </div>
          )}

          {!expanded && (
            <div className="second-items">
              <button
                className="delete-button"
                onClick={() => removeItem(item.id)}
                title="Eliminar"
              >
                <TrashIcon />
              </button>
              <Link to={`/tagsview/${item.id}`}>
                <button className="more-button" title="Ver más">
                  <Plus2Icon />
                </button>
              </Link>
              <h4 onClick={toggleExpand}>
                Ampliar <DropDownIcon />
              </h4>
            </div>
          )}

          {expanded && (
            <div className="expanded-container">
              <div>
                <h3 className="info-text" onClick={handleModal}>
                  INFORMACION <InfoIcon />
                </h3>
              </div>

              <div className="expanded-subcontainer">
                <div className="items-primary">
                  <h2>{item.nombreDestino}</h2>
                  <h4>{item.fecha}</h4>
                </div>

                {!expanded && (
                  <div className="second-items">
                    <button
                      className="delete-button"
                      onClick={() => removeItem(item.id)}
                      title="Eliminar"
                    >
                      <TrashIcon />
                    </button>
                    <Link to={`/tagsview/${item.id}`}>
                      <button className="more-button" title="Ver más">
                        <Plus2Icon />
                      </button>
                    </Link>
                    <h4 onClick={toggleExpand}>
                      Ampliar <DropDownIcon />
                    </h4>
                  </div>
                )}

                {expanded && (
                  <div className="expanded-text">
                    <div className="expanded-items">
                      <h2>{item.direccion}</h2>
                      <h4>
                        {item.precio === "0" ? "Gratis" : "$ " + item.precio}
                      </h4>
                    </div>
                    <a
                      href={"https://" + item.enlace}
                      target="_blank"
                      alt="Enlace para actividad"
                    >
                      <LinkIcon />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="area-text">
          <p>{item.mensaje}</p>
        </div>

        {expanded && (
          <div className="second-items-2">
            <button
              className="delete-button"
              title="Eliminar"
              onClick={() => removeItem(item.id)}
            >
              <TrashIcon />
            </button>
            <Link to={`/tagsview/${item.id}`} className="no-underline">
              <button className="more-button">
                <Plus2Icon /> <h5>Ver más</h5>
              </button>
            </Link>
            <h4 className="Contract" onClick={toggleExpand}>
              Contraer <DropDownIcon />
            </h4>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemCard;
