/* eslint-disable react/prop-types */
import { useState } from "react";
import { useItems } from "../context/ItemsContext";
import DropDownIcon from "../svg/dropdown";
import "./TagsView.css";

const ItemCard = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    const { removeItem } = useItems();
  
    const toggleExpand = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className={`item ${expanded ? 'expanded' : ''}`}>
        <div className="first-items">
          {item.img && <img src={item.img} alt="Imagen Destino" width={"110px"} height={"65px"} />}
          <h4>{item.nombreDestino}</h4>
          <h4>{item.fecha}</h4>
        </div>
        <div className="second-items">
          <button onClick={() => removeItem(item.id)}>Eliminar</button>
          <h4 onClick={toggleExpand}>
            Ampliar <DropDownIcon />
          </h4>
        </div>
        {expanded && (
          <div className="expanded-info">
            {/* Aquí muestra más información del item */}
            <p>Dirección: {item.direccion}</p>
            <p>Precio: {item.precio}</p>
            {/* Otros detalles */}
          </div>
        )}
      </div>
    );
  };
  
  export default ItemCard;