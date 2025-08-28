import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductForm from '../components/ProductForm';
import { productAPI } from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        toast.error(error.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleSubmit = async (productData) => {
    try {
      setIsSubmitting(true);
      const response = await productAPI.updateProduct(id, productData);
      toast.success('Product updated successfully!');
      navigate(`/products/${response.data._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <span className="loading-text">Loading product...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h3 className="empty-state-title">Product not found</h3>
          <p className="empty-state-text">The product you're trying to edit doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={18} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="create-product-header">
        <Link to={`/products/${id}`} className="back-btn">
          <ArrowLeft size={20} />
          <span>Back to Product</span>
        </Link>
        <div className="header-info">
          <div className="header-icon">
            ✏️
          </div>
          <div className="header-text">
            <h1 className="create-title">Edit Product</h1>
            <p className="create-subtitle">Update "{product.name}"</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditProduct;
