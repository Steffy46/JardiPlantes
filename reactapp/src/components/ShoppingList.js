import React, { useEffect, useState } from "react";

///// Composants /////
import PlantItem from "./PlantItem";
import Categories from "./Categories";

///// Styles /////
import "../styles/ShoppingList.css";
import "../styles/PlantItem.css";

///// ReactStrap /////
import { Col, Button } from "reactstrap";

function ShoppingList({ updateCart, setUpdateCart }) {
  const [productsList, setProductsList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  // Catégorie des plantes
  const categories = productsList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  );

  // Ajout des articles dans le panier
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

  // Appel vers la route /products --> tous les articles
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

  // Map des articles (plantes) / Condition ternaire des catégories des produits
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
    <Col>
      <div className="jp-shopping-list">
        <h1>Page shopping</h1>

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