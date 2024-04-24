import {useQuery} from "@apollo/client";
import {GET_ORDERS_BY_USER} from "../graphql/queries.js";
import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {Spinner} from "react-bootstrap";
import {Empty} from "antd";


// Exporting a functional component named MarketPlaceMyOrders
export default function MarketPlaceMyOrders() {

    // Using Apollo's useQuery hook to fetch user's orders using the GET_ORDERS_BY_USER query.
    const { loading, error, data } = useQuery(GET_ORDERS_BY_USER);

    // useState to store the orders fetched from the server.
    const [orders, setOrders] = useState([]);

    // useEffect to handle the lifecycle of the component related to fetching data.
    useEffect(() => {
        console.log(data)  // Logging the fetched data for debugging purposes.
        // Check if data is available and is an array before setting it to state to avoid errors.
        if (data && Array.isArray(data.getOrdersByUser)) {
            setOrders(data.getOrdersByUser)  // Updating the orders state with the fetched data.
        }
    }, [data]);  // Dependency array includes data to trigger effect on data change.

    // Conditional rendering to show a spinner while the data is loading.
    if (loading) return (
        <div className={'d-flex justify-content-center mt-5'}>
            <Spinner />
        </div>
    )

    return (
        <div className={'container mt-5'} style={{ marginLeft: '80px', marginTop: '180px' }}>
            <h2 style={{ fontFamily: 'Roboto, sans-serif', color: '#A67B5B', fontWeight: '500', fontSize: '28px', textAlign: 'left', marginBottom: '20px', marginTop: '140px' }}>
                My Interest Order
            </h2>
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
                                <TableCell align="right">Trade Location</TableCell>
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