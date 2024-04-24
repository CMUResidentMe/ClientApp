import {useMutation, useQuery} from "@apollo/client";
import {GET_GOODS_OF_USER} from "../graphql/queries.js";
import React, {useEffect, useState} from "react";
import {Empty, message} from "antd";
import {IconButton} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight.js";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {DELETE_GOODS} from "../graphql/mutations.js";
import {Modal} from 'antd';


export default function MarketPlaceMyProducts() {
    // useNavigate hook from React Router for programmatically navigating between views.
    const navigate = useNavigate();

    // useMutation hook from Apollo Client to execute the DELETE_GOODS mutation.
    const [deleteGoods] = useMutation(DELETE_GOODS);

    // useQuery hook to fetch user's products, with handling for loading states, errors, and automatic refetching.
    const { refetch, loading, error, data = [] } = useQuery(GET_GOODS_OF_USER);
    
    // useState hook to maintain the state of products listed by the user.
    const [products, setProducts] = useState([]);

    // useEffect to process fetched data and update the products state.
    useEffect(() => {
        // Checking if the fetched data array is valid before updating state to prevent errors.
        if (Array.isArray(data.getGoodsByUser)) {
            console.log(data)  // Logs the fetched data for debugging purposes.
            setProducts(data.getGoodsByUser)  // Setting the fetched goods to the products state.
        }
    }, [data]);  // Data dependency to trigger re-execution of the effect when data changes.

    // Function to handle the delete action for a product.
    const handleClickDelete = async (id) => {
        // Modal dialog to confirm deletion, using Ant Design's Modal component.
        Modal.confirm({
            title: 'Are you sure to delete this product?',  // Modal title.
            content: 'This action cannot be undone',  // Warning message about deletion.
            onOk: async () => {
                // Executing the delete mutation when user confirms the action.
                await deleteGoods({
                    variables: {
                        id: id
                    }
                });
                message.success('Delete success')  // Display success message on successful deletion.
                await refetch();  // Refetching the goods to update the UI post deletion.
            }
        })
    }

    return (
        <div className="container mt-5" style={{ marginLeft: '200px' }}>
            <h2 style={{ fontFamily: 'Roboto, sans-serif', color: '#A67B5B', fontWeight: '500', fontSize: '28px', textAlign: 'left', marginBottom: '20px', marginTop: '120px' }}>
                My Products
            </h2>
            <div className="col-md-9">
                {loading && (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" />
                    </div>
                )}
                <div className="row">
                    {products.length === 0 && (
                        <Empty description="No Products Found" />
                    )}
    
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <img
                                    src={product.image}
                                    style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                                    className="card-img-top"
                                    alt={product.title}
                                />
                                <div className="card-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <h5 className="card-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {product.title}
                                    </h5>
                                    <div>
                                        <p>
                                            <span className="badge bg-primary">
                                                {product.category}
                                            </span>
                                        </p>
                                        <p className="card-text text-danger">${product.price}</p>
                                        <p>Published At: {new Date(Number(product.createdAt)).toLocaleString()}</p>
                                    </div>
                                    <div className={'text-end d-flex gap-2 justify-content-end'}>
                                        <IconButton
                                            onClick={() => navigate('/marketplace/goods/' + product.id)}
                                            color={'primary'}>
                                            <ArrowCircleRightIcon />
                                        </IconButton>
    
                                        <IconButton
                                            onClick={() => navigate('/marketplace/update/' + product.id)}
                                            color={'primary'}>
                                            <EditIcon />
                                        </IconButton>
    
                                        <IconButton
                                            onClick={() => handleClickDelete(product.id)}
                                            color={'error'}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )    
}