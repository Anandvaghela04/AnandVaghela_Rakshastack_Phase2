import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({});
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 12
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      
      const response = await productAPI.getProducts(cleanFilters);
      setProducts(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        productAPI.getCategories(),
        productAPI.getBrands()
      ]);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      console.error('Failed to fetch filter options:', error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await productAPI.deleteProduct(productId);
      toast.success('Product deleted successfully');
      fetchProducts(); // Refresh the list
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1,
      limit: 12
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Products <br></br><span className="page-subtitle">Manage your product inventory</span></h1>
        </div>
        <Link to="/create" className="btn btn-primary add-product-btn">
          <Plus size={20} />
          <span>Add Product</span>
        </Link>
      </div>

      

      {/* Results Summary */}
      {!loading && (
        <div className="results-summary">
          <p className="results-text">
            Showing {products.length} of {pagination.totalProducts || 0} products
          </p>
          <button
            onClick={fetchProducts}
            className="btn btn-outline btn-sm refresh-btn"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <span className="loading-text">Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <h3 className="empty-state-title">No products found</h3>
          <p className="empty-state-text">
            {Object.values(filters).some(v => v !== '' && v !== 1 && v !== 12)
              ? 'Try adjusting your filters or search terms.'
              : 'Get started by adding your first product.'
            }
          </p>
          <Link to="/create" className="btn btn-primary">
            <Plus size={18} />
            <span>Add First Product</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={!pagination.hasPrevPage}
                onClick={() => handlePageChange(filters.page - 1)}
              >
                Previous
              </button>
              
              {[...Array(pagination.totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    className={`pagination-btn ${page === filters.page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                className="pagination-btn"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(filters.page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
