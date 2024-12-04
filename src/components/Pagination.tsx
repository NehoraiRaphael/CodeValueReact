import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Pagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2} // Adds space between elements
      mt={2} // Optional: Adds margin on top
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
  );
};

export default Pagination;
