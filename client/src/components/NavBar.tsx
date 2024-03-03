import { NavLink } from "react-router-dom";
// import { NavLink as links } from "../types";

const NavBar = ({ navLinks }) => {
  return (
    <nav className="w-5/6 max-w-sm mx-auto mb-10 md:max-w-md">
      <ul className="flex items-center justify-center gap-6">
        {navLinks.map((link) => (
          <NavLink
            to={link.path}
            key={link.name}
            className={({ isActive }) =>
              `w-8 ${isActive ? "opacity-50" : "hover:scale-105"}`
            }
          >
            <img src={link.icon} alt={link.alt} title={link.alt} />
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
