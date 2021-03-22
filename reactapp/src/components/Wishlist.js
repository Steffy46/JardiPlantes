import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

///// Composants /////
import Header from "./Header";
import Footer from "./Footer";
import CareScale from "./CareScale";

///// Styles /////
import "../styles/ShoppingList.css";
import "../styles/PlantItem.css";

///// Redux /////
import { connect } from "react-redux";

///// ReactStrap /////
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function Wishlist(props) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const article = props.product;

  // Hook d'effet : Lister des articles favoris du user
  useEffect(() => {
    const findArticlesWishList = async () => {
      const dataWishlist = await fetch(`/wishlist-plants?token=${props.token}`);
      const body = await dataWishlist.json();
    };

    findArticlesWishList();
  });

  // Supprimer un article de la wishlist
  var deleteArticle = async (article) => {
    props.deleteToWishList();

    const deleteReq = await fetch("/wishlist-plants", {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${article}&token=${props.token}`,
    });

    console.log("____CONSOLE LOG_______" + " " + article);
  };

  // Pas d'articles dans la wishlist
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

      <div className="jp-layout-inner" md="6" sm="2">
        <h1>Ma wishlist</h1>
        <Link to="/">Retourner à l'accueil</Link>

        <div>{noArticles}</div>

        <div className="jp-plant-item">
          {props.myArticles.map((article, i) => {
            return (
              <div key={i} className="jp-plant-item">

                <li className="jp-plant-item">
                  <span className="jp-plant-item-price">{article.price} €</span>
                  <img
                    className="jp-plant-item-cover"
                    src={article.image}
                    alt={`${article.name}`}
                  />
                  <h3>{article.name}</h3>
                  <h6>{article.category}</h6>
                  <p className="jp-plant-item-desc">
                    <br />

                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>
                        <span style={{ marginBottom: 0 }}>{article.name}</span>{" "}
                        <br />{" "}
                        <span
                          style={{
                            color: "#bbbbbb",
                            fontSize: "14px",
                            marginTop: 0,
                          }}
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
                        ></div>
                        <div>
                          <h6>Arrosage : </h6>
                          <CareScale
                            careType="water"
                            scaleValue={article.water}
                          />
                          <p>Luminosité : </p>
                          <CareScale careType="light" scaleValue={article.sun} />

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
                  </p>

                  <div>
                    <Button onClick={toggle}>Voir la fiche produit</Button>
                    <br />

                    <Button onClick={() => deleteArticle(article.name)}>
                      Supprimer de mes favoris
                    </Button>
                  </div>
                </li>
              </div>
            );
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
    myArticles: state.wishList,
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (articleTitle) {
      dispatch({
        type: "deleteArticle",
        title: articleTitle,
      })
    },
    saveArticles: function(articles){
      dispatch({type: 'saveArticles',
        articles: articles
      })
    }
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Wishlist);
