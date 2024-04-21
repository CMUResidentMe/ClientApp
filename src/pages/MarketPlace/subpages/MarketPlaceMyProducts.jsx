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
    const navigate = useNavigate();
    const [deleteGoods] = useMutation(DELETE_GOODS);
    const { refetch, loading, error, data = [] } = useQuery(GET_GOODS_OF_USER);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (Array.isArray(data.getGoodsByUser)) {
            console.log(data)
            setProducts(data.getGoodsByUser)
        }
    }, [data]);

    const handleClickDelete = async (id) => {
        Modal.confirm({
            title: 'Are you sure to delete this product?',
            content: 'This action cannot be undone',
            onOk: async () => {
                await deleteGoods({
                    variables: {
                        id: id
                    }
                });
                message.success('Delete success')
                await refetch();
            }
        })
    }

    return (
       <div className={'container mt-5'}>
           <div className="col-md-9">
               {loading && (
                   <div className={'d-flex justify-content-center'}>
                        <Spinner />
                   </div>
               )}
               <div className="row">
                   {products.length === 0 && (
                       <Empty />
                   )}

                   {products.map((product) => (
                       <div key={product.id} className="col-md-4 mb-4">
                           <div className="card">
                               <img
                                   src={product.image}
                                   className="card-img-top"
                                   alt={product.title}
                               />
                               <div className="card-body">
                                   <h5 className="card-title">{product.title}</h5>
                                   <p>
                                            <span className="badge bg-primary">
                                                {product.category}
                                            </span>
                                   </p>
                                   <p className="card-text text-danger">${product.price}</p>
                                   <p>
                                       Published At: {new Date(Number(product.createdAt)).toLocaleString()}
                                   </p>
                                   <p className={'text-end d-flex gap-2 justify-content-end'}>
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
                                   </p>
                               </div>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>
    )
}