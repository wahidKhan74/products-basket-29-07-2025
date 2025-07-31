import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { addProduct, fetchProductById, updateProduct } from '../../api/products-api';
import { cancelEditing, setEditingProduct } from '../../features/products/productsSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {

    // Redux hooks to dispatch actions and select state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const editingProduct = useSelector((state) => state.products.editingProduct);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
    });

    // Effect to set form data when editingProduct changes
      useEffect(() => {
        if (id) {
          dispatch(fetchProductById(id)).then((res)=>{
            if (res.payload) {
              dispatch(setEditingProduct(res.payload))
            }
          });
        }
      }, [id, dispatch]);

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                price: editingProduct.price,
                description: editingProduct.description,
            });
        } else {
            setFormData({
                name: '',
                price: '',
                description: '',
            });
        }
    }, [editingProduct]);

    // Function to handle form submission (editing or adding a product)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            // Dispatch update action
            dispatch(updateProduct({ ...formData, id: editingProduct.id }));
        } else {
            // Dispatch add action
            dispatch(addProduct(formData));
        }
        // Reset form after submission
        setFormData({ name: '', price: '', description: '' });
        navigate(`/products`);
    };

    // Function to handle input changes
    const handleChange =(e) =>{
        setFormData((prev)=> ({ ...prev, [e.target.id] : e.target.value }));
    }

    // This component can be used to add a new product

    return (
        <div className="max-w-2xl mx-auto mb-10 mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="fas fa-plus-circle text-blue-500 mr-3"></i>
          <span>{editingProduct ? 'Edit Product' : 'Add New Product'}</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
              <i className="fas fa-tag mr-2"></i>Product Name
            </label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2" placeholder="Enter product name" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="price">
              <i className="fas fa-dollar-sign mr-2"></i>Price
            </label>
            <input type="number" id="price" step="0.01" value={formData.price} onChange={handleChange} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2" placeholder="0.00" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">
            <i className="fas fa-align-left mr-2"></i>Description
          </label>
          <textarea id="description" rows="4" value={formData.description} onChange={handleChange} required className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 resize-none" placeholder="Enter product description"></textarea>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105">
            <i className="fas fa-save mr-2"></i>{editingProduct ? 'Update Product' : 'Save Product'}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => dispatch(cancelEditing())} className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105">
              <i className="fas fa-times mr-2"></i>Cancel
            </button>
          )}
        </div>
      </form>
    </div>
    );
}