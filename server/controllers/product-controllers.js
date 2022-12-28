const db = require('../config')

// Get All Product Function
module.exports.getAllProduct = async (req, res) => {
  const result = await db.query('SELECT * FROM product')
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    return res.status(500).send("GET All Product :", error)
  }
}

// Get Product Function
module.exports.getProduct = async (req, res) => {
  const result = await db.query('SELECT * FROM product WHERE id = $1', [
    req.params.id
  ])
  try {
    return res.status(200).json({
      status: "success",
      data:  result.rows
    })
  } catch (error) {
    return res.status(500).send("GET Product :", error)
  }
}


// Post Product Function
module.exports.postProduct = async (req, res) => {
  const result = await db.query('INSERT INTO product (title, description, category, image, price) VALUES ($1, $2, $3, $4, $5)', [
    req.body.title, 
    req.body.description, 
    req.body.category,
    req.body.image,
    req.body.price
  ])
  try {
    return res.status(200).json({
      status: 'success',
      data : result.rows
    })
  } catch (error) {
    return res.status(500).send("POST Product :", error)

  }
}

// Put Product Function
module.exports.putProduct = async (req, res) => {
  const result = await db.query('UPDATE product SET title = $1, description = $2, category = $3, image = $4 , price = $5 WHERE id = $6', [
    req.body.title, 
    req.body.description, 
    req.body.category,
    req.body.image,
    req.body.price,
    req.params.id
  ])
  try {
    return res.status(200).json({
      status: "Success",
      data: result.rows
    })

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
    return res.status(200).json({
      status: 'Success',
      data: result.rows
    })
  } catch (error) {
    return res.status(500).send("DELETE Product :", error)
  }
}
