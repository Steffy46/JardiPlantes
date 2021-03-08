import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PlantItem from './PlantItem';
import Categories from './Categories';

import '../styles/ShoppingList.css';
import { LikeFilled } from '@ant-design/icons';
import { connect } from 'react-redux';



import { Col } from 'reactstrap';

function ShoppingList({props, updateCart, setUpdateCart }) {
    const [productsList, setProductsList] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');

    const categories = productsList.reduce(
        (acc, plant) =>
            acc.includes(plant.category) ? acc : acc.concat(plant.category), 
        []
    )

    function addToCart(name, price) {
        const currentPlantSaved = updateCart.find((plant) => plant.name === name)
        if (currentPlantSaved) {
            const cartFilterCurrentPlant = updateCart.filter(
                (plant) => plant.name !== name
            )
            setUpdateCart([
                ...cartFilterCurrentPlant,
                { name, price, amount: currentPlantSaved.amount + 1 }
            ])
        } else {
            setUpdateCart([...updateCart, { name, price, amount: 1 }])
        }
                
    }

    useEffect(() => {
        async function getProducts() {
            const rawResponse = await fetch('/products', {
                header: {'Content-Type':'body'}
            });
            let allProducts = await rawResponse.json();
            setProductsList(allProducts.products);
        }
        getProducts()
    }, [])
    
    const saveProduct = async plant => {
        productsPlants.addToWishList(plant)

        const saveReq = await fetch('/wishlist-plants', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `category=${plant.category}&name=${plant.name}&description=${plant.description}&price=${plant.price}&image=${plant.image}&water=${plant.water}&sun=${plant.water}&token=${props.token}`
        })
    }

    let productsPlants = productsList.map((plant, i) => {
        return <div><PlantItem 
        key={plant._id} 
        product={plant} 
        likePlant
        actions={[
            <LikeFilled onClick={()=> {saveProduct(plant)}} />
        ]} />
        <button onClick={() => addToCart(plant.name, plant.price)}>Acheter</button>
        </div>
    }) 

    return (
        
            <Col xs="6" md="9" lg="12">
            <div className='jp-shopping-list'>
            <h1>Page Shopping</h1>
            <Link to='/' >Retourner à l'accueil</Link>

            {/* Lister les différentes catégories de plantes */}
             <Categories
                categories= {categories}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
            />

            {productsPlants}

            </div>
            
            
            </Col>
  
    )
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

export default connect(
    null,
    mapDispatchToProps
  )(ShoppingList);