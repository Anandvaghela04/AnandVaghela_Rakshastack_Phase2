import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductForm from '../components/ProductForm';
import { productAPI } from '../services/api';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (productData) => {
    try {
      setIsLoading(true);
      const response = await productAPI.createProduct(productData);
      toast.success('Product created successfully!');
      navigate(`/products/${response.data._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="create-product-header">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>
        <div className="header-info">
          <div className="header-icon">
            ✨
          </div>
          <div className="header-text">
            <h1 className="create-title">Create New Product</h1>
            <p className="create-subtitle">Add a new product to your inventory</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateProduct;
