import React, { useEffect, useState } from "react";

import CareScale from "./CareScale";
import "../styles/PlantItem.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import BoutonBuy from "./BoutonBuy";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card } from "reactstrap";

import { connect } from "react-redux";

function handleClick(plantName) {
  alert(`Vous voulez acheter 1 ${plantName}? Très bon choix 🌱✨`);
}

function PlantItem(props) {
  const [productsList, setProductsList] = useState([]);

  const savedCart = localStorage.getItem("updateCart");

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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

  return (
    <div>
      <Card>
      <li className="jp-plant-item" onClick={() => handleClick}>
        <span className="jp-plant-item-price">{props.product.price} €</span>
        <img
          className="jp-plant-item-cover"
          src={props.product.image}
          alt={`${props.product.name}`}
        />
        <h3>{props.product.name}</h3>
        <h6>{props.product.category}</h6>
        <p className="jp-plant-item-desc">
      {props.product.description.slice(0, 100)}...{" "}

          <span style={{ color: "#31b572" }}>

            <b>
              <br />
              <span onClick={toggle}>Lire la suite</span>

              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                  <span style={{ marginBottom: 0 }}>{props.product.name}</span>{" "}
                  <br />{" "}
                  <span
                    style={{ color: "#bbbbbb", fontSize: "14px", marginTop: 0 }}
                  >
                    {props.product.category}
                  </span>
                </ModalHeader>
                <ModalBody>
                  <img
                    src={props.product.image}
                    style={{ width: "100px", marginRight: "20px" }}
                  />{" "}
                  {props.product.description}
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
          <CareScale careType="water" scaleValue={props.product.water} />
          <p>Luminosité : </p>
          <CareScale careType="light" scaleValue={props.product.sun} />
        </div>
      </li>
      </Card>
    </div>
  );
}

export default PlantItem;
