import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';

const ProductCard = ({ product, onProductClick }) => (
  <Card sx={{ maxWidth: 345, m: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image={product.image} // Replace with actual image URL
      alt={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {product.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => onProductClick(product)}>View More</Button>
    </CardActions>
  </Card>
);

export default ProductCard;
