import NavBar from "./NavBar";
import "../App.css";
import { useHome } from "../context/HomeContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ItemCompose() {
  const { setIsHome } = useHome();

  useEffect(() => {
    setIsHome(false);
  }, []);

  return (
    <>
      <div className="Main-Container">
        <NavBar />
        <div>
          <Link to="/tagsview">
            <button>GO BACK</button>
          </Link>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>
      </div>
    </>
  );
}
