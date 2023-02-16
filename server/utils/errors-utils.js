// Authentification Errors
module.exports.authRegisterErrors = (err) => {
  let errors = {
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    password: ""
  }

  if (err.message.includes('lastname')) {
    errors.lastname = "Ce champ est requis"
  }

  if (err.message.includes('firstname')) {
    errors.lastname = "Ce champ est requis"
  }

  if (err.message.includes('email')) {
    errors.lastname = "Ce champ est requis"
  }

  if (err.message.includes('phone')) {
    errors.lastname = "Ce champ est requis"
  }

  if (err.message.includes('password')) {
    errors.lastname = "Ce champ est requis"
  }

  return errors
}

module.exports.authSignInErrors = (err) => {
  let errors = {
    email : "",
    password: ""
  }

  if (err.includes('email')) {
    errors.email = "Email incorrect"
  }

  if (err.includes('password')) {
    errors.password = "Mot de passe incorrect"
  }

  return errors
}

// Product Errors
module.exports.getProductAllErrors = (err) => {
  
}

module.exports.getProductErrors = (err) => {

}

module.exports.addProductErrors = (err) => {

}

module.exports.updateProductErrors = (err) => {

}

module.exports.deleteProductErrors = (err) => {

}
