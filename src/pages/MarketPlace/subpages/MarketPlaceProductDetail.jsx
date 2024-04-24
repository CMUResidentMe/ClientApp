import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {Container, Row, Col, Card, Spinner} from 'react-bootstrap';
import {Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField} from '@mui/material';
import {useMutation, useQuery} from "@apollo/client";
import {GET_GOODS_BY_ID, IS_GOODS_OWNER} from "../graphql/queries.js";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {ORDER_GOODS} from "../graphql/mutations.js";
import {message} from "antd";


const MarketPlaceProductDetailPage = () => {
    // State to store the current product details.
    const [product, setProduct] = useState(null);

    // Retrieving the product ID from the URL parameters.
    const { goodsId } = useParams();

    // State to control the visibility of the order form.
    const [openOrderForm, setOpenOrderForm] = useState(false);

    // State to check if the current user is the owner of the product.
    const [isOwner, setIsOwner] = useState(true);

    // useQuery hook to fetch product details by ID, setting variables for the query dynamically.
    const {loading, error, data} = useQuery(GET_GOODS_BY_ID, {
        variables: {id: goodsId}
    });

    // useQuery hook to check if the current user is the owner of the goods, ignoring unused destructuring assignment variables.
    const {_, __, data: isGoodsOwnerData} = useQuery(IS_GOODS_OWNER, {
        variables: {
            goodsId
        }
    });

    // useEffect to set ownership status based on fetched data.
    useEffect(() => {
        if (isGoodsOwnerData) {
            console.log(isGoodsOwnerData) // Log the ownership data for debugging.
            setIsOwner(isGoodsOwnerData.isGoodsOwner);
        }
    }, [isGoodsOwnerData]);

    // useMutation hook for placing an order, capturing loading, data, and error states for the mutation.
    const [order, {data: orderData, loading: orderLoading, error: orderError}] = useMutation(ORDER_GOODS);

    // useEffect to update the product state when data is available.
    useEffect(() => {
        if (data && data.getGoodsById) setProduct(data.getGoodsById);
    }, [data]);

    // State for managing buyer's contact and trade place information.
    const [contactOfBuyer, setContactOfBuyer] = useState('');
    const [tradePlace, setTradePlace] = useState('');

    // Function to handle the submission of an order.
    const handleOrder = () => {
        if (!contactOfBuyer.trim()) {
            message.warning('Please enter your contact information'); // Warning if contact info is empty.
            return
        }
        if (!tradePlace.trim()) {
            message.warning('Please enter the trade place'); // Warning if trade place is empty.
            return
        }
        setOpenOrderForm(false); // Close the order form upon submission.
        order({
            variables: {
                goodsId,
                contact: contactOfBuyer,
                tradePlace
            }
        }).then(() => {
            message.success('You have expressed your interest successfully'); // Success message post order.
            setContactOfBuyer(''); // Reset contact info.
            setTradePlace(''); // Reset trade place info.
        })
    };

    // Conditional rendering for when the product details are not yet available.
    if (!product) {
        return <div className={'mt-5 d-flex justify-content-center'}>
            <Spinner />
        </div>;
    }

    // Destructuring product details for ease of access in the component.
    const {
        title,
        description,
        price,
        image,
        category,
        publishUser,
        contact,
        status,
    } = product;

    return (
        <div className={'container'} style={{ marginTop: '130px' }} >
        <Container className="my-5" >
            <Dialog open={openOrderForm} fullWidth onClose={() => setOpenOrderForm(false)}>
                <DialogTitle>Express Interest</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Fill in your contact information below and click 'Express Interest' to proceed with your purchase.
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="contact"
                        label="Contact Info"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={contactOfBuyer}
                        onChange={(e) => setContactOfBuyer(e.target.value)}
                        placeholder="Enter email or phone number"
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="tradePlace"
                        label="Trade Location"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={tradePlace}
                        onChange={(e) => setTradePlace(e.target.value)}
                        placeholder="Enter Your Ideal Trade Location"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenOrderForm(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleOrder} style={{ backgroundColor: '#A67B5B', color: '#ffffff', '&:hover': {backgroundColor: '#94684f'}}} >
                        Express Interest
                    </Button>
                </DialogActions>
            </Dialog>

            <Row>
                <Col md={6}>
                    <Card.Img variant="top" src={image} alt={title} />
                </Col>
                <Col md={6}>
                    <Typography variant="h3" gutterBottom>
                        {title}
                    </Typography>
                    <hr />
                    <Typography variant="h6" gutterBottom>
                        <span className="badge bg-primary">
                            {category}
                        </span>
                    </Typography>
                    <Box display="flex" alignItems="center" my={2}>
                        <Typography variant="h5" className={'text-danger'} mr={2}>
                            Price: ${price}
                        </Typography>
                    </Box>
                    <Typography variant="body1" gutterBottom>
                        {description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Contact: {contact}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Status: <span className="badge bg-success">
                        {status === 'sold' ? 'Sold Probably' : status}
                    </span>
                    </Typography>
                    {!isOwner && status !== 'sold' && (
                        <Button
                            onClick={() => setOpenOrderForm(true)}
                            startIcon={<ShoppingBasketIcon />}
                            variant="contained" style={{ backgroundColor: '#A67B5B', color: '#ffffff', '&:hover': {backgroundColor: '#94684f'}}} className={'mt-5'}>
                            Express Interest
                        </Button>
                    )}
                    {status === 'sold' && (
                        <Button variant="contained" disabled>
                            This product probably has been sold. Please contact the publisher.
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default MarketPlaceProductDetailPage;