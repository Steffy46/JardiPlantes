import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

///// Styles /////
import "../styles/ShoppingList.css";
import "../styles/PlantItem.css";

///// Composant /////
import CareScale from "./CareScale";


///// ReactStrap /////
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function PlantModal(props) {
  // Etat modal
  const [modal, setModal] = useState(false);

  // Ouverture modal
  const toggle = () => setModal(!modal);



  return (
    <div className="jp-plant-item">
      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> */}
        <Modal>
        <ModalHeader>
          <span style={{ marginBottom: 0 }}>{props.name}</span> <br />{" "}
          <span
            style={{
              color: "#bbbbbb",
              fontSize: "14px",
              marginTop: 0,
            }}
          >
            {props.category}
          </span>
        </ModalHeader>

        <ModalBody>
          <img
            src={props.image}
            style={{ width: "100px", marginRight: "20px" }}
          />{" "}
          {props.description}
          <div
            className="btn-group"
            role="group"
            aria-label="Basic example"
          ></div>
          <div>
            <h6>Arrosage : </h6>
            <CareScale careType="water" scaleValue={props.water} />
            <p>Luminosité : </p>
            <CareScale careType="light" scaleValue={props.sun} />
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
    </div>
  );
}

export default PlantModal;
