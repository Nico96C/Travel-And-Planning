import { Link } from "react-router-dom";
import "./App.css";
import BannerApp from "/img/banner3.png";
import BannerFooter from "/img/banner4.png";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useHome } from "./context/HomeContext";
import { useEffect } from "react";

function App() {

  const { setIsHome } = useHome();

  useEffect(() => {
    setIsHome(false);
  }, []);

  return (
    <>
      <div className="Main-Container">
        <NavBar />
        <div className="Banner-Container">
          <img
            className="Banner-Primary-1"
            src={BannerApp}
            alt="Viaje y plan banner"
          />
          <Link to="/tagsview">
            <button className="Banner-Button">Empezar</button>
          </Link>
        </div>
        <div className="Body-Container">
          <h2>¡VIDEO ILUSTRATIVO DE COMO SE VE!</h2>
        </div>
        <div className="Banner-Container">
          <img
            className="Banner-Primary-2"
            src={BannerFooter}
            alt="Viaje y plan Footer"
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
