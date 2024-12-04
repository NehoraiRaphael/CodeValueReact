import React from "react";
import { Typography, Box, Paper, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Product } from "../redux/productSlice";

interface ProductDetailsProps {
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onSave }) => {
  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Product name is required")
      .max(50, "Product name cannot exceed 50 characters"),
    description: Yup.string()
      .required("Description is required")
      .max(200, "Description cannot exceed 200 characters"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive")
      .typeError("Price must be a valid number"),
    img: Yup.string().url("Must be a valid URL").required("Image URL is required"),
  });


  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      img: product?.img || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (product) {
        onSave({ ...product, ...values });
      }
    },
  });

 
  if (!product) {
    return (
      <Typography variant="body1" color="text.secondary">
        Select a product to see details
      </Typography>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 2,
        textAlign: "left", 
        maxWidth: "100%",
        margin: 0, 
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
 
          {product.img && (
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "110px",
                height: "100px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          )}
          <TextField
            label="Product Name"
            fullWidth
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Description"
            fullWidth
            name="description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            label="Price"
            fullWidth
            name="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            label="Image URL"
            fullWidth
            name="img"
            value={formik.values.img}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.img && Boolean(formik.errors.img)}
            helperText={formik.touched.img && formik.errors.img}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ProductDetails;
