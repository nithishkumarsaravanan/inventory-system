import React from 'react';
import AddProduct from './components/AddProduct';
import InventoryList from './components/InventoryList';

function App() {
  return (
    <div>
      <h1>Inventory System</h1>
      <AddProduct />
      <InventoryList />
    </div>
  );
}

export default App;

