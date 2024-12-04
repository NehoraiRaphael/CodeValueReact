import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product, selectProduct, deleteProduct } from "../redux/productSlice";
import { useDispatch } from "react-redux";

interface ProductListProps {
  productList: Product[];
  searchQuery: string;
  sortOption: string;
}

const ProductList: React.FC<ProductListProps> = ({
  productList,
  searchQuery,
  sortOption,
}) => {
  const dispatch = useDispatch();
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);


  const filteredProducts = productList
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price") return a.price - b.price;
      if (sortOption === "name") return a.name.localeCompare(b.name);
      return 0;
    });


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Box>
   
      <List dense>
        {paginatedProducts.map((product) => (
          <ListItem
            key={product.id}
            component="button"
            onClick={() => dispatch(selectProduct(product))}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(product.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            sx={{
              mb: 2, // Adds bottom margin
              mt: 1, // Adds top margin
            }}
          >
            <ListItemAvatar>
              <Avatar src={product.img} />
            </ListItemAvatar>
            <ListItemText
              primary={`${product.name} - $${product.price}`}
              secondary={product.description}
            />
          </ListItem>
        ))}
      </List>

  
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mt={2}
      >
        <Button
          variant="text"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &lt; Prev Page
        </Button>

        <Typography variant="body1">
          {currentPage} of {totalPages}
        </Typography>

        <Button
          variant="text"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default ProductList;
