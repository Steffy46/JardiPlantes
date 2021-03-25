import React, { useState } from "react";
import { Link } from "react-router-dom";

///// Styles /////
import "../styles/Header.css";

import logo from "../assets/jardiplante-logo.png";
import { HomeFilled, PropertySafetyFilled } from "@ant-design/icons";

///// Redux /////
import { connect } from "react-redux";

///// ReactStrap /////
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="jp-header">
        <img src={logo} alt="E-Shop" className="jp-logo" />

        <nav className="jp-nav-btn">

          <Navbar color="light" light expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>

                <NavItem>
                  <NavLink>
                    <Link to="/">
                      <HomeFilled />
                    </Link>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink>
                    <Link to="/wishlist">Wishlist</Link>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink>
                    <Link to="/login">Se connecter</Link>

                  </NavLink>
                </NavItem>

              </Nav>
            </Collapse>
          </Navbar>
        </nav>
      </div>

      {/* Barre décorative sous nav */}
      <div className="jp-banner"></div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    resetUserConnected: function () {
      dispatch({
        type: "reset",
      });
    },
  };
}

function mapStateToProps(state) {
  return {
    userConnected: state.userConnected,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
