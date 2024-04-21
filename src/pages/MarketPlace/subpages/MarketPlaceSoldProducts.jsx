import {useQuery} from "@apollo/client";
import {GET_ORDERS_BY_USER, GET_SOLD_PRODUCTS} from "../graphql/queries.js";
import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {Spinner} from "react-bootstrap";
import {Empty} from "antd";


export default function MarketPlaceSoldProducts() {

    const { loading, error, data } = useQuery(GET_SOLD_PRODUCTS);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        console.log(data)
        if (data && Array.isArray(data.getSoldOrdersByUser)) {
            setOrders(data.getSoldOrdersByUser)
        }
    }, [data]);

    if (loading) return (
        <div className={'d-flex justify-content-center mt-5'}>
            <Spinner />
        </div>
    )




    return (
        <div className={'container mt-5'}>
            <h1>My Sold</h1>
            {orders.length === 0 && (
                <Empty />
            )}
            {orders.length > 0 && (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Trade Place</TableCell>
                                <TableCell align="right">Contact</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((item) => (
                                <TableRow
                                    key={item.goods.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.goods.title}
                                    </TableCell>
                                    <TableCell align="right">{item.goods.description}</TableCell>
                                    <TableCell align="right">${item.goods.price}</TableCell>
                                    <TableCell align="right">{item.goods.category}</TableCell>
                                    <TableCell align="right">{item.tradePlace}</TableCell>
                                    <TableCell align="right">{item.goods.contact}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    )
}