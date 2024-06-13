
import { Link } from "react-router-dom/cjs/react-router-dom";

const links = [
  { name: "Home", href: "/Home" },
  { name: "Contact", href: "/Contact" },
];

const NavBar = () => {
  return (
    <div>
      {links.map((x) => (
        <Link to={x.href}>{x.name}</Link>
      ))}
    </div>
  );
};

export default NavBar;
