import { NavLink } from "react-router-dom";
import User from "/user.svg";
import Add from "/addBook.svg";
import Search from "/searchBook.svg";

const NavBar = ({ navLinks }) => {
  return (
    <nav className="w-5/6 max-w-sm mx-auto mb-10 md:max-w-md">
      <ul className="flex items-center justify-center gap-6">
        {/* <NavLink to="/user" >
          <img src={User} alt="user" />
        </NavLink> */}
        <NavLink to="/" >
          <img 
            src={Add} 
            alt="add books icon" 
            className="w-8 hover:scale-105"
            title="Add Books"
          />
        </NavLink>
        <NavLink to="/booksRead" >
          <img 
            src={Search} 
            alt="search books icon" 
            className="w-8 hover:scale-105"
            title="View Books"
          />
        </NavLink>
      </ul>
    </nav>
  )
}

export default NavBar