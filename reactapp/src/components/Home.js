import React, {useState, useEffect} from 'react';
import Header from './Header';
import Cart from './Cart';
import Footer from './Footer';
import ShoppingList from './ShoppingList';
import '../styles/Layout.css'

function Home(){

    const savedCart = localStorage.getItem('updateCart')
	const [updateCart, setUpdateCart] = useState(savedCart ? JSON.parse(savedCart) : [])

    useEffect(() => {
        localStorage.setItem('updateCart', JSON.stringify(updateCart))
      }, [updateCart])

    return (
        <div>
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
        </div>

        
    )
}

export default Home;