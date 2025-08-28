const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing E-commerce Product API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing health check...');
    const healthRes = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health check passed:', healthRes.data.message);

    // Test 2: Get all products (should be empty initially)
    console.log('\n2. Testing get all products...');
    const productsRes = await axios.get(`${API_BASE}/products`);
    console.log(`✅ Products fetched: ${productsRes.data.data.length} products found`);

    // Test 3: Create a new product
    console.log('\n3. Testing create product...');
    const newProduct = {
      name: 'Test API Product',
      description: 'This product was created via API test script',
      price: 99.99,
      category: 'Electronics',
      brand: 'TestBrand',
      stock: 50,
      images: [{
        url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        alt: 'Test product image'
      }],
      tags: ['test', 'api', 'demo']
    };

    const createRes = await axios.post(`${API_BASE}/products`, newProduct);
    const createdProduct = createRes.data.data;
    console.log('✅ Product created:', createdProduct.name, 'ID:', createdProduct._id);

    // Test 4: Get the created product
    console.log('\n4. Testing get single product...');
    const singleRes = await axios.get(`${API_BASE}/products/${createdProduct._id}`);
    console.log('✅ Single product fetched:', singleRes.data.data.name);

    // Test 5: Update the product
    console.log('\n5. Testing update product...');
    const updateData = {
      price: 149.99,
      stock: 25
    };
    const updateRes = await axios.put(`${API_BASE}/products/${createdProduct._id}`, updateData);
    console.log('✅ Product updated. New price:', updateRes.data.data.price);

    // Test 6: Get categories and brands
    console.log('\n6. Testing get categories and brands...');
    const categoriesRes = await axios.get(`${API_BASE}/products/categories`);
    const brandsRes = await axios.get(`${API_BASE}/products/brands`);
    console.log('✅ Categories:', categoriesRes.data.data.length);
    console.log('✅ Brands:', brandsRes.data.data.length);

    // Test 7: Search and filter
    console.log('\n7. Testing search and filter...');
    const searchRes = await axios.get(`${API_BASE}/products?search=Test&category=Electronics`);
    console.log('✅ Search results:', searchRes.data.data.length, 'products found');

    // Test 8: Delete the product
    console.log('\n8. Testing delete product...');
    const deleteRes = await axios.delete(`${API_BASE}/products/${createdProduct._id}`);
    console.log('✅ Product deleted:', deleteRes.data.message);

    console.log('\n🎉 All API tests passed successfully!');
    console.log('\n📝 Summary:');
    console.log('- Health check: ✅');
    console.log('- Get products: ✅');
    console.log('- Create product: ✅');
    console.log('- Get single product: ✅');
    console.log('- Update product: ✅');
    console.log('- Get categories/brands: ✅');
    console.log('- Search/filter: ✅');
    console.log('- Delete product: ✅');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Backend server is running (npm run dev in backend folder)');
    console.log('2. MongoDB is running and accessible');
    console.log('3. Environment variables are configured correctly');
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
