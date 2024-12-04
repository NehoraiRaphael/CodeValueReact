import "./App.css";
import React, { useState } from "react";
import MainNavBar from "./components/MainNavBar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProductModal from "./components/AddProductModal";
import SearchAndSort from "./components/SearchAndSort";
import { useSelector, useDispatch } from "react-redux";
import { ProductState, Product, addProduct ,updateProduct} from "./redux/productSlice";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { productList, selectedProduct, searchQuery, sortOption } = useSelector(
    (state: { products: ProductState }) => state.products
  );

  const [open, setOpen] = useState<boolean>(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleAddProduct = (product: Product) => {
    dispatch(
      addProduct({ ...product, id: Date.now(), creationDate: new Date() })
    );
  };

  return (
    <div className="App">
      <MainNavBar />
      <Box sx={{ margin: 4 }}>
  

        <Grid container spacing={2}>
          {/* Left Column: Product List */}
          <Grid item xs={6}>
            <SearchAndSort openModal={handleOpen} />
            <ProductList
              productList={productList}
              searchQuery={searchQuery}
              sortOption={sortOption}
            />
          </Grid>

          {/* Right Column: Selected Product Details */}
          <Grid item xs={6}>
            <ProductDetails
              product={selectedProduct}
              onSave={(updatedProduct) => {
                dispatch(updateProduct(updatedProduct));
              }}
            />
          </Grid>
        </Grid>

        {/* Add Product Modal */}
        <AddProductModal
          open={open}
          onClose={handleClose}
          handleAddProduct={handleAddProduct}
        />
      </Box>
    </div>
  );
};

export default App;
