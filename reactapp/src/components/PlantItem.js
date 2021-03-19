import React, { useState } from "react";

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

  // Alerte simple - pour test
  const handleClick = async () => {
    alert(`Vous voulez acheter la plante "${article.name}" ? Très bon choix 🌱✨`);
  }

  var saveArticle = async article => {
    props.addToWishList({
      name: article.name,
      image: article.image,
      category: article.category,
      description: article.description,
      price: article.price,
      water: article.water,
      sun: article.sun
    })

    if (saveArticle.length > 0) {
           setLikePlant({ color: "#FF0000" });
         } else {
           setLikePlant({ color: "#ADADAD" });
         }

    const saveReq = await fetch('/wishlist-plants', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `name=${article.name}&price=${article.price}&description=${article.description}&image=${article.image}&token=${props.token.token}`
    })
  }

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
            onClick={() => {saveArticle(article)} }
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
        </div>
      </li>
    </div>
  );
}


function mapDispatchToProps(dispatch){
  return {
    addToWishList: function(article){
      console.log('clic detecte ' + article.name);
      dispatch({type: 'addArticle', 
      articleLiked: article
      })
    }
  }
}

function mapStateToProps(state) {
  return { 
    token: state.token
   };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlantItem)

