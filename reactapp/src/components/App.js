import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Cart from './Cart';
import Login from './Login';
import Footer from './Footer';
import ShoppingList from './ShoppingList';
import Wishlist from './Wishlist';
import '../styles/Layout.css';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux'

/////  Reducers  //////
import token from '../reducers/token';
import userConnected from '../reducers/userConnected'
import wishList from '../reducers/favorites';

const store = createStore(combineReducers({token, userConnected, wishList}))

function App() {
  

  return (
    <div className="Font-link">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/products' component={ShoppingList} />
            <Route path='/wishlist' component={Wishlist} />
            <Route path='/header' component={Header} />
            <Route path='/cart' component={Cart} />
            <Route path='/login' component={Login} />
            <Route path='/footer' component={Footer} />
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App;
