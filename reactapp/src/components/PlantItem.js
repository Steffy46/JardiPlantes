import React, { useEffect, useState } from 'react';

import CareScale from "./CareScale";
import "../styles/PlantItem.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import BoutonBuy from './BoutonBuy';

import { 
    Button
   } from 'reactstrap';

import { connect } from 'react-redux';


function handleClick(plantName) {
  alert(`Vous voulez acheter 1 ${plantName}? Très bon choix 🌱✨`);
}

function PlantItem(props) {

    const [likePlant, setLikePlant] = useState({ color: '#ADADAD'});
    const savedCart = localStorage.getItem('updateCart')
	const [updateCart, setUpdateCart] = useState(savedCart ? JSON.parse(savedCart) : [])

    const plant = props.product;

    function addToCart(name, price) {
        const currentPlantSaved = updateCart.find((plante) => plante.name === name);
        if (currentPlantSaved) {
          const cartFilterCurrentPlant = updateCart.filter(
            (plante) => plante.name !== name
          );
          setUpdateCart([
            ...cartFilterCurrentPlant,
            { name, price, amount: currentPlantSaved.amount + 1 },
          ]);
        } else {
          setUpdateCart([...updateCart, { name, price, amount: 1 }]);
        }
    }

    useEffect(() => {
        const inFavorites = props.userFavorites.filter(fav => fav._id === props.product._id);
        if (inFavorites.length > 0) {
            setLikePlant({ color: '#FF0000' })
        } else {
            setLikePlant({ color : '#ADADAD' })
        }

    }, [props.userFavorites])

    const handleFavorite = async (plant, name) => {
        const filteredFavorite = props.userFavorites.filter(fav => fav._id === plant);

        // Ajout ou suppression d'une plante de ses favoris
        if (filteredFavorite.length < 1) {
            props.addFavoritePlant({
                _id: plant,
                name: name
            })
            setLikePlant({ color: '#FF0000' })

            // Ajout d'une plante favorite en base
            await fetch('/wishlist-plants', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&newValue=${plant}`
            })
        } else {
            props.removeFavoritePlant(plant)
            setLikePlant({ color : '#ADADAD' })

            // Suppression d'une plante favorite
            await fetch('/wishlist-plants', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `token=${props.userConnected.token}&valueRemove=${plant}`
            })
        }
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
        <p>Like <FontAwesomeIcon style={likePlant} icon={faHeart} onClick={() => handleFavorite(plant._id, plant.name)} /></p>
        <h3>{props.product.name}</h3>
        <h6>{props.product.category}</h6>
        <p className="jp-plant-item-desc">
          {props.product.description.slice(0, 100)} ...{" "}
          <span style={{ color: "#FF0000" }}>
            <b>
              <br />
              Lire la suite
            </b>
          </span>{" "}
        </p> 

        <div>
          <h6>Arrosage : </h6>
          <CareScale careType="water" scaleValue={props.product.water} />
          <p>Luminosité : </p>
          <CareScale careType="light" scaleValue={props.product.sun} />
        </div>

        {/* <BoutonBuy /> */}

        <Button onClick={() => addToCart(plant.name, plant.price)}>Acheter</Button> 
      </li>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
    return {
        addFavoritePlant: function (plant) {
            dispatch({
                type: 'addFavoritePlant',
                plant
            })
        },
        removeFavoritePlant: function (plant) {
            dispatch({
                type: 'removeFavoritePlant',
                plant
            })
        }
    }
}

function mapStateToProps(state) {
    return {
        userFavorites: state.userFavorites,
        userConnected: state.userConnected
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlantItem)

