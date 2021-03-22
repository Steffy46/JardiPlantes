import React, { useState } from "react";

///// Composant /////
import CareScale from "./CareScale";

///// Styles /////
import "../styles/PlantItem.css";

///// FontAwesome /////
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

///// ReactStrap /////
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

///// Redux /////
import { connect } from "react-redux";

function PlantItem(props) {
  // Etat - Plante favorite - couleur coeur
  // const [likePlant, setLikePlant] = useState({ color: "#ADADAD" });
  const [likePlant, setLikePlant] = useState(false);

  // Etat modal
  const [modal, setModal] = useState(false);

  // Ouverture modal
  const toggle = () => setModal(!modal);

  const article = props.product;

  // Alerte simple - pour test selection article
  const handleClick = async () => {
    alert(
      `Vous voulez acheter la plante "${article.name}" ? Très bon choix 🌱✨`
    );
  };

  // Ajouter une plante dans la wishlist au clic sur le coeur
  var saveArticle = async (article) => {
    setLikePlant(!likePlant)

    if(likePlant === false){

      props.addToWishList({
        id: article._id,
        name: article.name,
        image: article.image,
        category: article.category,
        description: article.description,
        price: article.price,
        water: article.water,
        sun: article.sun,
      });

      const saveReq = await fetch("/wishlist-plants", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `name=${article.name}&price=${article.price}&description=${article.description}&image=${article.image}&token=${props.token}`,
      });

    } else {
      props.deleteToWishList({ 
        id: article._id 
      })

      const deleteReq = await fetch("/wishlist-plants", {
        method: "DELETE",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `id=${article._id}&token=${props.token}`,
      });
    }

  };

  if(likePlant == false){
    var colorHeart = '#ADADAD'
  } else {
    var colorHeart = '#FF0000'
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
            style={{color: colorHeart}}
            icon={faHeart}
            onClick={() => {
              saveArticle(article);
            }}
          />{" "}
          {article.name}
        </h3>

        <h6>{article.category}</h6>

        <p className="jp-plant-item-desc">
          {article.description.slice(0, 100)}...{" "}
          <span style={{ color: "#31b572" }}>
            <br />
            <span
              style={{ color: "#FF000", cursor: "pointer" }}
              onClick={toggle}
            >
              <b>Lire la suite</b>
            </span>
          </span>{" "}

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
          <h5>Entretien</h5>
          <h6>Arrosage : </h6>
          <CareScale careType="water" scaleValue={article.water} />

          <h6>Luminosité : </h6>
          <CareScale careType="light" scaleValue={article.sun} />
          <br />
          <Button onClick={toggle}>Voir la plante</Button>
          <br />
          <Button onClick={() => handleClick()}>Alerte</Button>
        </div>
      </li>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      console.log("clic detecte " + article.name);
      dispatch({ 
        type: "addArticle", 
        articleLiked: article 
      });
    },
    deleteToWishList: function (id) {
      dispatch({
        type: "deleteArticle",
        title: id,
      })
    }
  };
}

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PlantItem);
