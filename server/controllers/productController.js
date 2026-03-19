const Product = require('../models/Product')

// @GET /api/products
const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query
    let query = {}
    if (search) query.name = { $regex: search, $options: 'i' }
    if (category && category !== 'all') query.category = category

    let sortObj = {}
    if (sort === 'price_asc') sortObj.price = 1
    else if (sort === 'price_desc') sortObj.price = -1
    else sortObj.createdAt = -1

    const products = await Product.find(query).sort(sortObj)
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/products (admin)
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// @PUT /api/products/:id (admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// @DELETE /api/products/:id (admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }
