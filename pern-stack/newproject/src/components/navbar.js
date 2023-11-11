import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo'>
  <img src="/Verde Bendito.png" alt="Verde Bendito Logo" className="logo-image" />
</div>
      <ul className='navbar-menu'>
        <li><Link to="/">bienvenidos</Link></li>
        <li><Link to="/Secondpage">nuevo proyecto</Link></li>
        <li><Link to="/Contact">contacto</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
