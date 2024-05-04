const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Player = require('../models/Player')
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')

const signUpUser = async (req, res) => {
  const {email, fullName, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 8)

    await User.create({...req.body, password: hash})
    res.status(201).send('Sucessfully account opened ')
    return
  } catch (err) {
    console.log('Eorror : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInUser = async (req, res) => {
  const {password, email} = req.body
  console.log(req.body)
  try {
    const player = await Player.find({email})
    const user = await User.findOne({email})
    console.log(player);
    console.log(user);
    if (!!!user) {
      sendResponseError(400, 'You have to Sign up first !', res)
    }

    const same = await checkPassword(password, user.password)
    if (same) {
      // if(user && player){
      //   returnres.status(200).send({status: 'ok', playeris:'true'})
      // }  
      let token = newToken(user)
      res.status(200).send({happy:'yes',status: 'ok', token})
      return
    }
    sendResponseError(400, 'InValid password !', res)
  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const getUser = async (req, res) => {
  email = req.user.email
  const userORplayer = await Player.find({email})
  if(userORplayer.length>0){
    res.status(200).send({user: req.user,Playeris:'ok'})
  }
  else{
    res.status(200).send({user: req.user})
  }
}

const getallusers = async (req, res) => {
  try {
    const allUsers = await User.find();
    
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {signUpUser, signInUser, getUser,getallusers}
