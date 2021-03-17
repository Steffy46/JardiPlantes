import React, { useEffect, useState } from "react";

import CareScale from "./CareScale";
import "../styles/PlantItem.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { connect } from "react-redux";

export function handleClick(plantName) {
  alert(`Vous voulez acheter 1 ${plantName}? Très bon choix 🌱✨`);
}

function PlantItem(props) {
  const [productsList, setProductsList] = useState([]);
  const [plantItem, setPlantItem] = useState(false);

  const savedCart = localStorage.getItem("updateCart");
  // const [updateCart, setUpdateCart] = useState(savedCart ? JSON.parse(savedCart) : [])

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [productsCount, setProductsCount] = useState(1);

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

  const changeLiked = (name, image) => {
    if (props.likePlant === true) {
      props.handleClickDeletePlantParent(name);
    } else {
      props.handleClickAddPlantParent(name, image);
    }
  };

  if (props.likePlant) {
    var colorLike = { color: "#E74C3C", cursor: "pointer" };
  } else {
    var colorLike = { cursor: "pointer" };
  }

  return (
    <div>
      <li className="jp-plant-item" onClick={() => handleClick}>
        <span className="jp-plant-item-price">{props.product.price} €</span>
        <img
          className="jp-plant-item-cover"
          src={props.product.image}
          alt={`${props.product.name}`}
        />
        <h3>
          <FontAwesomeIcon
            style={colorLike}
            icon={faHeart}
            onClick={() => changeLiked(props.product.name, props.product.image)}
          />{" "}
          {props.product.name}
        </h3>
        <h6>{props.product.category}</h6>
        <p className="jp-plant-item-desc">
          {props.product.description.slice(0, 100)} ...{" "}
          <span style={{ color: "#FF000" }}>
            <b>Lire la suite</b>
          </span>{" "}
        </p>

        <div>
          <p>
            Arrosage :{" "}
            <CareScale careType="water" scaleValue={props.product.water} />
          </p>
          <p>
            Luminosité :{" "}
            <CareScale careType="light" scaleValue={props.product.sun} />
          </p>
        </div>
        <Button onClick={toggle}>Voir la plante</Button>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            <span style={{ marginBottom: 0 }}>{props.product.name}</span> <br />{" "}
            <span style={{ color: "#bbbbbb", fontSize: "14px", marginTop: 0 }}>
              {props.product.category}
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="col-sm-4">
              <img
                src={props.product.image}
                style={{ width: "100px", marginRight: "20px" }}
              />{" "}
            </div>

            <div className="col-sm">
              {props.product.description}
              <h3 className="price">€{props.product.price}</h3> <br />
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
              <FontAwesomeIcon
                style={colorLike}
                // onClick={() => addPlant()}
              />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              style={{
                border: "0",
                width: "120px",
              }}
              onClick={toggle}
            >
              Fermer
            </Button>
            <Button
                color="secondary"
                style={{
                  backgroundColor: "#31b572",
                  border: "0",
                  width: "120px",
                }}
              >
                Ajouter au
              </Button>
          </ModalFooter>
        </Modal>
      </li>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    changeLiked: function (plant) {
      dispatch({ type: "addToWishlist", plantLiked: plant });
    },
    saveProducts: function (plant) {
      dispatch({ type: "saveProducts", plantLiked: plant });
    },
  };

  // deleteToWishList: function (plant) {
  //   dispatch({ type: "deleteProducts", plantLiked: plant });
  // },
}

function mapStateToProps(state) {
  return { token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlantItem);
