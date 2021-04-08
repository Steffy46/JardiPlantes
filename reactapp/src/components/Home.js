import React, {useState, useEffect} from 'react';

///// Composants /////
import Header from './Header';
import Cart from './Cart';
import Footer from './Footer';
import ShoppingList from './ShoppingList';

///// Styles /////
import '../styles/Layout.css'

///// ReactStrap /////
import { Col } from "reactstrap";

///// Redux /////
import { connect } from "react-redux";


function Home(props){

    // Local storage du panier d'achat
    const savedCart = localStorage.getItem('updateCart')
	const [updateCart, setUpdateCart] = useState(savedCart ? JSON.parse(savedCart) : [])

    // Local storage des favoris
    // const savedFavorite = localStorage.getItem('updateFavorite')
	// const [updateFavorite, setUpdateFavorite] = useState(savedFavorite ? JSON.parse(savedFavorite) : [])

    const [welcome, setWelcome] = useState('HOME');

    useEffect(() => {
        // Local storage du panier d'achat
        localStorage.setItem('updateCart', JSON.stringify(updateCart))

        // Local storage des favoris
        // localStorage.setItem('updateFavorite', JSON.stringify(updateFavorite))


      }, updateCart)

    return (
        <Col xs="12" md="9" lg="12">
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

function mapDispatchToProps(dispatch) {
    return {
        onRecordUserConnected: function (user) {
            dispatch({
                type: 'record',
                user: user
            })
        },
        resetUserConnected: function () {
            dispatch({
                type: 'reset'
            })
        },
        retrieveArticle: function (listFavorites) {
            dispatch({
                type: 'retrieveArticle',
                listFavorites: listFavorites
            })
        }
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.wishList,
        user: state.userConnected
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);