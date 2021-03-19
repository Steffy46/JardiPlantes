import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CareScale from "./CareScale";

import "../styles/ShoppingList.css";
import { LikeFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import "../styles/PlantItem.css";

import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Wishlist(props) {
  const [productsList, setProductsList] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const article = props.product;

  let noArticles;
  if (props.myArticles == 0) {
    noArticles = (
      <div style={{ marginTop: "20px" }}>
        Vous n'avez ajouté aucune plante à vos favoris
      </div>
    );
  }

  return (
    <Col lg="12">
      <div>
        <Header />
      </div>

      <div className='jp-layout-inner' md="6" sm="2">
        <h1>Ma wishlist</h1>
        <Link to="/">Retourner à l'accueil</Link>

        <div>{noArticles}</div>

        <div className="jp-plant-item" >
          {props.myArticles.map((plant, i) => {
            return (
            <div key={i} className="jp-plant-item">

              <li className="jp-plant-item">
                <span className="jp-plant-item-price">{plant.price} €</span>
                <img
                  className="jp-plant-item-cover"
                  src={plant.image}
                  alt={`${plant.name}`}
                />
                <h3>{plant.name}</h3>
                <h6>{plant.category}</h6>
               
                <div>
                  <h6>Arrosage : </h6>
                  <CareScale careType="water" scaleValue={plant.water} />
                  <p>Luminosité : </p>
                  <CareScale careType="light" scaleValue={plant.sun} />
                  <br />
                  <Button onClick={() => props.deleteToWishList(article)}>
                    Supprimer de mes favoris
                  </Button>
                </div>
              </li>
            </div>
            )
          })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </Col>
  );
}

function mapStateToProps(state) {
  return { 
    myArticles: state.wishList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (articleTitle) {
      dispatch({ 
        type: "deleteArticle", 
        title: articleTitle 
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
