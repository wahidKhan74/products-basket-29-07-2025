import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteProduct, fetchProductById, fetchProducts, updateProduct } from '../../api/products-api';

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle' ,editingProduct: null },
  reducers: {
    setEditingProduct: (state, action) => {
      state.editingProduct = action.payload;
    },
    clearEditingProduct: (state) => {
      state.editingProduct = null;
    }
  },

  extraReducers: builder => {
    builder
      // get all products
      .addCase(fetchProducts.pending, state => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, state => { state.status = 'failed'; })

      // add a new product
      .addCase(addProduct.pending, state => { state.status = 'loading'; })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, state => { state.status = 'failed'; })
      
      // get one product by id
      .addCase(fetchProductById.pending, state => { state.status = 'loading'; })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchProductById.rejected, state => { state.status = 'failed'; })

      // delete a product by id
      .addCase(deleteProduct.pending, state => { state.status = 'loading'; })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, state => { state.status = 'failed'; })

      // update a product
      .addCase(updateProduct.pending, state => { state.status = 'loading'; })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, state => { state.status = 'failed'; });
  },
});

export const { setEditingProduct, cancelEditing } = productsSlice.actions;
export default productsSlice.reducer;