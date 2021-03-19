import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlantItem from "./PlantItem";
import Categories from "./Categories";

import "../styles/ShoppingList.css";

import "../styles/PlantItem.css";

import { Col, Button } from "reactstrap";

function ShoppingList({updateCart, setUpdateCart}) {
  const [productsList, setProductsList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const categories = productsList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  );

  function addToCart(name, price) {
    const currentPlantSaved = updateCart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      const cartFilterCurrentPlant = updateCart.filter(
        (plant) => plant.name !== name
      );
      setUpdateCart([
        ...cartFilterCurrentPlant,
        { name, price, amount: currentPlantSaved.amount + 1 },
      ]);
    } else {
      setUpdateCart([...updateCart, { name, price, amount: 1 }]);
    }
  }

  useEffect(() => {
    async function getProducts() {
      const rawResponse = await fetch("/products", {
        header: { "Content-Type": "body" },
      });
      let allProducts = await rawResponse.json();
      setProductsList(allProducts.products);
    }
    getProducts();
  }, []);




  let productsPlants = productsList.map((plant, i) => {
    return !activeCategory || activeCategory === plant.category ? (
      <div className="jp-plant-item" key={i}>
        <PlantItem
          product={plant}
        />
        <Button
        style={{ backgroundColor: '#31b572', border: '0', width: '200px', alignItems: "center" }}
        onClick={() => addToCart(plant.name, plant.price)}
        >
          Ajouter au panier
        </Button>
      </div>
    ) : null;
  });

  
  return (
    <Col xs="6" md="9" lg="12">
      <div className="jp-shopping-list">
        <h1>Page shopping</h1>
        <Link to="/">Retourner à l'accueil</Link>

        {/* Lister les différentes catégories de plantes */}
        <Categories
          categories={categories}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <div className='jp-plant-item'>

        {productsPlants}
        </div>
        
      </div>
    </Col>
  );
}

export default ShoppingList