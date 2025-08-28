# E-commerce Product API Documentation

Base URL: `http://localhost:5000/api`

## Authentication
Currently, the API is open for development. In production, you would implement JWT-based authentication.

## Response Format

All API responses follow this format:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": {}, // Response data (for successful requests)
  "errors": [], // Validation errors (for failed requests)
  "pagination": {} // Pagination info (for paginated requests)
}
```

## Endpoints

### 1. Get All Products
**GET** `/products`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `search` (string): Search in name and description
- `category` (string): Filter by category
- `brand` (string): Filter by brand
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `sortBy` (string): Sort field (name, price, createdAt)
- `sortOrder` (string): Sort order (asc, desc)

**Example Request:**
```
GET /api/products?page=1&limit=12&category=Electronics&sortBy=price&sortOrder=asc
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "iPhone 15 Pro",
      "description": "Latest iPhone with advanced features",
      "price": 999.99,
      "category": "Electronics",
      "brand": "Apple",
      "stock": 50,
      "sku": "APL-IPH15P",
      "images": [
        {
          "url": "https://example.com/image.jpg",
          "alt": "iPhone 15 Pro"
        }
      ],
      "specifications": {
        "weight": "187g",
        "dimensions": "146.6 × 70.6 × 8.25 mm",
        "color": "Natural Titanium",
        "material": "Titanium"
      },
      "ratings": {
        "average": 4.8,
        "count": 245
      },
      "tags": ["smartphone", "apple", "premium"],
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### 2. Get Single Product
**GET** `/products/:id`

**Example Request:**
```
GET /api/products/64f8a1b2c3d4e5f6a7b8c9d0
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "iPhone 15 Pro",
    // ... full product object
  }
}
```

### 3. Create Product
**POST** `/products`

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "brand": "Brand Name",
  "stock": 100,
  "sku": "OPTIONAL-SKU", // Auto-generated if not provided
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Image description"
    }
  ],
  "specifications": {
    "weight": "500g",
    "dimensions": "10x5x2 cm",
    "color": "Black",
    "material": "Plastic"
  },
  "tags": ["tag1", "tag2"],
  "isActive": true
}
```

**Required Fields:**
- name (string, 2-100 chars)
- description (string, 10-1000 chars)
- price (number, >= 0)
- category (enum: Electronics, Clothing, Books, Home & Garden, Sports, Beauty, Toys, Food, Other)
- brand (string, 1-50 chars)
- stock (integer, >= 0)

**Example Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    // ... created product object
  }
}
```

### 4. Update Product
**PUT** `/products/:id`

**Request Body:** Same as create, but all fields are optional

**Example Request:**
```json
{
  "name": "Updated Product Name",
  "price": 149.99,
  "stock": 75
}
```

### 5. Delete Product
**DELETE** `/products/:id`

**Example Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    // ... deleted product object
  }
}
```

### 6. Get Categories
**GET** `/products/categories`

**Example Response:**
```json
{
  "success": true,
  "data": ["Electronics", "Clothing", "Books", "Sports"]
}
```

### 7. Get Brands
**GET** `/products/brands`

**Example Response:**
```json
{
  "success": true,
  "data": ["Apple", "Samsung", "Nike", "Adidas"]
}
```

### 8. Health Check
**GET** `/health`

**Example Response:**
```json
{
  "status": "OK",
  "message": "E-commerce API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Product name is required"
    }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Product not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details (in development mode)"
}
```

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: Rate limit info included in response headers

## Data Validation Rules

### Product Schema
- **name**: Required, 2-100 characters
- **description**: Required, 10-1000 characters
- **price**: Required, number >= 0
- **category**: Required, must be from predefined list
- **brand**: Required, 1-50 characters
- **stock**: Required, integer >= 0
- **sku**: Optional, 3-20 characters, uppercase letters/numbers/hyphens only
- **images**: Optional array of objects with url and alt
- **specifications**: Optional object with weight, dimensions, color, material
- **tags**: Optional array of strings
- **isActive**: Optional boolean (default: true)

### Image Object
- **url**: Required, valid URL
- **alt**: Optional string

### Specifications Object
- **weight**: Optional string, max 50 characters
- **dimensions**: Optional string, max 100 characters
- **color**: Optional string, max 30 characters
- **material**: Optional string, max 50 characters

## Testing with cURL

### Create a product:
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test product description",
    "price": 29.99,
    "category": "Electronics",
    "brand": "TestBrand",
    "stock": 100
  }'
```

### Get all products:
```bash
curl http://localhost:5000/api/products
```

### Update a product:
```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 39.99,
    "stock": 85
  }'
```

### Delete a product:
```bash
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID
```

## Frontend Integration

The frontend is configured to work with the backend API automatically. The React app includes:

- **Product listing** with search, filtering, and pagination
- **Product details** view with full information
- **Create/Edit forms** with validation
- **Delete functionality** with confirmation
- **Responsive design** for mobile and desktop
- **Error handling** with user-friendly messages
- **Loading states** for better UX

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 3000
- CORS is configured to allow frontend access
- Hot reloading enabled for both frontend and backend
- Sample data can be seeded using `npm run seed` in backend
- All API responses include proper HTTP status codes
- Input validation on both client and server side
