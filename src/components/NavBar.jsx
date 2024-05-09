import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHome } from "../context/HomeContext";

export default function NavBar() {
  const { isHome, setIsHome } = useHome();

  useEffect(() => {
    setIsHome(true);
  }, []);

  return (
    <div className="NavContainer">
      <div className="Logo">
        <h4>Travel & Planning ✈</h4>
      </div>
      <div className="Buttons">
        {isHome && (
          <Link to="/">
            <button>GO BACK</button>
          </Link>
        )}
        <button>FAQ</button>
      </div>
    </div>
  );
}
