import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProduct from './AddProduct'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct, fetchProductById } from '../../../api/products-api';
import { cancelEditing, setEditingProduct } from '../../../features/products/productsSlice';

// Mocks
jest.mock('react-redux', ()=>({
    useDispatch : jest.fn(),
    useSelector : jest.fn()
}));

jest.mock('react-router-dom', ()=>({
    useNavigate : jest.fn(),
    useParams : jest.fn()
}));

jest.mock('../../../api/products-api', ()=>({
    addProduct : jest.fn(),
    updateProduct : jest.fn(),
    fetchProductById : jest.fn(),
}));

jest.mock('../../../features/products/productsSlice', ()=>({
    cancelEditing : jest.fn(),
    setEditingProduct : jest.fn()
}));

// test suite
describe('Add Product component' ,() =>{

    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    //setup 
    beforeEach(()=>{
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
        useNavigate.mockReturnValue(mockNavigate);
        useParams.mockReturnValue({ id: undefined }); // no ID means Add mode
        useSelector.mockImplementation((callback) =>
            callback({ products: { editingProduct: null } })
        );
    });

    it('renders form fields correctly', ()=>{
        render(<AddProduct />);
        expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    });

    it('validates required fields', async ()=>{
        // rendering component
        render(<AddProduct />);
        // trigger submit
        fireEvent.click(screen.getByRole('button', { name: /Save Product/i }));

        await waitFor(()=>{
            // verify validation messages
            expect(screen.getByText(/Product Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Product price is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Product description is required/i)).toBeInTheDocument();
        });
    });

    it('submits valid form and dispatches addProduct', async ()=>{

        addProduct.mockImplementation((data)=> jest.fn()); // Fix for undefined return from add product
        
        // rendering component
        render(<AddProduct />);
        
        fireEvent.change(screen.getByLabelText(/Product Name/i),{
          target : { value:  'Test Product' }
        });

        fireEvent.change(screen.getByLabelText(/Price/i),{
          target : { value: '99.99' }
        });

        fireEvent.change(screen.getByLabelText(/Description/i),{
          target : { value:  'This is a great product with enough description.' }
        });

        // trigger submit
        fireEvent.click(screen.getByRole('button', { name: /Save Product/i }));

        await waitFor(()=>{
            // verify submit
            expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); // thunk
        });
    });


    it('displays Edit Product when editingProduct exists', async ()=>{

        const mockProduct =  {
            id: 1,
            name: "Test Product",
            price: 59.99,
            description: 'This is a great product with enough description.'
        }

        // Provide a mocked ID param to trigger fetch
        useParams.mockReturnValue({id: '1'});
        
        // Simulate thunk dispatch
        const mockDispatch = jest.fn((action) => {
            if (typeof action === 'function') {
                return action(); // run thunk
            }
            return action;
        });

        useDispatch.mockReturnValue(mockDispatch);

        // Mock API thunk
        fetchProductById.mockImplementation(() => () => Promise.resolve({ payload: mockProduct }));

        // Mock Redux state selector for editingProduct
        useSelector.mockImplementation((selectorFn) =>
            selectorFn({
                products: {
                    editingProduct: mockProduct,
                },
            })
        );
                
        // rendering component
        render(<AddProduct />);
                
       // Verify correct heading text
        expect(screen.getByText((content, element) =>
            element.tagName.toLowerCase() === 'span' && /Edit Product/i.test(content)
        )).toBeInTheDocument();

        await waitFor(() =>
            expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument()
        );
        // expect(await  screen.getByDisplayValue('59.99')).toBeInTheDocument();
        // expect(await  screen.getByDisplayValue('This is a great product with enough description.')).toBeInTheDocument();
    });

});