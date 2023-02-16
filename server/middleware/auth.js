let jwt = require('jsonwebtoken')

module.exports.authenticateTokenMiddleware = (req, res, next) => {
  const authHeaderToken = req.headers.authorization
  const token = authHeaderToken && authHeaderToken.split(' ')[1]
  if (token == null) return res.status(401).send('token not found')

  jwt.verify(token, process.env.TOKEN, (err, user) => {
    if (err) {
      res.status(403).send('token expired')
      // const authHeaderRefreshToken = req.headers.refreshToken
      // const refreshToken = authHeaderRefreshToken && authHeaderRefreshToken.split(' ')[1]
      // if (refreshToken == null) return res.sendStatus(401)
      // jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      //   if (err) return res.sendStatus(403)
      //   console.log('resfreshToken')
      //   req.user = user.id.id
      //   next()
      // })
    }
    req.user = user.id.id
    next()
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





