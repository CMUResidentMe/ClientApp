import React, {useState} from 'react';
import { MenuBookOutlined } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResidentMeLogo from "../../../assets/logo.png";
import CategoryCards from "./CategoryCards.jsx";
import MarketplaceFooter from "./MarketplaceFooter.jsx";
import { Card, Row, Col, Container, Image } from 'react-bootstrap';
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import NavBar from "../../../components/NavBar.js";
import MarketPlaceNav from "../components/MarketPlaceNav.jsx";
function MarketPlaceIndexPage() {
    const { loading, data } = {};
    const categories = data?.getAllListingCategories || [];
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const handleDrawerToggle = () => {
        setDrawerOpen(!isDrawerOpen);
    };


    return (
        <>
            <Container className={'mt-5'}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'Merriweather, serif', fontWeight: 'bold', marginTop: '0' }}>
                        Welcome to ResidentMe - MarketPlace
                    </Typography>
                    <MarketPlaceNav />
                </Box>
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
                        <p>
                            <Button
                                onClick={() => navigate('/marketplace/playground')}
                                variant={'contained'}>
                                Start Now
                            </Button>
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
            </Container>
        </>
    );
}

export default MarketPlaceIndexPage;
