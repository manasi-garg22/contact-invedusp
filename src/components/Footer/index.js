import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Link,
} from "react-router-dom";

function Footer(props) {
    return (
        <div>
            <nav className="navbar navbar-light bg-dark" style = {{display: 'flex', justifyContent: 'center'}}>
            <Link to ="/">  <button type="button" className="btn btn-primary" >Back to Home Page</button></Link>
</nav>
        </div>
    );
}

export default Footer;