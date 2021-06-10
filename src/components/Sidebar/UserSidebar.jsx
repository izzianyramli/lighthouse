import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import UserNavbarLinks from "../Navbars/UserNavbarLinks.jsx";
import logo from "assets/img/mida-logo-1.png";

class UserSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
        {this.props.hasImage ? (
          <div className="sidebar-background" style={sidebarBackground} />
        ) : (
          null
        )}
        <div style={{ zIndex: 4, position: "relative", padding: "10px" }} >
          <a
            href="https://www.mida.gov.my/"
            className="simple-text logo-mini"
          >
            <img src={logo} alt="logo_image" width="200px" align="center" />
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <UserNavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect)
                if (prop.layout === '/user') {
                  if (prop.invisible !== true)
                    return (
                      <li
                        className={
                          prop.upgrade
                            ? "active active-pro"
                            : this.activeRoute(prop.layout + prop.path)
                        }
                        key={key}
                      >
                        <NavLink
                          to={prop.layout + prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    );
                  return null;
                }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default UserSidebar;
