import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../api/products-api';
import Products from './Products';

// Mocks
jest.mock('react-redux', ()=>({
    useDispatch : jest.fn(),
    useSelector : jest.fn()
}));

jest.mock('react-router-dom', ()=>({
    useNavigate : jest.fn(),
}));

jest.mock('../../api/products-api', ()=>({
    fetchProducts: jest.fn(),
    deleteProduct: jest.fn(),
}));

describe('Products Component', () => { 
    const mockNavigate = jest.fn();
    // Simulate thunk dispatch
    const mockDispatch = jest.fn((action) => {
        if (typeof action === 'function') {
            return action(); // run thunk
        }
        return action;
    });

    beforeEach(()=>{
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
        useNavigate.mockReturnValue(mockNavigate);
        fetchProducts.mockReturnValue(jest.fn());
    });

    it('dispatches fetchProducts on mount', () => { 
        // empty product list
        useSelector.mockReturnValue([]);  

        // rendering products component
        render(<Products />);
       
        // fetchProducts should be called
        expect(fetchProducts).toHaveBeenCalled();

        // and the thunk function should be dispatched
        expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); // thunk support
    });

    it('renders empty state when no products exist', () => { 
        // empty product list
        useSelector.mockReturnValue([]);  // no products

        // rendering products component
        render(<Products />);
       
        expect(screen.getByText(/No products available/i)).toBeInTheDocument();
    });

     it('renders product cards when products are available', () => {
        
        // mock products
        const mockProducts = [
            { id: 1, name: 'iPhone', description: 'Smartphone by Apple', price: 999.99},
            { id: 2, name: 'MacBook', description: 'Laptop by Apple', price: 1999.99},
        ]
        
        // added product list
        useSelector.mockReturnValue(mockProducts);  

        // rendering products component
        render(<Products />);
       
        expect(screen.getByText(/iPhone/i)).toBeInTheDocument();
        expect(screen.getByText(/MacBook/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Edit/i)).toHaveLength(2);
        expect(screen.getAllByText(/Delete/i)).toHaveLength(2);
    });


});