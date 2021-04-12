import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

///// Composants /////
import Header from "./Header";
import Footer from "./Footer";

///// Styles /////
import "../styles/ShoppingList.css";
import "../styles/PlantItem.css";
import "../styles/Layout.css";

///// Redux /////
import { connect } from "react-redux";

///// ReactStrap /////
import {
  Col,
  Button
} from "reactstrap";

function Wishlist(props) {

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
    <Col xs="12">
      <div>
        <Header />
      </div>

      <div className="jp-layout" >
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

                  <div>
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
