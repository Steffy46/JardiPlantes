import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

///// Composants /////
import Header from "./Header";
import Footer from "./Footer";
import PlantModal from "./PlantModal";

///// Styles /////
import "../styles/ShoppingList.css";
import "../styles/PlantItem.css";

///// Redux /////
import { connect } from "react-redux";

///// ReactStrap /////
import {
  Col,
  Button,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
} from "reactstrap";

function Wishlist(props) {
  // Etat modal
  const [modal, setModal] = useState(false);
  const [favorite, setFavorite] = useState([]);
  const [change, setChange] = useState(false);

  // Ouverture modal
  const toggle = () => setModal(!modal);

  //console.log('TOGGLE', toggle)

  // Hook d'effet : Lister des articles favoris
  useEffect(() => {
    const findArticlesWishList = async () => {
      const dataWishlist = await fetch(`/wishlist-plants?token=${props.token}`);
      const body = await dataWishlist.json();

      props.saveArticles(body.article);
    };

    findArticlesWishList();
  }, [props.token]);


  // Supprimer un article de la wishlist
  var deleteArticle = async (article) => {

      props.deleteToWishList({
        id: article.id
      })
  
      console.log('TEST', article)

      const deleteReq = await fetch("/wishlist-plants", {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${article.id}&token=${props.token}`,
      });
   
    }

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
                  <br />

                  <PlantModal onClick={toggle} />
                  {/* <Modal isOpen={modal} toggle={toggle}>
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
                  </Modal> */}

                  <div>
                    <Button onClick={toggle}>Voir la fiche produit</Button>
                    <br />
                    <br />

                    <Button onClick={() => {
                      deleteArticle(article);
                      }}
                    >
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



function mapDispatchToProps(dispatch) {
  return {
    saveArticles: function (article) {
      dispatch({ 
        type: "saveArticles", 
        article: article
      });
    },
    deleteToWishList: function (id) {
      dispatch({
        type: "deleteArticle",
        title: id,
      });
    }
  };
}

function mapStateToProps(state) {
  return {
    myArticles: state.wishList,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
