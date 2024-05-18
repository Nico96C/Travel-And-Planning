import { Link, useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext";
import InteractiveMap from "./InteractiveMap";
import "./itemInfo.css";
import NavBar from "./NavBar";
import { useHome } from "../context/HomeContext";
import { useEffect, useState } from "react";
import BackIcon from "../svg/back";
import Footer from "./Footer";

export default function ItemInfo() {
  const { items, updateItems } = useItems();
  const [isEditable, setIsEditable] = useState(false);
  const { id } = useParams();

  const { setIsHome } = useHome();

  useEffect(() => {
    setIsHome(false);
  }, []);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return <div>Ítem no encontrado</div>;
  }

  {
    /*   id
 nombreDestino 
 direccion
 fecha
 precio
 mensaje
 enlace
 img
   */
  }

  return (
    <div className="Container-Main">
      <NavBar />
      <Link to="/tagsview">
        <button>
          <BackIcon />
        </button>
      </Link>
      <div className="Header-Item">
        <div>
          La actividad que usted selecciono es {item.nombreDestino}, de Buenos
          Aires que se encuentra por {item.direccion}. Que posee una visita con
          un valor {item.precio === "0" ? "gratuito" : `$${item.precio}`}
        </div>
        <div>
          <img src={item.img} alt="Imagen del destino" />
        </div>
      </div>
      <div className="Container-Text-Area">
            <textarea
                value={item.mensaje}
                readOnly={!isEditable}
                rows="6"
                cols="70"
            />
            <button onClick={handleEditClick}>
                {isEditable ? "Guardar" : "Editar"}
            </button>
        </div>
      <div className="map-container">
        <InteractiveMap item={item} />
      </div>
      <Footer />
    </div>
  );
}
