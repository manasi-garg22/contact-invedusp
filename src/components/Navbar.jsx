import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar(props) {
    return (
        <div>
            <nav className="navbar navbar-light bg-light" style = {{display: 'flex', justifyContent: 'center'}}>
  <span className="navbar-brand mb-0 h1">Contact Information APP</span>
</nav>
        </div>
    );
}

export default Navbar;