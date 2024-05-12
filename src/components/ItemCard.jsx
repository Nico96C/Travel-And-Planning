/* eslint-disable react/prop-types */
import { useState } from "react";
import { useItems } from "../context/ItemsContext";
import DropDownIcon from "../svg/dropdown";
import "./TagsView.css";
import LinkIcon from "../svg/link";
import TrashIcon from "../svg/trash";

const ItemCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const { removeItem } = useItems();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`item ${expanded ? "expanded" : ""}`}>
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
