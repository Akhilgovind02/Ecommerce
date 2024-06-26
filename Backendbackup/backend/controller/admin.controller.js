const express = require('express')
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')
const {sendResponseError} = require('../middleware/middleware')
const {checkPassword, newToken} = require('../utils/utility.function')

const signUpAdmin = async (req, res) => {
  const {email, fullName, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 8)

    await Admin.create({...req.body, password: hash})
    res.status(201).send('Sucessfully account opened ')
    return
  } catch (err) {
    console.log('Eorror : ', err)
    sendResponseError(500, 'Something wrong please try again', res)
    return
  }
}

const signInAdmin = async (req, res) => {
  const {password, email} = req.body
  console.log(req.body)
  try {
    const admin = await Admin.findOne({email})
    if (!!!admin) {
      sendResponseError(400, 'You have to Sign up first !', res)
    }

    const same = await checkPassword(password, admin.password)
    if (same) {
      let token = newToken(admin)
      res.status(200).send({status: 'ok', token})
      return
    }
    sendResponseError(400, 'InValid password !', res)
  } catch (err) {
    console.log('EROR', err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const getAdmin = async (req, res) => {
  res.status(200).send({admin: req.admin})
}
module.exports = {signUpAdmin, signInAdmin, getAdmin}
