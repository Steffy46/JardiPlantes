import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { plantList } from '../datas/plantList';
import PlantItem from './PlantItem';
import Categories from './Categories';
import '../styles/ShoppingList.css';

import { connect } from 'react-redux';

function Catalogue(props) {

    const [newProduct, setNewProduct] = useState ([])

    useEffect(() => {
        async function getProduct() {
            const rawResponse = await fetch(`/products`)
            const response = await rawResponse.json();
            console.log(response);
        }
        getProduct()
    }, [])

    return (
        <div className='jp-shopping-list'>
            <Header/>

            <h1>Page Catalogue</h1>
            <Link to='/' >Retourner à l'accueil</Link>
            

            {/* Lister toutes les plantes */}
            <ul className='jp-plant-list'>
          
            </ul>
            
            <Footer />
        </div>
    )
}

export default Catalogue;