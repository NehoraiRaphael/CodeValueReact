import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  creationDate: Date;
}


export interface ProductState {
  productList: Product[];
  selectedProduct: Product | null;
  searchQuery: string;
  sortOption: string;
}


const initialState: ProductState = {
  productList: [
    {
      id: 2,
      name: "Smartphone",
      description: "Latest model with high-end features.",
      price: 800,
      creationDate: new Date("2023-09-15"),
      img: 'https://picsum.photos/200',
    },
    {
      id: 1,
      name: "Laptop",
      description: "A powerful laptop for professionals.",
      price: 1200,
      creationDate: new Date("2023-10-01"),
      img: 'https://picsum.photos/200/300?grayscale',
    },
    {
      id: 3,
      name: "Headphones",
      description: "Noise-cancelling over-ear headphones.",
      price: 250,
      creationDate: new Date("2023-10-05"),
      img: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      id: 4,
      name: "Monitor",
      description: "27-inch 4K UHD monitor.",
      price: 450,
      creationDate: new Date("2023-08-25"),
      img: 'https://picsum.photos/id/237/200/300',
    },
    {
      id: 5,
      name: "Keyboard",
      description: "Mechanical keyboard with RGB lighting.",
      price: 100,
      creationDate: new Date("2023-07-10"),
      img: 'https://picsum.photos/200/300.webp',
    },
  ],
  selectedProduct: null,
  searchQuery: "",
  sortOption: "",
};


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.productList.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productList = state.productList.filter(
        (product) => product.id !== action.payload
      );
    },
    selectProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.productList.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.productList[index] = action.payload;
      }
    },
  },
});

export const { 
   addProduct,
   deleteProduct,
   selectProduct, 
   setSearchQuery, 
   setSortOption,
   updateProduct,
  } = productSlice.actions;

// Export the reducer
export default productSlice.reducer;
