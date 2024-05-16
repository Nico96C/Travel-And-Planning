import { useParams } from "react-router-dom";
import { useItems } from "../context/ItemsContext";

export default function ItemInfo() {
    const { items, updateItems } = useItems();
    const { id } = useParams();
  
  const item = items.find(item => item.id === parseInt(id));

  if (!item) {
    return <div>Ítem no encontrado</div>;
  }

    return(
        <div>ES ITEM {item.nombreDestino}</div>
    )
}