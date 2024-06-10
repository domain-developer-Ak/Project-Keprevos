import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../AUTH/userContext';
import '../App.css';
import logo from '../SVG/Home.png';
import search from '../SVG/Search.png';
import about from '../SVG/About.png';

function Main() {
  const { user } = useContext(UserContext);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <h1>{user ? user : 'Developer Ak'}</h1>
          <ul>
            <li><Link to='/main/home'><img src={logo} alt='Home' className='logo'></img></Link></li>
            <li><Link to='/main/search'><img src={search} alt='Search' className='logo'></img></Link></li>
            <li><Link to='/main/contact'><img src={about} alt='About' className='logo'></img></Link></li>
            <li><Link to='/main/count'>Count</Link></li>
          </ul>
        </div>
      </nav>
      <div className="content"> 
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
