const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    price: 999.99,
    category: "Electronics",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    category: "Electronics",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"
  },
  {
    name: "Nike Air Max 270",
    price: 150.00,
    category: "Sports",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    name: "MacBook Pro 16-inch",
    price: 2499.99,
    category: "Electronics",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
  },
  {
    name: "Levi's 501 Original Jeans",
    price: 89.99,
    category: "Clothing",
    brand: "Levi's",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 399.99,
    category: "Electronics",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    name: "Adidas Ultraboost 22",
    price: 180.00,
    category: "Sports",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500"
  },
  {
    name: "The Great Gatsby Book",
    price: 12.99,
    category: "Books",
    brand: "Penguin Classics",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${products.length} products`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedProducts();
}

module.exports = { seedProducts, sampleProducts };
