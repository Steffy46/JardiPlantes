import React, { useState } from 'react';
import '../styles/Header.css';
import {Link} from 'react-router-dom'

import logo from '../assets/jardiplante-logo.png';

import { HomeFilled } from '@ant-design/icons';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

function Header(){
    // const title = 'DIY for my Baby';

    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    return (
      <div>
        <div className='jp-header'>

            <img src={logo} alt='E-Shop' className='jp-logo' />


            <nav className='jp-nav-btn'>
                {/* <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

            <Menu.Item key="mail" style={{marginRight: '50px'}}>
              <Link to="/">
              <HomeFilled />
              </Link>
            </Menu.Item>

            <Menu.Item key="test" style={{marginRight: '50px'}}>
              <Link to="/shop">
                Boutique
              </Link>
            </Menu.Item>

            <Menu.Item key="app" style={{marginRight: '50px'}}>
              <Link to="/login">
                Se connecter
              </Link>
            </Menu.Item>

          </Menu> */}

          <Navbar color="light" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to="/">
              <HomeFilled />
              </Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/products">
                Boutique
              </Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/wishlist">
                Wishlist
              </Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Link to="/login">
                Se connecter
              </Link>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
          </nav> 
        </div>

      <div className='jp-banner'></div>
      </div>
    )
}

export default Header;