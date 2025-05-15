import React from 'react';
import AddProduct from './components/AddProduct';
import InventoryList from './components/InventoryList';
import './assets/styles/main.css';

function App() {
  return (
    <div className="inventory-app">
      <header className="app-header">
        <div className="container">
          <div className="app-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8.94C19.9896 8.84813 19.9695 8.75763 19.94 8.67V8.58C19.8919 8.47718 19.8278 8.38267 19.75 8.3L13.75 2.3C13.6673 2.22222 13.5728 2.15808 13.47 2.11C13.4402 2.10576 13.4099 2.10576 13.38 2.11C13.2784 2.05174 13.1662 2.01434 13.05 2H7C6.20435 2 5.44129 2.31607 4.87868 2.87868C4.31607 3.44129 4 4.20435 4 5V19C4 19.7956 4.31607 20.5587 4.87868 21.1213C5.44129 21.6839 6.20435 22 7 22H17C17.7956 22 18.5587 21.6839 19.1213 21.1213C19.6839 20.5587 20 19.7956 20 19V9C20.0053 8.97968 20.0053 8.95832 20 8.94Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1>Inventory System</h1>
          </div>
        </div>
      </header>
      
      <main className="app-content">
        <div className="container">
          <div className="page-title">
            <h2>Dashboard</h2>
          </div>
          
          <AddProduct />
          <InventoryList />
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <div className="text-center">
            <p className="text-muted">&copy; {new Date().getFullYear()} Inventory System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
