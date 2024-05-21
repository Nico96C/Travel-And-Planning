import { Link, useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext";
import InteractiveMap from "./InteractiveMap";
import "./itemInfo.css";
import NavBar from "./NavBar";
import { useHome } from "../context/HomeContext";
import { useEffect, useState } from "react";
import BackIcon from "../svg/back";
import Footer from "./Footer";
import apiKeys from "../private/apiKeys";
import LinkIcon from "../svg/link";

const apiKeyItem = apiKeys.apiKey;
const searchEngineIdItem = apiKeys.searchEngineId;

export default function ItemInfo() {
  const { items, updateItem, formData, setFormData } = useItems();
  const [isEditable, setIsEditable] = useState(false);
  const [editableMensaje, setEditableMensaje] = useState("");
  const { id } = useParams();
  const { setIsHome } = useHome();
  const [searchResults, setSearchResults] = useState([]);
  const [wikiInfo, setWikiInfo] = useState("");
  const [error, setError] = useState(null);

  const item = items.find((item) => item.id === parseInt(id));

  useEffect(() => {
    setIsHome(false);

    if (item) {
      // Set formData to the current item's data
      setFormData(item);
      setEditableMensaje(item.mensaje);

      const query = `${item.nombreDestino}, Buenos Aires`;

      const fetchWikiInfo = async () => {
        try {
          // Primera solicitud para obtener el título correcto
          const searchResponse = await fetch(
            `https://es.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${encodeURIComponent(
              query
            )}`
          );
          const searchData = await searchResponse.json();
          if (!searchData.query.search.length) {
            throw new Error(
              "No se encontró ninguna página de Wikipedia para esta búsqueda."
            );
          }

          const title = searchData.query.search[0].title;

          // Segunda solicitud para obtener el extracto de la página
          const extractResponse = await fetch(
            `https://es.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(
              title
            )}`
          );

          if (!extractResponse.ok) {
            throw new Error("Error fetching data from Wikipedia API");
          }

          const extractData = await extractResponse.json();
          const page = Object.values(extractData.query.pages)[0];
          setWikiInfo(page.extract);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchWikiInfo();

      const fetchSearchResults = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${apiKeyItem}&cx=${searchEngineIdItem}&q=${query}&num=3`
          );

          if (!response.ok) {
            throw new Error("Error fetching data from Google API");
          }

          const data = await response.json();
          setSearchResults(data.items);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchSearchResults();
    }
  }, [setIsHome, item, setFormData]);

  const handleEditClick = () => {
    if (isEditable) {
      // Update the specific item with editableMensaje
      updateItem(item.id, { ...item, mensaje: editableMensaje });
    }
    setIsEditable(!isEditable);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEditableMensaje(value);
  };

  if (!item) {
    return <div>Ítem no encontrado</div>;
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
          La actividad que usted selecciono es{" "}
          <strong> {item.nombreDestino}, de Buenos Aires </strong> que se
          encuentra por <strong>{item.direccion}.</strong> Que posee una visita
          con un valor {item.precio === "0" ? "gratuito" : `$${item.precio}`}.
          <div className="Container-mensaje">
            <div className="Container-Text-Area">
              <textarea
                value={editableMensaje}
                readOnly={!isEditable}
                onChange={handleChange}
                rows="10"
                cols="30"
              />
            </div>
            <button onClick={handleEditClick}>
              {isEditable ? "Guardar" : "Editar"}
            </button>
          </div>
        </div>
        <div>
          <img
            src={item.img}
            alt="Imagen del destino"
            width={600}
            height={400}
          />
        </div>
      </div>
      <div className="wiki-info">
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <h3>Información de Wikipedia:</h3>
            <p>{wikiInfo || "Cargando información..."}</p>
          </div>
        )}
      </div>
      <div className="search-results">
        {error && <div>Error: {error}</div>}
        {searchResults.map((result, index) => (
          <div key={index}>
            <div>
              <h3>{result.title}</h3>
            </div>
            <div className="item-google-result">
              <p>{result.snippet}</p>
              <a href={result.link} target="_blank">
                <button>
                  <LinkIcon />
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="map-container">
        <InteractiveMap item={item} />
      </div>
      <Footer />
    </div>
  );
}
