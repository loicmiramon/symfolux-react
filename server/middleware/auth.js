let jwt = require('jsonwebtoken')

// module.exports.authenticateTokenMiddleware = (req, res, next) => {
//   const authHeaderToken = req.headers.authorization
//   const token = authHeaderToken && authHeaderToken.split(' ')[1]

//   if (token == null) return res.status(401).send('token not found')

//   jwt.verify(token, process.env.TOKEN, (err, user) => {
//     if (err) {
//       res.status(401).send('token expired')

//       const authHeaderRefreshToken = req.headers.refreshToken
//       const refreshToken = authHeaderRefreshToken && authHeaderRefreshToken.split(' ')[1]
//       if (refreshToken == null) return res.status(401).send('refreshToken not found')

//       jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
//         if (err) return res.status(403).send('refreshToken expired')
//         console.log('resfreshToken')
//         req.user = user.id.id
//         next()
//       })
//     }
//     req.user = user.id.id
//     next()
//   })

// }

module.exports.authenticateTokenMiddleware = (req, res, next) => {
  const authHeaderToken = req.headers.authorization
  const authHeaderRefreshToken = req.headers.refreshtoken
  const token = authHeaderToken && authHeaderToken.split(' ')[1]
  const refresh = authHeaderRefreshToken && authHeaderRefreshToken.split(' ')[1]

  if (token == null) return res.status(401).send('token not found')

  jwt.verify(token, process.env.TOKEN, (err, user) => {
    if (err) {
      if (refresh == null) return res.status(401).send('refreshToken not found')
      jwt.verify(refresh, process.env.TOKEN_REFRESH, (err, user) => {
        if (err) return res.status(403).send('refreshToken expired')
        req.user = user.id.id
        return next()
      })
      return
    }
    req.user = user.id.id
  })
}




module.exports.logoutMiddleware = (req, res, next) => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  }
  if (localStorage.getItem('refreshToken')) {
    localStorage.removeItem('refreshToken');
  }
  delete req.headers.authorization
  delete req.headers.refreshToken
  next();
}





