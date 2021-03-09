/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="/admin/dashboard">Home</a>
              </li>
              <li>
                <a href="https://www.mida.gov.my">Company</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://www.mida.gov.my/malaysias-lighthouse-project-the-beacon-of-malaysias-future-industries/">
              Lighthouse Project
            </a>
            &nbsp; The Beacon of Malaysia’s Future Industries
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
