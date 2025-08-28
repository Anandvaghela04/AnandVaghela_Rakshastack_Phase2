const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getBrands
} = require('../controllers/productController');
const { productValidation, productUpdateValidation } = require('../middleware/validation');
const { uploadSingle, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// GET routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/brands', getBrands);
router.get('/:id', getProduct);

// POST routes
router.post('/', uploadSingle, handleUploadError, productValidation, createProduct);

// PUT routes
router.put('/:id', uploadSingle, handleUploadError, productUpdateValidation, updateProduct);

// DELETE routes
router.delete('/:id', deleteProduct);

module.exports = router;
