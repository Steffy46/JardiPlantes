import React, {useState, useEffect} from 'react';
import Header from './Header';
import Cart from './Cart';
import Footer from './Footer';
import ShoppingList from './ShoppingList';
import '../styles/Layout.css'

import { Col } from "reactstrap";

function Home(){

    const savedCart = localStorage.getItem('updateCart')
	const [updateCart, setUpdateCart] = useState(savedCart ? JSON.parse(savedCart) : [])

    useEffect(() => {
        localStorage.setItem('updateCart', JSON.stringify(updateCart))
      }, [updateCart])

    return (
        <Col xs="6" md="9" lg="12">
            <div>
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