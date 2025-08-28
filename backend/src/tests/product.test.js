const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Product = require('../models/Product');

// Test database
const MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/ecommerce_test';

describe('Product API', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI);
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/products', () => {
    it('should return empty array when no products exist', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
    });

    it('should return products when they exist', async () => {
      const product = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 10,
        sku: 'TEST-001'
      });
      await product.save();

      const res = await request(app)
        .get('/api/products')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe('Test Product');
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product with valid data', async () => {
      const productData = {
        name: 'New Product',
        description: 'New product description',
        price: 149.99,
        category: 'Electronics',
        brand: 'New Brand',
        stock: 25,
        sku: 'NEW-001'
      };

      const res = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(productData.name);
      expect(res.body.data.price).toBe(productData.price);
    });

    it('should return validation error for invalid data', async () => {
      const invalidData = {
        name: '', // Empty name should fail validation
        price: -10 // Negative price should fail
      };

      const res = await request(app)
        .post('/api/products')
        .send(invalidData)
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return product by ID', async () => {
      const product = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 10,
        sku: 'TEST-001'
      });
      await product.save();

      const res = await request(app)
        .get(`/api/products/${product._id}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(product._id.toString());
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .get(`/api/products/${fakeId}`)
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update product with valid data', async () => {
      const product = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 10,
        sku: 'TEST-001'
      });
      await product.save();

      const updateData = {
        name: 'Updated Product',
        price: 199.99
      };

      const res = await request(app)
        .put(`/api/products/${product._id}`)
        .send(updateData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(updateData.name);
      expect(res.body.data.price).toBe(updateData.price);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete product by ID', async () => {
      const product = new Product({
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 10,
        sku: 'TEST-001'
      });
      await product.save();

      const res = await request(app)
        .delete(`/api/products/${product._id}`)
        .expect(200);

      expect(res.body.success).toBe(true);

      // Verify product is deleted
      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });
  });
});
