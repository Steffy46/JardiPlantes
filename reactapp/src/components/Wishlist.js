import React, { useState } from "react";
import { Link } from "react-router-dom";
import CareScale from "./CareScale";

import "../styles/ShoppingList.css";
import { LikeFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import "../styles/PlantItem.css";



import { Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Wishlist(props) {
  const [productsList, setProductsList] = useState([]);
  const [modal, setModal] = useState(false);


  const toggle = () => setModal(!modal);

  const article = props.product;

  let noArticles
  if(props.myArticles === 0){
    noArticles = <div style={{marginTop: "120px"}}>Vous n'avez ajouté aucune plante à vos favoris</div>
  }

  return (
    <Col xs="6" md="9" lg="12">
      <div className="jp-shopping-list">
        <h1>Ma wishlist</h1>
        <Link to="/">Retourner à l'accueil</Link>

       <div>{noArticles}</div> 

        {/* <div className="jp-plant-item">
          {props.myArticles.map((plant, i) => {
            <div key={i} className="jp-plant-item">
              {/* <PlantItem product={plant} /> */}

              {/* <li className="jp-plant-item">
                <span className="jp-plant-item-price">{plant.price} €</span>
                <img
                  className="jp-plant-item-cover"
                  src={plant.image}
                  alt={`${plant.name}`}
                />
                <h3>
                  <FontAwesomeIcon
                    style={props.likePlant}
                    icon={faHeart}
                    onClick={() => {
                      props.addToWishList(article);
                    }}
                  />{" "}
                  {plant.name}
                </h3>
                <h6>{plant.category}</h6>
                <p className="jp-plant-item-desc">
                  {plant.description.slice(0, 100)}...{" "}
                  <span style={{ color: "#31b572" }}>
                    <b>
                      <br />
                      <span style={{ color: "#FF000" }} onClick={toggle}>
                        Lire la suite
                      </span>

                      <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>
                          <span style={{ marginBottom: 0 }}>
                            {plant.name}
                          </span>{" "}
                          <br />{" "}
                          <span
                            style={{
                              color: "#bbbbbb",
                              fontSize: "14px",
                              marginTop: 0,
                            }}
                          >
                            {plant.category}
                          </span>
                        </ModalHeader>
                        <ModalBody>
                          <img
                            src={plant.image}
                            style={{ width: "100px", marginRight: "20px" }}
                          />{" "}
                          {plant.description}
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <Button
                              onClick={() =>
                                props.setProductsCount(
                                  props.productsCount > 1 ? props.productsCount - 1 : 1
                                )
                              }
                              type="button"
                              className="btn btn-secondary"
                            >
                              -
                            </Button>
                            <span className="btn btn-light qty">
                              {props.productsCount}
                            </span>
                            <Button
                              onClick={() =>
                                props.setProductsCount(props.productsCount + 1)
                              }
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
                  <CareScale careType="water" scaleValue={plant.water} />
                  <p>Luminosité : </p>
                  <CareScale careType="light" scaleValue={plant.sun} />
                  <Button onClick={toggle}>Voir la plante</Button>
                  <br />
                  <Button onClick={() => props.deleteToWishList(article.title)}>Supprimer de mes favoris</Button>
                  <br />
                  {/* <Button
                    onClick={() => addToCart(article.name, article.price)}
                  >
                    Acheter
                  </Button> */}
                {/* </div>
              </li> */}
            {/* </div>;
          })} */}
        {/* </div> */} 
      </div>
    </Col>
  );
}

function mapStateToProps(state) {
  return { myArticles: state.wishList };
}

function mapDispatchToProps(dispatch){
  return {
    deleteToWishList: function(articleTitle){
      dispatch({type: 'deleteArticle', 
      title: articleTitle
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
