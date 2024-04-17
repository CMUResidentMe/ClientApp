import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ProductModal = ({ product, onClose }) => (
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {product.name}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {product.description}
      {/* Include more product details here */}
    </Typography>
    {/* Actions like edit, delete, purchase can be included here */}
    <Button onClick={onClose}>Close</Button>
  </Box>
);

export default ProductModal;
