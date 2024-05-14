import NavBar from "./NavBar";
import "../App.css";
import "./itemCompose.css";
import { useHome } from "../context/HomeContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useItems } from "../context/ItemsContext";
import MapaImg from "/img/mapa.jpg";

export default function ItemCompose() {
  const { setIsHome } = useHome();
  const { addItem } = useItems();
  const [lastId, setLastId] = useState(0);
  const [formData, setFormData] = useState({
    nombreDestino: "",
    direccion: "",
    fecha: "",
    precio: "",
    mensaje: "",
    enlace: "",
    img: null,
  });

  useEffect(() => {
    setIsHome(false);

    const storedLastId = localStorage.getItem("lastId");
    if (storedLastId) {
      setLastId(parseInt(storedLastId));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Obtiene el archivo de imagen //

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result; // Obtiene base64 //
      setFormData({
        ...formData,
        img: base64String, // Guarda base64 en el estado //
      });
    };

    reader.readAsDataURL(imageFile); // Leer el contenido del archivo como una URL //
  };

  const handleAddItem = () => {
    // Crear un objeto con los datos del formulario //
    const newItem = {
      id: lastId + 1,
      nombreDestino: formData.nombreDestino,
      direccion: formData.direccion,
      fecha: formData.fecha,
      precio: formData.precio,
      mensaje: formData.mensaje,
      enlace: formData.enlace,
      img: formData.img,
    };

    const newId = lastId + 1;
    setLastId(newId);
    localStorage.setItem("lastId", newId.toString());

    // Agregar el objeto a items //
    addItem(newItem);

    // Incrementar el último ID utilizado //
    setLastId(lastId + 1);

    // Limpiar el formulario //
    setFormData({
      nombreDestino: "",
      direccion: "",
      fecha: "",
      precio: "",
      mensaje: "",
      enlace: "",
      img: "",
      imgURL: "",
    });
  };

  return (
    <>
      <div className="Main-Container">
        <NavBar />
        <div>
          <Link to="/tagsview">
            <button>GO BACK</button>
          </Link>
        </div>

        <div className="Area">
          <div className="Create-Item-Container">
            <div>
              <div className="Items-1">
                <h3>Actividad 📌</h3>
                <input
                  type="text"
                  value={formData.nombreDestino}
                  onChange={handleInputChange}
                  name="nombreDestino"
                  placeholder="Ingrese destino"
                />
                <h3>Zona 🗺</h3>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  name="direccion"
                  placeholder="Zona/Barrio/Localidad"
                />
              </div>
              <div className="Items-2">
                <h3>Fecha 📅</h3>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  name="fecha"
                  placeholder="Fecha de actividad"
                />
                <h3>Precio 💲</h3>
                <input
                  type="number"
                  value={formData.precio}
                  onChange={handleInputChange}
                  name="precio"
                  placeholder="Precio"
                />
                <h3>Enlace 🔗</h3>
                <input
                  type="text"
                  value={formData.enlace}
                  onChange={handleInputChange}
                  name="enlace"
                  placeholder="URL del sitio"
                />
              </div>
            </div>
            <div>
              <img
                className="img-map"
                src={formData.img || MapaImg}
                alt="Imagen de mapa"
              />
            </div>
          </div>

          <div className="Image-Area">
            <h3>Imagen 🖼️</h3>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="Text-Area">
            <textarea
              id="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              name="mensaje"
              rows="9"
              cols="77"
            />
          </div>
        </div>

        <button onClick={handleAddItem}>ADD ITEM</button>
      </div>
    </>
  );
}
