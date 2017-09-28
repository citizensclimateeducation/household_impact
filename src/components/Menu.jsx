import React from 'react';
import axios from 'axios'
import {nextSection} from '../lib/Utility.jsx'

class Menu extends React.Component {
  constructor(props) {
      super(props);
  }


  render() {

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">

          <a className="navbar-brand" href="#">
            <img src={require('../images/ccl-logo-alpha.png')} className="menu-logo" />
          </a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#blog">Blog</a></li>
            <li className="nav-item"><a className="nav-link" href="#take_action">Take Action</a></li>
            <li className="nav-item"><a className="nav-link" href="#donate">Donate</a></li>
            <li className="nav-item btn-join">
              <button className="btn btn-danger btn-sm">Join CCL</button>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    )
  }

}

export default Menu;
