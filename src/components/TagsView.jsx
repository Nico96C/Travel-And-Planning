import { Link } from "react-router-dom";
import "../App.css";

export default function TagsView() {
  return (
    <div className="Main-Container">
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
        tenetur asperiores expedita minus, impedit rem voluptatibus voluptate
        animi similique aliquid necessitatibus, eligendi sunt praesentium nihil
        magni labore laudantium dolorem earum?
      </p>
      <Link to="/">
        <button>GO BACK</button>
      </Link>
    </div>
  );
}
