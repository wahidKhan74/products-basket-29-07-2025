import './App.css'
import Navbar from './components/Navbar'
import { Route, Router, Routes } from 'react-router-dom'
import { routes } from './routes';
import Products from './components/products/Products.jsx';
import AddProduct from './components/products/AddProduct';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import Profile from './pages/Profile.jsx';


function App() {
 
   const [isLoggedIn] = useState(true); // make this dynamic later with real auth

  const getElement = (path) => {
    switch (path) {
      case '/products':
        return (
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Products />
          </ProtectedRoute>
        );
      case '/add-product':
          return (
          <ProtectedRoute isLoggedIn={isLoggedIn}>
             <AddProduct />
          </ProtectedRoute>
        );
      case '/profile':
        return (
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile />
          </ProtectedRoute>
        );
      case '/login':
        return <Login />;
      case '/register':
        return <Register />;
      default:
        return <div className="p-4">Page not found</div>;
    }
  };


  return (
     <>
      <Navbar />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={getElement(route.path)}
            />
          ))}
        </Routes>
     </>
  )
}

export default App
