import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PlantItem from './PlantItem';
import '../styles/ShoppingList.css';

import { Col } from 'reactstrap';

function ShoppingList() {
    const [productsList, setProductsList] = useState([]);

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

        
           let productsPlants = productsList.map((plant, i) => {
                return <PlantItem key={plant._id} product={plant} />
            })  
        

    return (
        
            <Col xs="3" md="6" lg="9" xl="12">
            <div className='jp-shopping-list'>
            <h1>Page Shopping</h1>
            <Link to='/' >Retourner à l'accueil</Link>

            {productsPlants}
            </div>
            
            
            </Col>
  
    )
}

export default ShoppingList;