import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Package, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { productAPI } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product with ID:', id);
        const response = await productAPI.getProduct(id);
        console.log('Product response:', response);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error(error.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      console.log('No product ID provided');
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      try {
        await productAPI.deleteProduct(id);
        toast.success('Product deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };



  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <span className="loading-text">Loading product details...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <Package className="empty-state-icon" />
          <h3 className="text-xl font-semibold mb-2">Product not found</h3>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={18} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Navigation */}
      <div className="product-detail-nav">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
        <div className="detail-actions">
          <Link to={`/edit/${product._id}`} className="detail-action-btn edit-action">
            <Edit size={20} />
            <span>Edit Product</span>
          </Link>
          <button onClick={handleDelete} className="detail-action-btn delete-action">
            <Trash2 size={20} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-detail-content">
        {/* Product Image */}
        <div className="product-image-section">
          <div className="main-image-container">
            <img
              src={product.image?.startsWith('/uploads/')
                ? `http://localhost:5000${product.image}`
                : product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop'
              }
              alt={product.name}
              className="main-product-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop';
              }}
            />
            <div className="image-overlay">
              <div className="zoom-indicator">
                <span>🔍 Click to zoom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info-section">
          {/* Header */}
          <div className="product-detail-header">
            <div className="product-title-section">
              <h1 className="product-detail-title">{product.name}</h1>
              <div className="product-status-badge">
                <span className="status-indicator active"></span>
                <span>In Stock</span>
              </div>
            </div>

            <div className="price-section">
              <div className="price-container">
                <span className="currency">₹</span>
                <span className="price-amount">{product.price.toFixed(2)}</span>
              </div>
              <span className="price-label">Best Price Guaranteed</span>
            </div>
          </div>

          {/* Product Details Cards */}
          <div className="detail-cards">
            <div className="detail-card">
              <div className="card-icon">🏷️</div>
              <div className="card-content">
                <span className="card-label">Brand</span>
                <span className="card-value">{product.brand || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="card-icon">📂</div>
              <div className="card-content">
                <span className="card-label">Category</span>
                <span className="card-value">{product.category || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="card-icon">🔖</div>
              <div className="card-content">
                <span className="card-label">SKU</span>
                <span className="card-value">{product.sku}</span>
              </div>
            </div>

            <div className="detail-card">
              <div className="card-icon">📅</div>
              <div className="card-content">
                <span className="card-label">Added</span>
                <span className="card-value">{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="additional-info">
            <div className="info-card">
              <h3 className="info-title">Product Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Product ID</span>
                  <span className="info-value">{product._id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">{new Date(product.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value status-active">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
