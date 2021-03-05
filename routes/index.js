const express = require('express');
const router = express.Router();

// Sécurité user : token + cryptage du password
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

const UserModel = require('../models/users');

// Enregistrement du user
router.post('/sign-up', async function(req, res, next){

  let saveUser = null;
  let result = false;
  var error = [];
  var token = null;

  const data = await UserModel.findOne({
    email: req.body.emailFromfront
  })

  if(data != null){
    error.push('Cette adresse email existe déjà dans notre base')
  }

  if(req.body.lastnameFromFront === ''
  || req.body.emailFromFront === ''
  || req.body.passwordFromFront === ''
  ){
    error.push('Champs vides')
  }

  if (error.length === 0) {
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

  res.json({ result, saveUser, error, token })
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

  if (error.length === 0) {
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

  res.json({ result, user, error, token })
})

// Mise à jour du password du user
router.put('/update-password', async function(req, res, next){

  let result = false

  var update = { 
      password: hash
  }
  
  const updatePasswordDb = await UserModel.updateOne(
    { 
      token: req.body.token 
    }, update
  )

    if (updatePasswordDb.nModified === 1) {
      result = true
    }
  
  const anwerPasswordDb = await UserModel.findOne({ token: req.body.token });
  
  res.json({ result, user: anwerPasswordDb })
})



// // Ajout d'un article dans les favoris du user
// router.put('/add-favorite', async function(req, res, next){

//   try {
//     await UserModel.updateOne(
//       { token: req.body.token }, 
//       { $push: { favorite: req.body.favoriteProductNew } }
//     )
//   } catch (error) {
//     res.json({ result: false })
//   }
  
//   res.json({ result: true })
// })

// // Suppression d'un article favoris du user
// router.put('/remove-favorite', async function(req, res, next){

//   try {
//     await UserModel.updateOne(
//       { token: req.body.token }, 
//       { $pull: { favorite: req.body.favoriteProductRemove } }
//     )
//   } catch (error) {
//     res.json({ result: false })
//   }
  
//   res.json({ result: true })
// })

module.exports = router;
