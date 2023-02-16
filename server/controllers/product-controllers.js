const db = require('../config')
const { v4: uuidv4 } = require('uuid')

// GET FUNCTION


// Get All Category Function
module.exports.getAllCategory = async (req, res) => {
  const result = await db.query('SELECT * FROM categories')
  
  try {
    return res.status(200).send(result.rows)
  } catch (error) {
    return res.status(500).send("GET All Category :", error)
  }
}

// Get All Product Function
module.exports.getAllProduct = async (req, res) => {
  const result = await db.query('SELECT * FROM products')
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("GET All Product :", error)
  }
}

// Get Product Function
module.exports.getProduct = async (req, res) => {
  const result = await db.query('SELECT * FROM products WHERE slug = $1', [
    req.params.id
  ])
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("GET Product :", error)
  }
}


// POST FUNCTION

// Post Product Function
module.exports.postProduct = async (req, res) => {
  const result = await db.query('INSERT INTO products (title, price, reduction, description, category_id, activation,  slug, references_product, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [
    req.body.title, 
    req.body.price, 
    req.body.reduction,
    req.body.description,
    req.body.category_id,
    req.body.activation,
    req.body.slug,
    uuidv4(),
    req.body.images
  ])
  try {
    return res.status(200).send(result.rows)
  } catch (error) {
    return res.status(500).send("POST Product :", error)

  }
}

// Post Category Function
module.exports.postCategoriesProduct = async (req, res) => {
  const result = await db.query('INSERT INTO categories (name) VALUES ($1)', [
    req.body.name
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("POST Categories Product :", error)
  }
}

// Post Images Function
module.exports.postImagesProduct = async (req, res) => {
  const result = await db.query('INSERT INTO images (src, alt, title, product_id) VALUES ($1, $2, $3, $4)', [
    req.body.src,
    req.body.alt,
    req.body.title,
    req.body.product_id
  ])
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("POST Images :", error)
  }
}

// Get All images Function
module.exports.getAllImagesProduct = async (req, res) => {
  const result = await db.query('SELECT * FROM images')
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("GET All Images :", error)
  }
}

// Post Material Function
module.exports.postMaterial = async (req, res) => {
  const result = await db.query('INSERT INTO materials (name) VALUES ($1)', [
    req.body.name
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("POST Material :", error)
  }
}

// Post Stock Function
module.exports.postStockProduct = async (req, res) => {
  const result = await db.query('INSERT INTO stocks (quantity, product_id) VALUES ($1, $2)', [
    req.body.quantity,
    req.body.product_id
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("POST Stock :", error)
  }
}

// Post Size Function
module.exports.postSizeProduct = async (req, res) => {
  const result = await db.query('INSERT INTO sizes (name, category_id) VALUES ($1, $2)', [
    req.body.name,
    req.body.category_id
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("POST Size :", error)
  }
}

// Post Material Product Function
module.exports.postMaterialProduct = async (req, res) => {
  const result = await db.query('INSERT INTO product_materials (product_id, material_id) VALUES ($1, $2)', [
    req.body.product_id,
    req.body.material_id
  ])

  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send("POST Material Product :", error)
  }
}

// Put Product Function
module.exports.putProduct = async (req, res) => {
  const result = await db.query('UPDATE products SET title = $1, price = $2, reduction = $3, description = $4, category_id = $5, activation = $6, slug = $7 WHERE id = $8', [
    req.body.title, 
    req.body.price, 
    req.body.reduction,
    req.body.description,
    req.body.category_id,
    req.body.activation,
    req.body.slug,
    req.params.id
  ])
  try {
    return res.status(200).send(result.rows)

  } catch (error) {
    return res.status(500).send("PUT Product :", error)
  }
}

// Delete Product Function
module.exports.delProduct = async (req, res) => {
  const result = await db.query('DELETE FROM product WHERE id = $1', [
    req.params.id
  ])
  try {
    return res.status(200).send(result.rows)
  } catch (error) {
    return res.status(500).send("DELETE Product :", error)
  }
}
