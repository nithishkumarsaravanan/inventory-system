import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/addProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', product);
      alert('Product added!');
      setProduct({ name: '', quantity: '', price: '' }); // reset form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={product.quantity}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProduct;
