import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes';
import Products from './components/products/Products.jsx';
import AddProduct from './components/products/add-product/AddProduct';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile.jsx';
import Home from './pages/Home.jsx';
import { useSelector } from 'react-redux';
import Cart from './components/products/cart/Cart.jsx';
import Header from './components/header/Header.jsx';


function App() {
 
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user; // make this dynamic later with real auth

  const getElement = (path) => {
    switch (path) {
       case '/':
        return <Home />;
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
      case '/edit-product/:id':
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
      case '/cart':
        return <Cart />;
      case '/register':
        return <Register />;
      default:
        return <div className="p-4">Page not found</div>;
    }
  };


  return (
     <>
     <Header />
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
