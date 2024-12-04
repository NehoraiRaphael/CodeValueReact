import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Product } from '../redux/productSlice';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  handleAddProduct: (product: Product) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  handleAddProduct,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Product name is required')
      .max(50, 'Product name cannot exceed 50 characters'),
    description: Yup.string()
      .required('Description is required')
      .max(200, 'Description cannot exceed 200 characters'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive')
      .typeError('Price must be a valid number'),
    img: Yup.string()
      .url('Must be a valid URL')
      .required('Image URL is required'),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      img: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleAddProduct({
        ...values,
        id: Date.now(),
        creationDate: new Date(),
      });
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            margin="dense"
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
            margin="dense"
            multiline
            rows={4}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="dense"
            name="img"
            value={formik.values.img}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.img && Boolean(formik.errors.img)}
            helperText={formik.touched.img && formik.errors.img}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddProductModal;
