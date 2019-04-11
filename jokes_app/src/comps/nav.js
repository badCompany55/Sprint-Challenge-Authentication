import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  const logOut = () => {
    localStorage.removeItem("token");
    props.history.push("/login");
  };
  return (
    <div className="navCont">
      <nav className="navBar">
        <Link to="/">Home</Link>
        <Link to="/jokes">Jokes</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        <button onClick={logOut}>Log out</button>
      </nav>
    </div>
  );
};

export default NavBar;
