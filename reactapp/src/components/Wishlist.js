import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Categories.css'

import { Card, Modal} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { LikeFilled } from "@ant-design/icons";

import { connect } from "react-redux";


const { Meta } = Card;

function Wishlist(props) {

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleFavorite = '';

  useEffect(() => {
    const findPlantsWishList = async () => {
      const dataWishlist = await fetch(`/wishlist-plants?token=${props.token}`)
      const body = await dataWishlist.json()

      props.savePlants(body.plants)
    }

    findPlantsWishList()
  },[])

  var deletePlant = async (name) => {
    props.deleteToWishList(name)

    const deleteReq = await fetch('/wishlist-article', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `name=${name}&token=${props.token}`
    })
  }

  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var noArticles
  if(props.myProducts == 0){
    noArticles = <div style={{marginTop:"30px"}}>No Articles</div>
  }


    return (
        <div className='jp-shopping-list'>
            <Header/>

            <h1>Page Wishlist</h1>
            <Link to='/' >Retourner à l'accueil</Link>
            

            {/* Lister toutes les plantes */}
            <ul className='jp-plant-list'>
            {noArticles}

            {props.myProducts.map((plant,i) => (
                <div key={i} style={{display:'flex',justifyContent:'center'}}>

                  <Card
                    
                    style={{ 
                    width: 300, 
                    margin:'15px', 
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent:'space-between' }}
                    cover={
                    <img
                        alt="example"
                        src={plant.image}
                    />
                    }
                    actions={[
                        // <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title,article.content)} />,
                        <LikeFilled onClick={() => deletePlant(plant.name)} />,
                        <FontAwesomeIcon icon={faHeart} onClick={() => handleFavorite(plant._id, plant.name)} />
                    ]}
                    >

                    <Meta
                      title={plant.name}
                      description={plant.description}
                    />

                  </Card>
                  <Modal
                    title={title}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>{title}</p>
                  </Modal>

                </div>

              ))}

            </ul>
            
            <Footer />
        </div>
    )
}

function mapStateToProps(state){
    return {myProducts: state.wishList, token:state.token}
  }
  
  function mapDispatchToProps(dispatch){
    return {
      deleteToWishList: function(plantTitle){
        dispatch({type: 'deletePlant',
          title: plantTitle
        })
      },
      savePlants: function(plants){
        dispatch({type: 'saveArticles',
          plants: plants
        })
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wishlist);
  