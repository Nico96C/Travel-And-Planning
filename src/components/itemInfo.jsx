import { Link, useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext";
import InteractiveMap from "./InteractiveMap";
import "./itemInfo.css";
import NavBar from "./NavBar";
import { useHome } from "../context/HomeContext";
import { useEffect } from "react";
import BackIcon from "../svg/back";

export default function ItemInfo() {
  const { items, updateItems } = useItems();
  const { id } = useParams();

  const { setIsHome } = useHome();

  useEffect(() => {
    setIsHome(false);
  }, []);

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
      <div>
        La actividad es {item.nombreDestino}
      </div>
      <div className="map-container">
        <InteractiveMap item={item}/>
      </div>
    </div>
  );
}
