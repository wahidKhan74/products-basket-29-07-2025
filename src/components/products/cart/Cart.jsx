import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../../features/products/cartSlice'; // Add this action to cartSlice
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const handleRemove = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-left">
        <i className="fas fa-shopping-cart text-blue-600"></i> Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-gray-500 py-12 text-left">
          <i className="fas fa-box-open text-5xl mb-4 text-gray-300"></i>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 text-left">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-start py-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-blue-600 font-semibold mt-1">${item.price}</p>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  <i className="fas fa-trash mr-1"></i>Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 mt-6 text-left">
            <p className="text-lg font-semibold text-gray-700">
              Total: <span className="text-blue-600">${total.toFixed(2)}</span>
            </p>

            <button
              onClick={handleCheckout}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
            >
              <i className="fas fa-credit-card mr-2"></i>Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
