import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { MenuBookOutlined } from '@mui/icons-material';
import Navbar from '../../components/NavBar.js';
import { useQuery } from "@apollo/client";
import { QUERY_All_CATEGORIES } from "../../utils/queries.js";
import CategoryCards from './CategoryCards.js';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import MarketplaceFooter from './MarketplaceFooter.js';
import ResidentMeLogo from "../../assets/logo.png";

const MarketplacePage = () => {
  const { loading, data } = useQuery(QUERY_All_CATEGORIES);
  const categories = data?.getAllListingCategories || [];
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Merriweather, serif', fontWeight: 'bold', marginTop: '0' }}>
              Welcome to MarketPlace
            </Typography>
          <IconButton color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuBookOutlined />
          </IconButton>
        </Box>
        <Navbar isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />
        <Row className="px-4 my-4">
        <Col sm={6}>
          <Image style={{ width: 200, height: 200, borderRadius: '50%', objectFit: 'cover' }} src={ResidentMeLogo}/>
        </Col>  
        <Col sm={5}> 
          <h1 className="font-weight-light"> ResidentMe Community</h1>
          <p>
            Welcome to ResidentMe - MarketPlace, the community that allows you to publish and purchase items
            from your neighbors. We wish people in this comunity can purchase tools, equipment and more.
          </p>
        </Col>
      </Row>
      <Row>
          <Card className="text-center bg-secondary fw-bold text-white my-5 py-2">
            <Card.Body>
              Are you ready to use this MarketPlace? Select a
              category and start your marketplace journey today...
            </Card.Body>
          </Card>
        </Row>
        <div id="categoryCardSection" className="col-12 col-md-10 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CategoryCards categories={categories} />
          )}
        </div>
      </Container>
      <MarketplaceFooter/>
    </>
  );
};

export default MarketplacePage;
