import "../App.css";
import "./TagsView.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import PlusIcon from "../svg/plus";
import AdaptativeBanner from "/img/banner5.png";
import { Link } from "react-router-dom";
import ViewItems from "./ViewItems";
import { useLoading } from "../context/LoadingContext";
import { useEffect } from "react";
import Loader from "./Loader";

export default function TagsView() {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Tiempo de la animación //

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
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
            organice cada uno, según la fecha deseada. Sienta la libertad de
            poder elegir y modificar según su gusto tanto con imágenes,
            agregando sitios webs y más. Puede comenzar más abajo.
          </p>

          <ViewItems />

          <Link to="/itemCompose" className="add-item">
            <div className="order-item">
              AGREGA TUS DESTINOS
              <PlusIcon />
            </div>
          </Link>

          <Footer />
        </div>
      )}
      ;
    </div>
  );
}
