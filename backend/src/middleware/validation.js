const { body } = require('express-validator');

const productValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),

  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .custom((value) => {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        throw new Error('Price must be a valid number');
      }
      if (numValue < 0) {
        throw new Error('Price cannot be negative');
      }
      return true;
    })

  // Image validation is handled by multer middleware
  // Category and brand validation removed as per user request
];

const productUpdateValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),

  body('price')
    .optional()
    .custom((value) => {
      if (value !== undefined && value !== '') {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          throw new Error('Price must be a valid number');
        }
        if (numValue < 0) {
          throw new Error('Price cannot be negative');
        }
      }
      return true;
    })

  // Image, category, and brand validation removed/optional
];

module.exports = {
  productValidation,
  productUpdateValidation
};
