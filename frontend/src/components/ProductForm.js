import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Save, X, Upload, Image } from 'lucide-react';

const CATEGORIES = [
  'Electronics', 'Clothing', 'Books', 'Home & Garden', 
  'Sports', 'Beauty', 'Toys', 'Food', 'Other'
];

const ProductForm = ({ initialData, onSubmit, onCancel, isLoading = false }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      category: '',
      brand: '',
      image: '',
      ...initialData
    }
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (data) => {
    // Create FormData for file upload
    const formData = new FormData();

    // Add form fields
    formData.append('name', data.name);
    formData.append('price', parseFloat(data.price));
    formData.append('category', data.category);
    formData.append('brand', data.brand);

    // Add image file if selected, otherwise keep existing image
    if (selectedFile) {
      formData.append('image', selectedFile);
    } else if (initialData?.image) {
      formData.append('image', initialData.image);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Product Information */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Product Information</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter product name"
                {...register('name', {
                  required: 'Product name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
                })}
              />
              {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input form-select"
                {...register('category')}
              >
                <option value="">Select Category (Optional)</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="form-input"
                placeholder="0.00"
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price cannot be negative' }
                })}
              />
              {errors.price && <p className="form-error">{errors.price.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter brand name (Optional)"
                {...register('brand', {
                  maxLength: { value: 50, message: 'Brand cannot exceed 50 characters' }
                })}
              />
              {errors.brand && <p className="form-error">{errors.brand.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Product Image *</label>

            {/* File Upload Input */}
            <div className="upload-section">
              <div className="upload-area">
                <label className="upload-label">
                  <div className="upload-content">
                    <div className="upload-icon">
                      <Upload size={32} />
                    </div>
                    <div className="upload-text">
                      <p className="upload-primary">
                        <span className="upload-highlight">Click to upload</span> or drag and drop
                      </p>
                      <p className="upload-secondary">PNG, JPG, GIF, WebP (MAX. 5MB)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="upload-input"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="preview-image"
                  />
                  <div className="preview-badge">
                    <span>Preview</span>
                  </div>
                </div>
              )}

              {/* Selected File Info */}
              {selectedFile && (
                <div className="file-info">
                  <div className="file-icon">
                    <Image size={20} />
                  </div>
                  <div className="file-details">
                    <span className="file-name">{selectedFile.name}</span>
                    <span className="file-size">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                </div>
              )}
            </div>

            {!selectedFile && !imagePreview && (
              <p className="form-error">Product image is required</p>
            )}

            <p className="upload-help">
              Upload an image from your computer. Supported formats: JPEG, PNG, GIF, WebP. Maximum size: 5MB.
            </p>
          </div>
        </div>
      </div>



      {/* Form Actions */}
      <div className="form-actions">
        <div className="action-buttons-container">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline cancel-btn"
            disabled={isLoading}
          >
            <X size={20} />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
