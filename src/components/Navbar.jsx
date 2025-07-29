import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

//create nav bar component
export default function Navbar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const user = useSelector(state=>state.auth.user);
    const dispatch = useDispatch();


    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const filteredRoutes = routes.filter(route => {
        if (route.isPrivate && !user) return false; // Hide private routes
        if (route.guestOnly && user) return false; // Hide guest-only routes
        return true; // Show all other routes
    });
    
    // This component will render the navigation bar with links to different routes


  return (
   
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <i className="fas fa-store text-2xl text-blue-600 mr-2"></i>
            <span className="text-xl font-bold text-gray-800">ProductHub</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {filteredRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <i className={`${route.icon} mr-1`}></i>
                {route.label}
              </Link>
            ))}

            { user && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              <i className="fas fa-chart-line mr-1"></i>
              <span id="productCount">0</span> Products
            </div>
            )}


            { user && (
            <button
              onClick={() => dispatch(logout())}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-200"
            > Logout
            </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => toggleMobileMenu()}
              className="text-gray-600 hover:text-blue-600"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            {filteredRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className={`${route.icon} mr-2`}></i>
                {route.label}
              </Link>
            ))}

            { user && (
            <button
              onClick={() => dispatch(logout())}
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-200"
            > Logout
            </button>
            )}
          </div>
        )}
      </div>
    </nav>
    
  );
}