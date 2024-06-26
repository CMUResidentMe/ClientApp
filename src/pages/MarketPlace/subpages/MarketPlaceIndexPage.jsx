import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResidentMeLogo from "../../../assets/logo.png";
import MarketIcon from '../../../assets/market-logo.png';
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MarketPlaceIndexPage() {
    const { loading, data } = {};
    const categories = data?.getAllListingCategories || [];
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    return (
        <div style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFFACD 100%)', minHeight: '100vh' }}>
            <Container style={{ marginTop: '85px', padding: '20px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: '24px' }}>
                    <Typography variant="h4" component="h1" gutterBottom style={{ fontFamily: 'Merriweather, serif', fontWeight: 'bold', color: '#654321' }}>
                    </Typography>
                </Box>
                <Row style={{ padding: '16px', marginBottom: '32px' }}>
                    <Col sm={6}>
                        <Image style={{ width: 200, height: 200, borderRadius: '50%', objectFit: 'cover' }} src={MarketIcon} />
                    </Col>
                    <Col sm={5}>
                        <h1 style={{ fontWeight: '600', color: '#8B4513', fontSize: '28px', fontFamily: 'Georgia, serif' }}>ResidentMe Communication</h1>
                        <p style={{ color: '#A0522D', fontSize: '18px', fontFamily: 'Georgia, serif' }}>
                            Welcome to ResidentMe - MarketPlace, the communication that allows you to publish and purchase items
                            from your neighbors. We wish people in this communication can purchase tools, equipment and more.
                        </p>
                        <p>
                            <Button
                                onClick={() => navigate('/marketplace/playground')}
                                variant={'contained'}
                                style={{ backgroundColor: '#D2B48C', color: 'white' }}>
                                Start Now
                            </Button>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Card className="text-center" style={{ backgroundColor: '#DAA520', color: 'white', fontWeight: 'bold', marginBottom: '40px', paddingTop: '16px', paddingBottom: '16px' }}>
                        <Card.Body>
                            Are you ready to use this MarketPlace? Click 'Start Now' and select a
                            category to start your marketplace journey today...
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </div>
    );
}

export default MarketPlaceIndexPage;
