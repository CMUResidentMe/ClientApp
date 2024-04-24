import {useQuery} from "@apollo/client";
import {GET_ALL_GOODS} from "../graphql/queries.js";
import React, {useEffect, useState} from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardContent, Badge, Button, IconButton,
} from '@mui/material';
import {CategoryList} from "../data/category.list.js";
import {Empty} from "antd";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {useNavigate} from "react-router-dom";
import { Subject, Subscription } from 'rxjs';
const dataSource = new Subject();
// MarketPlaceHomePage is a React functional component for the marketplace's homepage.
const MarketPlaceHomePage = () => {

    // Use the useQuery hook from Apollo to fetch all goods, managing loading states and errors automatically.
    const { loading, error, data = [] } = useQuery(GET_ALL_GOODS);

    // useState hooks to manage the state of search keyword, selected category, and products list.
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);

    // Filter the products list based on the keyword and category selected by the user.
    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(keyword.toLowerCase()) &&
            (category === '' || product.category === category)
    );

    // Hook to navigate programmatically between routes.
    const navigate = useNavigate();

    // useEffect to update the products state when new data is fetched from the server.
    useEffect(() => {
        if (Array.isArray(data.getAllGoods)) {
            console.log(data)  // Logs the fetched data for debugging.
            setProducts(data.getAllGoods)  // Sets the fetched goods into the products state.
        }
    }, [data]);

    // Observer Design Pattern implementation using useState and useEffect to manage data subscriptions.
    const [datas, setDatas] = useState('');
    const [subscription, setSubscription] = useState(null);
    useEffect(() => {
        // Subscribe to a data source and update state with new data when received.
        const sub = dataSource.subscribe(newData => setDatas(newData));
        setSubscription(sub);

        // Cleanup function to unsubscribe when the component unmounts.
        return () => sub.unsubscribe();
    }, []);

    return (
        <div className="container mt-5" style={{ marginTop: '85px' }}>
            <Button
                variant="contained"
                onClick={() => navigate('/marketplace/publish')}
                style={{
                    backgroundColor: '#A67B5B',
                    color: '#ffffff',
                    '&:hover': {
                        backgroundColor: '#94684f',
                    },
                    marginTop: '85px'
                }}>
                Publish Goods
            </Button>
            <div className="row mt-5">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                Filter Goods
                            </h5>
                            <div className="form-group">
                                <p>Keyword</p>
                                <input
                                    placeholder={'Enter keyword'}
                                    type="text"
                                    className="form-control"
                                    id="keyword"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <p>Category</p>
                                <Select
                                    fullWidth
                                    labelId="category"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {CategoryList.map(category => {
                                        return (
                                            <MenuItem key={category.name} value={category.name}>
                                                <img src={category.image} width={40} alt={category.name}/>
                                                {category.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        {filteredProducts.length === 0 && (
                            <Empty />
                        )}
    
                        {filteredProducts.map((product) => (
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
                                        <p className={'text-end'}>
                                            <IconButton
                                                onClick={() => navigate('/marketplace/goods/' + product.id)}
                                                color={'primary'}>
                                                <ArrowCircleRightIcon />
                                            </IconButton>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
    
}
export default MarketPlaceHomePage;