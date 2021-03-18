import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

import logo from "../assets/jardiplante-logo.png";
import PlantItem from "../components/PlantItem";

import { HomeFilled } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
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
} from "reactstrap";

function Header() {
  const [productsCount, setProductsCount] = useState(0);
  const [productsWishList, setProductsWishList] = useState([]);
  const [productsList, setProductsList] = useState([]);


  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    async function loadData() {
      const response = await fetch("/products");
      const jsonResponse = await response.json();
      setProductsList(jsonResponse.products);

      const responseWish = await fetch("wishlist-plant");
      const jsonResponseWish = await responseWish.json();

      const wishlistFromDB = jsonResponseWish.products.map((plant, i) => {
        return { name: plant.name, img: plant.image };
      });

      setProductsWishList(wishlistFromDB);
      setProductsCount(jsonResponseWish.products.length);
    }
    loadData();
  }, []);

  const handleClickAddPlant = async (name, image) => {
    setProductsCount(productsCount + 1);
    setProductsWishList([...productsWishList, { name: name, image: image }]);

    const response = await fetch("/wishlist-plant", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${name}&image=${image}`,
    });
  };

  const handleClickDeletePlant = async (name) => {
    setProductsCount(productsCount - 1);
    setProductsWishList(
      productsWishList.filter((object) => object.name != name)
    );

    const response = await fetch(`/wishlist-plant/${name}`, {
      method: "DELETE",
    });
  };

  const cardWish = productsWishList.map((plant, i) => {
    return (
      <ListGroupItem>
        <ListGroupItemText
          onClick={() => {
            handleClickDeletePlant(plant.name);
          }}
        >
          <img width="25%" src={plant.image} /> {plant.name}
        </ListGroupItemText>
      </ListGroupItem>
    );
  });

  const productListItems = productsList.map((plant, i) => {
    var result = productsWishList.find(
      (element) => element.name === plant.name
    );
    var isSee = false;
    if (result != undefined) {
      isSee = true;
    }
    var result = plant;
    if (result.length > 80) {
      result = result.slice(0, 80) + "...";
    }
    

    return (
      <PlantItem
        key={i}
        likePlant={isSee}
        handleClickDeletePlantParent={handleClickDeletePlant}
        handleClickAddPlantParent={handleClickAddPlant}
        name={plant.name}
      />
    );
  });

  return (
    <div className="jp-header">
      <Container>
        <Nav className="jp-nav-btn">
          <span className="jp-header">
            <img src={logo} alt="E-Shop" className="jp-logo" />
          </span>

          <NavItem>
            <NavLink>
              <Button id="Popover1" type="button">
                {productsCount} Wishlist
              </Button>
              <Popover
                placement="bottom"
                isOpen={isOpen}
                target="Popover1"
                toggle={toggle}
              >
                <PopoverHeader>WishList</PopoverHeader>
                <PopoverBody>
                  <ListGroup>{cardWish}</ListGroup>
                </PopoverBody>
              </Popover>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/">
                <HomeFilled />
              </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/products">Boutique</Link>
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
          <span className="fa-layers fa-2x">
            <FontAwesomeIcon
              icon={faShoppingBag}
              size="20"
              style={{ transform: "scaleX(1)" }}
            />
            <span
              className="badge badge-pill badge-success"
              style={{
                fontSize: "8pt",
                fontWeight: 800,
                color: "white",
                // margin: "2px 0 2px 0",
                position: "absolute"
              }}
            >
            1
            </span>
          </span>
        </Nav>
      </Container>
    </div>
  );
}
