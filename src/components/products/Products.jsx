import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../api/products-api';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  
  // Redux hooks to dispatch actions and select state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);

   useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

    return (
       <div className="mb-6 mt-20">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        <i className="fas fa-boxes mr-3"></i>Product Catalog
      </h3>
       <div className="flex justify-end mb-2">
        <button
            onClick={() => navigate('/add-product')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          > <i className="fas fa-plus"></i>
            Add Product
        </button>
      </div>

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
                <button onClick={() => navigate(`/edit-product/${product.id}`)} className="text-blue-500 hover:underline">
                  <i className="fas fa-edit mr-1"></i>Edit
                </button>
                <button onClick={() => dispatch(deleteProduct(product.id))} className="text-red-500 hover:underline">
                  <i className="fas fa-trash mr-1"></i>Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    );
}