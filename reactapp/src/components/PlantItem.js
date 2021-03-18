import React, { useEffect, useState } from "react";

import CareScale from "./CareScale";
import "../styles/PlantItem.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { connect } from "react-redux";

function PlantItem(props) {
  const [productList, setProductsList] = useState([]);
  const [likePlant, setLikePlant] = useState({ color: "#ADADAD" });
  const [modal, setModal] = useState(false);
  const [productsCount, setProductsCount] = useState(1);

  const savedCart = localStorage.getItem("updateCart");
  const [updateCart, setUpdateCart] = useState(
    savedCart ? JSON.parse(savedCart) : []
  );

  const toggle = () => setModal(!modal);

  const article = props.product;

  // Ajouter une plante dans le panier (Nom de la plante + prix)
  function addToCart(name, price) {
    const currentPlantSaved = updateCart.find((plante) => plante.name === name);
    if (currentPlantSaved) {
      const cartFilterCurrentPlant = updateCart.filter(
        (plante) => plante.name !== name
      );
      setUpdateCart([
        ...cartFilterCurrentPlant,
        { name, price, amount: currentPlantSaved.amount + 1 },
      ]);
    } else {
      setUpdateCart([...updateCart, { name, price, amount: 1 }]);
    }
  }

  // Liste des plantes inscrites en DB
  // useEffect(() => {
  //   async function getProducts() {
  //     const rawResponse = await fetch("/products", {
  //       header: { "Content-Type": "body" },
  //     });
  //     let allProducts = await rawResponse.json();
  //     setProductsList(allProducts.products);
  //   }
  //   getProducts();
  // }, []);


  // Plantes favorites
  // useEffect(() => {
  //   const inFavorites = props.userFavorites.filter(
  //     (fav) => fav._id === props.product._id
  //   );
  //   if (inFavorites.length > 0) {
  //     setLikePlant({ color: "#FF0000" });
  //   } else {
  //     setLikePlant({ color: "#ADADAD" });
  //   }
  // }, [props.userFavorites]);

  // Alerte simple - pour test
  const handleClick = async () => {
    alert(`Vous voulez acheter la plante "${props.product.name}" ? Très bon choix 🌱✨`);
  }

  
  // const handleFavorite = async (plant, name) => {
  //   const filteredFavorite = props.userFavorites.filter(
  //     (fav) => fav._id === plant
  //   );

  //   // Ajout ou suppression d'une plante de ses favoris
  //   if (filteredFavorite.length < 1) {
  //     props.addFavoritePlant({
  //       _id: plant,
  //       name: name,
  //     });
  //     setLikePlant({ color: "#FF0000" });

  //     // Ajout d'une plante favorite en base
  //     await fetch("/wishlist-plants", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: `token=${props.userConnected.token}&newValue=${plant.name}`,
  //     });
  //   } else {
  //     props.removeFavoritePlant(plant);
  //     setLikePlant({ color: "#ADADAD" });

  //     // Suppression d'une plante favorite
  //     await fetch("/wishlist-plants", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: `token=${props.userConnected.token}&valueRemove=${plant.name}`,
  //     });
  //   }
  // };

  return (
    <div>
      <li className="jp-plant-item">
        <span className="jp-plant-item-price">{article.price} €</span>
        <img
          className="jp-plant-item-cover"
          src={article.image}
          alt={`${article.name}`}
        />
        <h3>
          <FontAwesomeIcon
            style={likePlant}
            icon={faHeart}
            onClick={() => {props.addToWishList(article)} }
          />{" "}{article.name}</h3>
        <h6>{article.category}</h6>
        <p className="jp-plant-item-desc">
      {article.description.slice(0, 100)}...{" "}

          <span style={{ color: "#31b572" }}>

            <b>
              <br />
              <span style={{ color: "#FF000" }} onClick={toggle}>Lire la suite</span>

              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                  <span style={{ marginBottom: 0 }}>{props.product.name}</span>{" "}
                  <br />{" "}
                  <span
                    style={{ color: "#bbbbbb", fontSize: "14px", marginTop: 0 }}
                  >
                    {article.category}
                  </span>
                </ModalHeader>
                <ModalBody>
                  <img
                    src={article.image}
                    style={{ width: "100px", marginRight: "20px" }}
                  />{" "}
                  {article.description}

                  <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <Button
                  onClick={() => setProductsCount(productsCount > 1 ? productsCount - 1 : 1)}
                  type="button"
                  className="btn btn-secondary"
                >
                  -
                </Button>
                <span className="btn btn-light qty">{productsCount}</span>
                <Button
                  onClick={() => setProductsCount(productsCount + 1)}
                  type="button"
                  className="btn btn-secondary"
                >
                  +
                </Button>
              </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    style={{
                      backgroundColor: "#31b572",
                      border: "0",
                      width: "120px",
                    }}
                    onClick={toggle}
                  >
                    Fermer
                  </Button>
                </ModalFooter>
              </Modal>
            </b>
          </span>{" "}
        </p>

        <div>
          <h6>Arrosage : </h6>
          <CareScale careType="water" scaleValue={article.water} />
          <p>Luminosité : </p>
          <CareScale careType="light" scaleValue={article.sun} />
          <Button onClick={toggle}>Voir la plante</Button>
          <br/>
          <Button onClick={() => handleClick()}>Alerte</Button>
          <br/>
          <Button onClick={() => addToCart(article.name, article.price)}>
          Acheter
        </Button>
        </div>
      </li>
    </div>
  );
}


function mapDispatchToProps(dispatch){
  return {
    addToWishList: function(article){
      console.log('clic detecte');
      dispatch({type: 'addArticle', 
      articleLiked: article
      })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PlantItem)

