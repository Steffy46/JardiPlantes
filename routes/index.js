const express = require('express');
const router = express.Router();

// Sécurité user : token + cryptage du password
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const UserModel = require('../models/users');
const ProductModel = require('../models/product');

////// USER : SIGN-IN SIGN-UP //////
// Enregistrement du user
router.post('/sign-up', async function(req, res, next){

  var error = [];
  let result = false;
  let saveUser = null;
  var token = null;

  const data = await UserModel.findOne({
    email: req.body.emailFromfront
  })

  if(data != null){
    error.push('Cette adresse email existe déjà !')
  }

  if(req.body.lastnameFromFront === ''
  || req.body.emailFromFront === ''
  || req.body.passwordFromFront === ''
  ){
    error.push('Champs vides')
  }

  if (error.length == 0) {
    var hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    const newUser = new UserModel({
      firstname: req.body.firstnameFromFront,
      lastname: req.body.lastnameFromFront,
      email: req.body.emailFromfront,
      password: hash,
      token: uid2(32),
      status: 'client',
    });

    saveUser = await newUser.save();
        
    if(saveUser){
      result = true;
      token = saveUser.token;
    }
  } 

  res.json({ result, saveUser, token, error })
})

// Connection du user
router.post('/sign-in', async function(req, res, next){

  let user = null;
  let result = false;
  var error = [];
  var token = null;

  if(req.body.emailFromFront === ''
  || req.body.passwordFromFront === ''
  ){
    error.push('Champs vides')
  }

  if (error.length == 0) {
    const user =  await UserModel.findOne({
      email: req.body.emailFromfront,
    });
        
    if(user){
      if(bcrypt.compareSync(req.body.passwordFromFront, user.password)){
        result = true
        token = user.token
      } else {
        result = false
        error.push('Mot de passe incorrect')
      }
    } else {
      error.push('Email incorrect')
    }
  } 

  res.json({ result, user, token, error })
})

router.get('/get-user', async function(req, res, next){
  
  const answerDb = await UserModel.findOne({token: req.query.token})
    .populate('favorite')
    .exec();

    res.json({ user: answerDb })
})

////// PRODUITS "PLANTES" : AJOUT + LECTURE  //////
// Ajout d'une nouvelle plante
router.post('/new-products', async function(req, res, next){

  const newProduct = new ProductModel({
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      water: req.body.water,
      sun: req.body.sun
  })

  const productSaved = await newProduct.save();

  res.json({ recorded: true, data: productSaved })

})

// Lire les plantes disponibles en base
router.get('/products', async function(req, res, next){
   const productsDb = await ProductModel.find()
   //console.log('########################## LES PLANTES', productsDb);
   res.json({ products: productsDb })
})

////// FAVORIS : AJOUT + SUPPRESSION  //////
// Ajout d'une plante dans les favoris du user
router.post('/wishlist-plants', async function(req,res,next){
  const result = false;

  const user = await UserModel.findOne({token: req.body.token});

  if(user !== null){
    const newPlants = new ProductModel({
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      water: req.body.water,
      sun: req.body.sun
    })

    const savePlants = await newPlants.save();

    if(savePlants.name){
      result = true
    }
  }

  res.json({result})
})

// Supprimer
router.delete('/wishlist-plants', async function(req, res, next){
  const result = false;
  const user = await UserModel.findOne({ token: req.body.token })

  if(user !== null){
    const retrunDb = await ProductModel.deleteOne({ name: req.body.name, userId: user._id})

    if(retrunDb.deleteCount === 1){
      result = true
    }
  }

  res.json({result})
})

router.get('/wishlist-plants', async function(req, res, next) {
  const plants = []
  const user = await UserModel.findOne({token: req.body.token})

  if(user !== null){
    plants = await ProductModel.find({userId: user._id})
  }

  res.json({plants})
})

module.exports = router;
