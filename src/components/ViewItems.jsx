import { useItems } from "../context/ItemsContext";
import ItemCard from "./ItemCard";

export default function ViewItems() {
  const { items } = useItems();


  {
    /*   id
 nombreDestino 
 direccion
 fecha
 precio
 mensaje
 enlace
 url
   */
  }

  return (
    <div className="view-items">
      {items.length === 0 ? (
        <p>No hay items disponibles.</p>
      ) : (
        items.map((item) => (
            <ItemCard key={item.id} item={item}/>
        ))
      )}
    </div>
  );
}
