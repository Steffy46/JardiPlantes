import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import {Link} from 'react-router-dom'

import logo from '../assets/jardiplante-logo.png';
import PlantItem from '../components/PlantItem';

import { HomeFilled } from '@ant-design/icons';

import {
  Container,
  Row,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  Nav,
  NavItem,
  NavLink,
  
} from 'reactstrap';


function Wishlist(){
    // const title = 'DIY for my Baby';

    const [productsCount,setProductsCount] = useState(0)
    const [productsWishList, setProductsWishList] = useState([])
    const [productsList, setProductsList] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
      async function loadData() {
        const response = await fetch('/products')
        const jsonResponse = await response.json();
        setProductsList(jsonResponse.products)

        const responseWish = await fetch('wishlist-plant')
        const jsonResponseWish = await responseWish.json()

        const wishlistFromDB = jsonResponseWish.products.map((plant, i) => {
          return {name: plant.name, img: plant.image}
        })

        setProductsWishList(wishlistFromDB)
        setProductsCount(jsonResponseWish.products.length)
      }
      loadData();

    }, [])

    const handleClickAddPlant = async (name, image) => {
      setProductsCount(productsCount+1)
      setProductsWishList([...productsWishList, {name: name, image: image}])

      const response = await fetch('/wishlist-plant', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${name}&image=${image}`
      })
    }

    const handleClickDeletePlant = async (name) => {
      setProductsCount(productsCount-1)
      setProductsWishList(productsWishList.filter(object => object.name != name))

      const response = await fetch(`/wishlist-plant/${name}`, {
        method: 'DELETE'
      })
    }

    const cardWish = productsWishList.map((plant, i) => {
      return (
        <ListGroupItem>
          <ListGroupItemText onClick={() => {handleClickDeletePlant(plant.name)}}>
          <img width="25%" src={plant.img} /> {plant.name}
          </ListGroupItemText>
        </ListGroupItem>
      )
    })

    const productListItems = productsList.map((plant, i) => {
      var result = productsWishList.find(element => element.name === plant.name)
      var isSee = false
      if(result != undefined){
        isSee = true
      }
      var result = plant.overview
      if(result.length > 8){
        result = result.slice(0, 8)+'...'
      }

      return(<PlantItem key={i} likePlant={isSee} handleClickDeletePlantParent={handleClickDeletePlant} handleClickAddPlantParent={handleClickAddPlant} name={plant.name} description={result} />)

    })

    return (
      <div style={{backgroundColor:"#232528"}}>
      <Container>
        <Nav>
          <span className="navbar-brand">
            <img src="./logo.png" width="30" height="30" className="d-inline-block align-top" alt="logo" />
          </span>
          <NavItem>
            <NavLink style={{color:'white'}}>Last Releases</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button id="Popover1"  type="button">{productsCount} plantes</Button>
              <Popover placement="bottom" isOpen={isOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>WishList</PopoverHeader>
                <PopoverBody>
                <ListGroup>
                {cardWish}
                </ListGroup>
                </PopoverBody>
              </Popover>
            </NavLink>
          </NavItem>
        </Nav>
        <Row>
          {productListItems}
        </Row>
      </Container>
    </div>
      // <div>
      //   <div className='jp-header'>

      //       <img src={logo} alt='E-Shop' className='jp-logo' />


      //       <nav className='jp-nav-btn'>
      //           {/* <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

      //       <Menu.Item key="mail" style={{marginRight: '50px'}}>
      //         <Link to="/">
      //         <HomeFilled />
      //         </Link>
      //       </Menu.Item>

      //       <Menu.Item key="test" style={{marginRight: '50px'}}>
      //         <Link to="/shop">
      //           Boutique
      //         </Link>
      //       </Menu.Item>

      //       <Menu.Item key="app" style={{marginRight: '50px'}}>
      //         <Link to="/login">
      //           Se connecter
      //         </Link>
      //       </Menu.Item>

      //     </Menu> */}

      //     <Navbar color="light" light expand="md">
      //   <NavbarToggler onClick={toggle} />
      //   <Collapse isOpen={isOpen} navbar>
      //     <Nav className="mr-auto" navbar>
      //       <NavItem>
      //         <NavLink><Link to="/">
      //         <HomeFilled />
      //         </Link></NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink><Link to="/products">
      //           Boutique
      //         </Link></NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink><Link to="/wishlist">
      //           Wishlist
      //         </Link></NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink>
      //           <Link to="/login">
      //           Se connecter
      //         </Link>
      //         </NavLink>
      //       </NavItem>
      //     </Nav>
      //   </Collapse>
      // </Navbar>
      //     </nav> 
      //   </div>

      // </div>
    );
}

export default Wishlist;