# E-commerce Product System

A full-stack e-commerce product management system with complete CRUD operations, modern UI, and MongoDB integration.

## 🚀 Quick Start

**Windows Users:**
```bash
# Double-click start-dev.bat or run:
start-dev.bat
```

**Mac/Linux Users:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

Then open:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
AnandTask/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # API controllers (productController.js)
│   │   ├── models/         # MongoDB models (Product.js)
│   │   ├── routes/         # API routes (productRoutes.js)
│   │   ├── middleware/     # Validation & error handling
│   │   ├── config/         # Database configuration
│   │   ├── utils/          # Utilities (seeder.js)
│   │   └── tests/          # API tests
│   ├── .env                # Environment variables
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Header.js   # Navigation header
│   │   │   ├── ProductCard.js # Product display card
│   │   │   └── ProductForm.js # Create/edit form
│   │   ├── pages/          # Page components
│   │   │   ├── ProductList.js    # Main product listing
│   │   │   ├── ProductDetail.js  # Product details view
│   │   │   ├── CreateProduct.js  # Create product page
│   │   │   └── EditProduct.js    # Edit product page
│   │   ├── services/       # API integration (api.js)
│   │   ├── styles/         # CSS styling
│   │   └── App.js          # Main app component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── start-dev.bat           # Windows startup script
├── start-dev.sh            # Mac/Linux startup script
├── SETUP.md                # Detailed setup instructions
├── API_DOCUMENTATION.md    # Complete API documentation
└── README.md               # This file
```

## ✨ Features

### Backend Features
- **Complete CRUD APIs** for product management
- **MongoDB Integration** with Mongoose ODM
- **Input Validation** with express-validator
- **Error Handling** with custom middleware
- **Pagination** for large datasets
- **Rate Limiting** for API protection
- **Sample Data Seeding** for quick testing
- **Comprehensive Testing** with Jest

### Frontend Features
- **Modern React UI** with responsive design
- **Product Grid View** with hover effects
- **Detailed Product Views** with specifications
- **Create/Edit Forms** with validation
- **Real-time Feedback** with toast notifications
- **Pagination Controls** for navigation
- **Mobile-Friendly Design** with responsive layout
- **Loading States** and error handling

### Database Schema
- **Rich Product Model** with specifications, images, ratings
- **Flexible Tagging System** for categorization
- **Stock Management** with status indicators
- **SEO-Friendly** with proper indexing
- **Audit Trail** with timestamps

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Lucide React** - Modern icons
- **React Hot Toast** - Notifications
- **Custom CSS** - Responsive styling

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **npm** (comes with Node.js)

## 🔧 Installation & Setup

### Automated Setup (Recommended)
Use the provided startup scripts for easy setup:

**Windows:** Double-click `start-dev.bat`
**Mac/Linux:** Run `./start-dev.sh`

### Manual Setup
See [SETUP.md](SETUP.md) for detailed manual installation instructions.

## 📚 Documentation

- **[Setup Guide](SETUP.md)** - Detailed installation and configuration
- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Project Structure](#-project-structure)** - Code organization

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filtering/pagination) |
| GET | `/api/products/:id` | Get single product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update existing product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/categories` | Get all categories |
| GET | `/api/products/brands` | Get all brands |
| GET | `/api/health` | API health check |

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Manual Testing
1. Start both servers using startup scripts
2. Visit http://localhost:3000
3. Test CRUD operations through the UI
4. Use API endpoints directly (see API_DOCUMENTATION.md)

### Sample Data
```bash
cd backend
npm run seed  # Adds sample products for testing
```

## 🎨 UI Features

- **Responsive Grid Layout** - Works on all screen sizes
- **Advanced Filtering** - Search, category, brand, price range
- **Sorting Options** - By name, price, date
- **Pagination** - Handle large product catalogs
- **Product Cards** - Beautiful product display
- **Detailed Views** - Complete product information
- **Form Validation** - Client and server-side validation
- **Toast Notifications** - User feedback
- **Loading States** - Better user experience

## 🔒 Security Features

- **Input Validation** - Server-side validation with express-validator
- **Rate Limiting** - Prevent API abuse
- **CORS Protection** - Configured for frontend access
- **Helmet Security** - Security headers
- **Error Handling** - Secure error responses

## 🚀 Production Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Use production MongoDB instance
3. Configure proper JWT secrets
4. Build frontend: `cd frontend && npm run build`
5. Use process manager like PM2
6. Set up reverse proxy (nginx)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

