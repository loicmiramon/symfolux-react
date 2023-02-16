const db = require('../config')


module.exports.getAllOrder = async (req, res) => {
  const result = await db.query('SELECT * FROM orders')
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('GET Orders :', error)
  }
}

module.exports.getOrder = async (req, res) => {
  const result = await db.query('SELECT * FROM orders WHERE id = $1', [
    parseInt(req.params.id)
  ])
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('GET Order :', error)
  }
}

module.exports.postOrder = async (req, res) => {
  const result = await db.query('INSERT INTO orders (user_id, order_status, order_date, order_price, order_reduction, order_total) VALUES ($1, $2, $3, $4, $5, $6)', [
    req.body.user_id,
    req.body.order_status,
    req.body.order_date,
    req.body.order_price,
    req.body.order_reduction,
    req.body.order_total
  ])
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('POST Order :', error)
  }
}

module.exports.putOrder = async (req, res) => {
  
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('PUT Order :', error)
  }
}

module.exports.deleteOrder = async (req, res) => {
  const result = await db.query('DELETE FROM orders WHERE id = $1', [
    parseInt(req.params.id)
  ])
  try {
    res.status(200).send(result.rows)
  } catch (error) {
    res.status(500).send('DELETE Order :', error)
  }
}