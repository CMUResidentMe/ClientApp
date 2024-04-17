import React, { useState } from 'react';
import { Container, Grid, Box, IconButton, Typography, Modal } from '@mui/material';
import { MenuBookOutlined } from '@mui/icons-material';
import Navbar from '../../components/NavBar';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const MarketplacePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const products = [
    {
      id: 1,
      name: 'Wooden Watch',
      image: 'https://via.placeholder.com/200x140.png?text=Product+1',
      description: 'A handcrafted wooden watch.',
    },
    {
      id: 2,
      name: 'Artisan Coffee Beans',
      image: 'https://via.placeholder.com/200x140.png?text=Product+2',
      description: 'Rich and aromatic artisan coffee beans.',
    },
    {
      id: 3,
      name: 'Vintage Leather',
      image: 'https://via.placeholder.com/200x140.png?text=Product+3',
      description: 'Stylish vintage backpack.',
    },
    {
      id: 4,
      name: 'Organic Cotton T-Shirt',
      image: 'https://via.placeholder.com/200x140.png?text=Product+4',
      description: 'Soft organic cotton t-shirt available.',
    },
    // ... more products
  ];

  return (
    // The fragment <>...</> wraps all the JSX elements
    <>
      <Container maxWidth="lg" sx={{
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        paddingTop: '1rem',
        paddingBottom: '2rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        borderRadius: '8px'
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" component="h1">
            Marketplace
          </Typography>
          <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuBookOutlined />
          </IconButton>
        </Box>
        <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
      </Container>
      <Box sx={{ padding: '2rem', boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)', borderRadius: '8px', backgroundColor: 'white' }}>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} onProductClick={handleProductClick} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={isProductModalOpen} onClose={() => setProductModalOpen(false)}>
        <ProductModal product={selectedProduct} onClose={() => setProductModalOpen(false)} />
      </Modal>
    </>
  );
};

export default MarketplacePage;
