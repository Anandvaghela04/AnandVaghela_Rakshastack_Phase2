import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';

const ProductCard = ({ product, onDelete }) => {

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product._id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Only stop propagation to prevent card click
    console.log('Edit clicked for product:', product._id);
  };

  const handleView = (e) => {
    e.stopPropagation(); // Only stop propagation to prevent card click
    console.log('View clicked for product:', product._id);
  };

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <Link to={`/products/${product._id}`} className="product-link">
          <div className="product-image-container">
            <img
              src={product.image?.startsWith('/uploads/')
                ? `http://localhost:5000${product.image}`
                : product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
              }
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop';
              }}
            />
            <div className="product-overlay">
              <div className="overlay-content">
                <Eye size={24} />
                <span>View Details</span>
              </div>
            </div>
            {product.category && (
              <div className="category-badge">
                {product.category}
              </div>
            )}
          </div>
        </Link>

        <div className="product-info">
          <div className="product-header">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-price-container">
              <span className="product-price">₹{product.price.toFixed(2)}</span>
              <span className="price-label">Best Price</span>
            </div>
          </div>

          <div className="product-details">
            {product.brand && (
              <div className="brand-info">
                <span className="brand-label">Brand</span>
                <span className="brand-name">{product.brand}</span>
              </div>
            )}
            <div className="product-sku">
              <span className="sku-label">SKU:</span>
              <span className="sku-value">{product.sku}</span>
            </div>
          </div>
        </div>
      
        <div className="product-actions">
          <div className="action-buttons">
            <Link
              to={`/products/${product._id}`}
              className="action-btn view-btn"
              onClick={handleView}
              title="View Details"
            >
              <Eye size={18} />
            </Link>
            <Link
              to={`/edit/${product._id}`}
              className="action-btn edit-btn"
              onClick={handleEdit}
              title="Edit Product"
            >
              <Edit size={18} />
            </Link>
            <button
              onClick={handleDelete}
              className="action-btn delete-btn"
              title="Delete Product"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
