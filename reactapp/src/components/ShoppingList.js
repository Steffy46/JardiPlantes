import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PlantItem from './PlantItem';
import '../styles/ShoppingList.css';

function ShoppingList() {
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const rawResponse = await fetch('/products', {
                header: {'Content-Type':'body'}
            });
            let allProducts = await rawResponse.json();
            setProductsList(allProducts.product);
        }
        getProducts()
    }, [])

        let productsPlants;
        if (productsList) {
            productsPlants = productsList.map((plant, i) => {
                return <PlantItem key={plant._id} product={plant} />
            })  
        }
        


    return (
        <div className='jp-shopping-list'>
            <Header/>

            <h1>Page Shopping</h1>
            <Link to='/' >Retourner à l'accueil</Link>

            {productsPlants}
           
            <Footer />
        </div>
    )
}

export default ShoppingList;