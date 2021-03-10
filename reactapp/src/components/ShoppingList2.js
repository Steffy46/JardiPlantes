import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { plantList } from '../datas/plantList';
import PlantItem from './PlantItem';
import Categories from './Categories';
import '../styles/ShoppingList.css';
import { OmitProps } from 'antd/lib/transfer/ListBody';


function ShoppingList({ updateCart, setUpdateCart }) {
    const [activeCategory, setActiveCategory] = useState('');

    const categories = plantList.reduce(
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


    return (
        <div className='jp-shopping-list'>
            <Header/>

            <h1>Page Shopping</h1>
            <Link to='/' >Retourner à l'accueil</Link>
            
            {/* Lister les différentes catégories de plantes */}
            <Categories
                categories= {categories}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
            />

            {/* Lister toutes les plantes présentent dans plantList.js */}
            <ul className='jp-plant-list'>
                {plantList.map(({ id, cover, name, light, water, price, category }) =>
                    !activeCategory || activeCategory === category ? (
                    <div key={id}>
                        <PlantItem
                            cover={cover}
                            name={name}
                            light={light}
                            water={water}
                            price={price}
                        />
                        <button onClick={() => addToCart(name, price)}>Ajouter</button>
                    </div>
                    ) : null 
                )}             
            </ul>
            
            <Footer />
        </div>
        
    )
}

function ShoppingList({props, updateCart, setUpdateCart }) {
    const [productsList, setProductsList] = useState([]);
    const [plantToDisplay, setPlantToDisplay] = useState([]);
    const [activeCategory, setActiveCategory] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const rawResponse = await fetch('/products');
            let allProducts = await rawResponse.json();
            setProductsList(allProducts.product);
            setActiveCategory(allProducts.product);
        }
        getProducts()
    }, [])

    const categories = plantList.reduce(
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

    let productsPlants = productsList.map((plant, i) => {
        return <PlantItem key={plant._id}  />
    })


    return (
        <div className='jp-shopping-list'>
            <Header/>

            <h1>Page Shopping</h1>
            <Link to='/' >Retourner à l'accueil</Link>

            {/* Lister les différentes catégories de plantes */}
             <Categories
                categories= {categories}
                setActiveCategory={setActiveCategory}
                activeCategory={activeCategory}
            />

            {/* Lister toutes les plantes présentent dans plantList.js */}
            {/* <ul className='jp-plant-list'>
                {productsList.map(({ id, cover, name, light, water, price, category }) =>
                    !activeCategory || activeCategory === category ? (
                    <div key={id}>
                        <PlantItem
                            cover={cover}
                            name={name}
                            light={light}
                            water={water}
                            price={price}
                        />
                        <button onClick={() => addToCart(name, price)}>Ajouter</button>
                    </div>
                    ) : null 
                )}             
            </ul> */}

            {productsPlants}
           
            <Footer />
        </div>
    )
}

export default ShoppingList;