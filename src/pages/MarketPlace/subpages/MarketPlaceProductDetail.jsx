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
    const [product, setProduct] = useState(null);
    const { goodsId } = useParams();
    const [openOrderForm, setOpenOrderForm] = useState(false);
    const [isOwner, setIsOwner] = useState(true);
    const {loading, error, data} = useQuery(GET_GOODS_BY_ID, {
        variables: {id: goodsId}
    });
    const {_, __, data: isGoodsOwnerData} = useQuery(IS_GOODS_OWNER, {
        variables: {
            goodsId
        }
    });

    useEffect(() => {
        if (isGoodsOwnerData) {
            console.log(isGoodsOwnerData)
            setIsOwner(isGoodsOwnerData.isGoodsOwner);
        }
    }, [isGoodsOwnerData]);
    const [order, {data: orderData, loading:orderLoading, error: orderError}] = useMutation(ORDER_GOODS);
    useEffect(() => {
        if (data && data.getGoodsById) setProduct(data.getGoodsById);
    }, [data]);


    const [contactOfBuyer, setContactOfBuyer] = useState('');
    const [tradePlace, setTradePlace] = useState('');

    const handleOrder = () => {
        if (!contactOfBuyer.trim()) {
            message.warning('Please enter your contact information');
            return
        }
        if (!tradePlace.trim()) {
            message.warning('Please enter the trade place');
            return

        }
        setOpenOrderForm(false);
        order({
            variables: {
                goodsId,
                contact: contactOfBuyer,
                tradePlace
            }
        }).then(() => {
            message.success('Order placed successfully');
            setContactOfBuyer('');
            setTradePlace('');
        })
    };


    if (!product) {
        return <div className={'mt-5 d-flex justify-content-center'}>
            <Spinner />
        </div>;
    }

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
        <Container className="my-5">

            <Dialog open={openOrderForm} fullWidth onClose={() => setOpenOrderForm(false)}>
                <DialogTitle>Buy Product</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Fill in your contact information below and click 'Order' to proceed with your purchase.
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
                        label="Trade Place"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={tradePlace}
                        onChange={(e) => setTradePlace(e.target.value)}
                        placeholder="Enter trade place"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenOrderForm(false)} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleOrder} color="primary">
                        Order
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
                        {status}
                    </span>
                    </Typography>
                    {!isOwner && status !== 'sold' && (
                        <Button
                            onClick={() => setOpenOrderForm(true)}
                            startIcon={<ShoppingBasketIcon />}
                            variant="contained" color="primary" className={'mt-5'}>
                            Order
                        </Button>
                    )}
                    {status === 'sold' && (
                        <Button variant="contained" disabled>
                            This product has been sold
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default MarketPlaceProductDetailPage;