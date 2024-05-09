import "../App.css";
import "./TagsView.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PlusIcon from "../svg/plus";
import AdaptativeBanner from "/img/banner5.png";
import { useItems } from "../context/ItemsContext";
import { Link } from "react-router-dom";

export default function TagsView() {
  const { removeItem, items } = useItems();

  return (
    <div className="Main-Container">
      <NavBar />
      <div className="Banner-Container">
        <img
          className="Banner-Secondary"
          src={AdaptativeBanner}
          alt="Viaje y plan banner"
        />
      </div>
      <h2>Bienvenido</h2>
      <p>
        Ya se encuentra en la sección donde comienza el viaje por sus sitios
        ideales que quiere visitar, agregue cuanto desee, haga su plan y
        organice cada uno, según la fecha deseada. Sienta la libertad de poder
        elegir y modificar según su gusto tanto con imágenes, agregando sitios
        webs y más. Puede comenzar más abajo ⬇
      </p>

      <div className="view-items">
        {items.length === 0 ? (
          <p>No hay items disponibles.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item">
              {/* id
                  nombreDestino 
                  direccion
                  fecha
                  precio
                  mensaje
              */}
              <p>{item.nombreDestino}</p>
              <p>{item.direccion}</p>
              <button onClick={() => removeItem(item.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>

      <Link to="/itemCompose" className="add-item">
        <div className="order-item">
          AGREGA TUS DESTINOS
          <PlusIcon />
        </div>
      </Link>

      <Footer />
    </div>
  );
}
