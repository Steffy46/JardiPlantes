import React, {useState, useEffect} from 'react';

///// Composants /////
import Header from './Header';
import Cart from './Cart';
import Footer from './Footer';
import ShoppingList from './ShoppingList';
import Wishlist from './Wishlist';

///// Styles /////
import '../styles/Layout.css'

///// ReactStrap /////
import { Col } from "reactstrap";



function Home(){

    // Local storage du panier d'achat
    const savedCart = localStorage.getItem('updateCart')
	const [updateCart, setUpdateCart] = useState(savedCart ? JSON.parse(savedCart) : [])

    // Local storage des favoris
    const savedFavorite = localStorage.getItem('updateFavorite')
	const [updateFavorite, setUpdateFavorite] = useState(savedFavorite ? JSON.parse(savedFavorite) : [])


    useEffect(() => {
        // Local storage du panier d'achat
        localStorage.setItem('updateCart', JSON.stringify(updateCart))

        // Local storage des favoris
        localStorage.setItem('updateFavorite', JSON.stringify(updateFavorite))


      }, [updateCart, updateFavorite])

    return (
        <Col xs="6" md="9" lg="12">
            <div className="Font-link">
                <Header/>
            </div>
            <div className='jp-layout-inner'>
				<Cart updateCart={updateCart} setUpdateCart={setUpdateCart} />
				<ShoppingList updateCart={updateCart} setUpdateCart={setUpdateCart} />
			</div>
            <div>
                <Footer />
            </div> 
        </Col>

        
    )
}

export default Home;