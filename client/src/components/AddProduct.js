import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/addProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!product.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(product.quantity) || Number(product.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    
    if (!product.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(product.price) || Number(product.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/products', product);
      setSuccess(true);
      setProduct({ name: '', quantity: '', price: '' }); // reset form
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      setErrors({ submit: 'Failed to add product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProduct({ name: '', quantity: '', price: '' });
    setErrors({});
  };

  return (
    <div className="add-product-form">
      <div className="add-product-header">
        <h2>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add New Product
        </h2>
      </div>
      
      {success && (
        <div className="form-success-message">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Product added successfully!
        </div>
      )}
      
      {errors.submit && (
        <div className="alert alert-danger">
          {errors.submit}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="product-name"
                name="name"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 11H4C2.89543 11 2 11.8954 2 13V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V13C22 11.8954 21.1046 11 20 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="product-quantity">Quantity</label>
            <div className="input-with-icon">
              <input
                type="number"
                id="product-quantity"
                name="quantity"
                placeholder="Enter quantity"
                value={product.quantity}
                onChange={handleChange}
                className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 16.8V14.4C6 14.0817 6 13.9226 5.93815 13.8037C5.88395 13.6992 5.80078 13.6161 5.69626 13.5619C5.57736 13.5 5.41835 13.5 5.10033 13.5H4.1C3.83333 13.5 3.7 13.5 3.59724 13.47C3.4223 13.424 3.27596 13.3365 3.16903 13.2132C3.08164 13.1114 3.03333 12.9759 2.9367 12.705L1.1 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M22.9 8.3L21.0633 12.705C20.9667 12.9758 20.9183 13.1113 20.831 13.2132C20.724 13.3365 20.5777 13.424 20.4028 13.47C20.3 13.5 20.1667 13.5 19.9 13.5H18.8997C18.5817 13.5 18.4226 13.5 18.3037 13.5619C18.1992 13.6161 18.1161 13.6992 18.0619 13.8037C18 13.9226 18 14.0817 18 14.4V16.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M22 5H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 5L4.89651 2.97489C4.95982 2.84329 5.0232 2.71241 5.14848 2.61946C5.27376 2.5265 5.43451 2.5 5.59677 2.5H18.4032C18.5655 2.5 18.7262 2.5265 18.8515 2.61946C18.9768 2.71241 19.0402 2.84329 19.1035 2.97489L20 5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <rect x="2" y="5" width="20" height="3" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V16H4V19Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="product-price">Price (₹)</label>
            <div className="input-with-icon">
              <input
                type="number"
                id="product-price"
                name="price"
                placeholder="Enter price"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            <div className="form-hint">Enter price in Rupees</div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="button-primary" disabled={loading}>
            {loading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
                  <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;