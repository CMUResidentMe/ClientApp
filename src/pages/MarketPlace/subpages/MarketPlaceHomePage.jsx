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

const MarketPlaceHomePage = () => {

    const { loading, error, data = [] } = useQuery(GET_ALL_GOODS);

    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [products, setProducts] = useState([]);

    const filteredProducts = products.filter(
        (product) =>
            product.title.toLowerCase().includes(keyword.toLowerCase()) &&
            (category === '' || product.category === category)
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (Array.isArray(data.getAllGoods)) {
            console.log(data)
            setProducts(data.getAllGoods)
        }
    }, [data]);

    return (
        <div className="container mt-5">
            <Button
                variant={'contained'}
                onClick={() => navigate('/marketplace/publish')}>
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
                                                <img src={category.image} width={40}/>
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