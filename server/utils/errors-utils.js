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
}

module.exports.authSignInErrors = (err) => {
  let errors = {
    email : "",
    password: ""
  }
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
