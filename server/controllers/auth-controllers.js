const db = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// Cookie Expired Time (15 minutes)
let cookieExpired = 15 * 60 * 1000

// Create Token Function (JWT)
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN, {
    expiresIn: "15m"
  })
};

// Refresh Token Function
const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_REFRESH, {
    expiresIn: "24h"
  })
}

// Hash Password Function (Bcrypt)
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}


// Authentification Register Function
module.exports.postAuthSignUp = async (req, res) => {
  const result = await db.query('INSERT INTO users (email, password, role, lastname, firstname) VALUES ($1, $2, $3, $4, $5)', [
    req.body.email,
    hashPassword(req.body.password),
    req.body.role,
    req.body.lastname,
    req.body.firstname,
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('POST Authentification Register :', error)
  }
}

// Register Adress Facturation Function
module.exports.postAdressFacturation = async (req, res) => {
  const result = await db.query('INSERT INTO adress_facturation (civility, lastname, firstname, adress, additionnal_adress, postal_code, city, country, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [
    req.body.civility,
    req.body.lastname,
    req.body.firstname,
    req.body.adress,
    req.body.additionnal_adress,
    req.body.postal_code,
    req.body.city,
    req.body.country,
    req.body.phone,
    req.body.email
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('POST Adress Facturation :', error)
  }
}

// Register Adress Livraison Function
module.exports.postAdressDelivery = async (req, res) => {
  const result = await db.query('INSERT INTO adress_delivery (civility, lastname, firstname, adress, additionnal_adress, postal_code, city, country, phone, email, digicode, comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [
    req.body.civility,
    req.body.lastname,
    req.body.firstname,
    req.body.adress,
    req.body.additionnal_adress,
    req.body.postal_code,
    req.body.city,
    req.body.country,
    req.body.phone,
    req.body.email,
    req.body.digicode,
    req.body.comment
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('POST Adress Livraison :', error)
  }
}

// Authentification Login Function
module.exports.postAuthSignIn = async (req, res) => {
  const result = await db.query('SELECT id, email, password FROM users WHERE email = $1', [
    req.body.email
  ])
  try {
    if (result.rows[0]) {
      let validPassword = await bcrypt.compare(req.body.password, result.rows[0].password)
      if (validPassword) {
        let token = createToken({
          id: result.rows[0].id
        })
        let refreshToken = createRefreshToken({
          id : result.rows[0].id
        })

        await db.query('DELETE FROM refresh_token WHERE user_id = $1', [result.rows[0].id])
        await db.query('INSERT INTO refresh_token (user_id, token) VALUES ($1, $2)', [result.rows[0].id, refreshToken])

        res.status(200).send({
          token,
          refreshToken
        })
      } else {
        res.status(401).send('Invalid Password')
      }
    } else {
      res.status(401).send('Email not found')
    }
  } catch (error) {
    res.status(500).send('POST Authentification Login :', error)
  }
}

// Authentification Refresh Token Function
module.exports.getAuthRefreshToken = async (req, res) => {
  const result = await db.query('SELECT token FROM refresh_token WHERE user_id = $1', [req.user_id])
  try {
    if (result.rows[0]) {
      res.status(200).send({
        token: result.rows[0].token
      })
    }
  } catch (error) {
    res.status(500).send('GET Authentification Refresh Token :', error)
  }
}

// Authentification Get Function
module.exports.getAuth = async (req, res) => {
  const result = await db.query('SELECT id, email, lastname, firstname FROM users WHERE id = $1', [
    req.user.id
  ])
  try {
    res.status(200).json({
      user: result.rows[0]
    })
  } catch (error) {
    res.status(500).send('GET Authentification :', error)
  }
}

// Authentification Logout Function
module.exports.postAuthLogout = (req, res) => {
  const result = db.query('DELETE FROM refresh_token WHERE user_id = $1', [req.user.id])
  if(!localStorage.getItem('token')) return res.status(401).send('No token')
  if(!localStorage.getItem('refreshToken')) return res.status(401).send('No refreshToken')
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')

  res.status(200).send({result})
}

// Authentification Update Function
module.exports.putAuth = async (req, res) => {
  const result = db.query('UPDATE users SET lastname = $1, firstname = $2, email = $3, phone = $4, password = $5 WHERE id = $6', [
    req.body.lastname,
    req.body.firstname,
    req.body.email,
    req.body.phone,
    hashPassword(req.body.password),
    req.params.id
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('PUT Auth :', error)
  }
}

// Authentification Delete Function
module.exports.delAuth = async (req, res) => {
  const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [
    req.params.id
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('DEL Auth :', error)
  }
}