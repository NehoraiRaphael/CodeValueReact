import React from 'react';
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSortOption } from '../redux/productSlice';
import { SelectChangeEvent } from '@mui/material';

interface SearchAndSortProps {
  openModal: () => void;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({ openModal }) => {
  const dispatch = useDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchQuery(event.target.value));

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    dispatch(setSortOption(event.target.value));
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      style={{ marginBottom: '16px', width: 'auto' }}
    >
      <Grid item>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openModal}>
          Add
        </Button>
      </Grid>

      <Grid item>
        <TextField size="small"
          placeholder="search products"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item>
        <FormControl variant="outlined" size="small"  sx={{ width: '200px' }} >
          <InputLabel>Sort By</InputLabel>
          <Select onChange={handleSortChange} label="Sort By">
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SearchAndSort;
