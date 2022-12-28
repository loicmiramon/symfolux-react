const db = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { authRegisterErrors } = require('../utils/errors-utils');

let cookieExpired = 3 * 24 * 60 * 60 * 1000

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN, {
    expiresIn: cookieExpired
  })
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10)
}

// Authentification Register Function
module.exports.postAuthSignUp = async (req, res) => {
  const result = await db.query('INSERT INTO users (lastname, firstname, email, phone, password, role) VALUES ($1, $2, $3, $4, $5, $6)', [
    req.body.lastname,
    req.body.firstname,
    req.body.email,
    req.body.phone,
    hashPassword(req.body.password),
     req.body.role
  ])

  try {
    res.status(200).json({
      status: 'Success',
      data: {
        auth: result.rows
      }
    })
  } catch (error) {
    let err = authRegisterErrors(error)
    res.status(500).send({err})
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
        let token = createToken(result.rows[0].id)
        res.cookie('jwt', token, { httpOnly: true, cookieExpired })
        res.status(200).json({
          status: 'Success',
          data: {
            auth: result.rows[0].id
          }
        })
      } else {
        res.status(500).send('Password Incorrect')
      }
    } else {
      res.status(500).send('Email Incorrect')
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

// Authentification Logout Function
module.exports.postAuthLogout = (req, res) => {
  res.cookie('jwt', '', { cookieExpired: 1 })
  res.status(200).send('Success')
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
    res.status(200).json({
      status: 'Success',
      data: {
        auth: result.rows
      }
    })
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
    res.status(200).json({
      status: 'Success',
      data: {
        auth: result.rows
      }
    })
  } catch (error) {
    res.status(500).send('DEL Auth :', error)
  }
}