# E-commerce Product System - Setup Guide

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Cloud) - [Sign up here](https://www.mongodb.com/atlas)
- **Git** (optional) - [Download here](https://git-scm.com/)

## Quick Start

### Option 1: Automated Setup (Recommended)

**For Windows:**
```bash
# Double-click the start-dev.bat file or run:
start-dev.bat
```

**For Mac/Linux:**
```bash
# Make the script executable and run:
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Manual Setup

1. **Clone/Download the project**
   ```bash
   git clone <repository-url>
   cd AnandTask
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Copy environment file and configure
   cp .env.example .env
   # Edit .env file with your MongoDB connection string
   
   # Seed sample data (optional)
   npm run seed
   
   # Start backend server
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   
   # Start frontend development server
   npm start
   ```

## Environment Configuration

### Backend (.env file)

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce_db
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/ecommerce_db

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration (for future authentication)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### MongoDB Setup Options

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **Mac**: `brew services start mongodb/brew/mongodb-community`
   - **Linux**: `sudo systemctl start mongod`
3. Use connection string: `mongodb://localhost:27017/ecommerce_db`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Create database user and get connection string
4. Whitelist your IP address
5. Use the provided connection string in your .env file

## Testing the Application

### 1. Verify Backend is Running
- Open browser to: http://localhost:5000/api/health
- Should see: `{"status":"OK","message":"E-commerce API is running"}`

### 2. Seed Sample Data
```bash
cd backend
npm run seed
```

### 3. Test API Endpoints
You can test the API using tools like Postman or curl:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product (replace ID with actual product ID)
curl http://localhost:5000/api/products/PRODUCT_ID

# Create new product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 99.99,
    "category": "Electronics",
    "brand": "Test Brand",
    "stock": 10
  }'
```

### 4. Access Frontend
- Open browser to: http://localhost:3000
- You should see the product listing page

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Backend (5000): Change PORT in .env file
   - Frontend (3000): React will prompt to use different port

2. **MongoDB connection failed**
   - Check if MongoDB is running
   - Verify connection string in .env
   - Check network connectivity for Atlas

3. **CORS errors**
   - Verify FRONTEND_URL in backend .env
   - Check if both servers are running

4. **Module not found errors**
   - Run `npm install` in respective directories
   - Delete node_modules and package-lock.json, then reinstall

### Logs and Debugging

- Backend logs: Check the terminal running `npm run dev`
- Frontend logs: Check browser console (F12)
- MongoDB logs: Check MongoDB service logs

## Production Deployment

For production deployment, you'll need to:

1. Set NODE_ENV=production
2. Use production MongoDB instance
3. Configure proper JWT secrets
4. Set up reverse proxy (nginx)
5. Use PM2 or similar for process management
6. Build frontend: `npm run build`

## Support

If you encounter issues:
1. Check this setup guide
2. Review error logs
3. Verify all prerequisites are installed
4. Check environment configuration
