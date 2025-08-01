import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/products-api';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../features/products/cartSlice';


export default function Home() {

  // Redux hooks to dispatch actions and select state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

  // handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // buy now
  const handleBuyNow = (productId) => {
    navigate(`/checkout/${productId}`);
  };

    return (
         <div className="mb-6 mt-20">
            {products.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500 text-lg">No products available. Add your first product!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <p className="text-blue-600 font-semibold mb-4">${product.price}</p>
                      <div className="flex justify-between">
                       <button onClick={() => handleAddToCart(product)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                            <i className="fas fa-cart-plus mr-1"></i>Add to Cart
                      </button>
                    <button onClick={() => handleBuyNow(product.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm">
                        <i className="fas fa-bolt mr-1"></i>Buy Now
                    </button>
                      </div>
                    </div>
                  ))}
                </div>
        )}
        </div>
    );
}