import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import {CategoryList} from "../data/category.list.js";
import {useMutation, useQuery} from "@apollo/client";
import {
    PUBLISH_HANDLE_SECOND_GOODS,
    PUBLISH_SECOND_HANDLE_GOODS,
    UPDATE_SECOND_HANDLE_GOODS
} from "../graphql/mutations.js";
import {Spinner} from "react-bootstrap";
import {message} from "antd";
import {useParams} from "react-router-dom";
import {GET_GOODS_BY_ID} from "../graphql/queries.js";

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be greater than zero'),
    category: Yup.string().required('Category is required'),
    tradePlace: Yup.string().required('Trade place is required'),
    contact: Yup.string().required('Contact information is required'),
});

const MarketPlaceUpdatePage = () => {

    const [update, { data: updateResult, loading: updateLoading, error: updateError }] = useMutation(UPDATE_SECOND_HANDLE_GOODS);

    const {goodsId} = useParams();
    const {loading, error, data} = useQuery(GET_GOODS_BY_ID, {
        variables: {id: goodsId}
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            image: '',
            category: '',
            tradePlace: '',
            contact: '',
            status: 'selling',
        },
        validationSchema,
        onSubmit: (values) => {
            update({
                variables: {
                    ...values,
                    goodsId,
                    id: goodsId
                }
            }).then(() => {
                message.success('Update success');
            })
        },
    });

    useEffect(() => {
        if (data && data.getGoodsById) {
            formik.setValues(data.getGoodsById);
        }
    }, [data]);

    const handleBlur = (e) => {
        formik.handleBlur(e);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handlePickerImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const base64 = await convertBase64(file);
        formik.setFieldValue('image', base64);
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Post Second-Hand Goods
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    {/** Add onBlur={handleBlur} to each TextField **/}
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && <span style={{ color: 'red' }}>{formik.errors.price}</span>}
                        margin="normal"
                    />
                    <Box margin={'10px'}>
                        {formik.values.image && (
                            <img width={200} src={formik.values.image}/>
                        )}
                    </Box>
                    <Button component={'label'} variant="contained" startIcon={<InsertPhotoIcon />}>
                        <input onChange={handlePickerImage} accept={'image/*'} type={'file'} hidden/>
                        Upload Image
                    </Button>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category"
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={handleBlur}
                            error={formik.touched.category && Boolean(formik.errors.category)}
                        >
                            {CategoryList.map(category => {
                                return (
                                    <MenuItem key={category.name} value={category.name}>
                                        <img src={category.image} width={50}/>
                                        {category.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        {formik.touched.category && formik.errors.category && (
                            <Typography variant="caption" color="error">
                                {formik.errors.category}
                            </Typography>
                        )}
                    </FormControl>
                    <TextField
                        fullWidth
                        id="tradePlace"
                        name="tradePlace"
                        label="Trade Place"
                        value={formik.values.tradePlace}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        error={formik.touched.tradePlace && Boolean(formik.errors.tradePlace)}
                        helperText={formik.touched.tradePlace && formik.errors.tradePlace}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        id="contact"
                        name="contact"
                        label="Contact Information"
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        onBlur={handleBlur}
                        error={formik.touched.contact && Boolean(formik.errors.contact)}
                        helperText={formik.touched.contact && formik.errors.contact}
                        margin="normal"
                    />
                    {!updateLoading && (
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            Submit
                        </Button>
                    )}
                    {updateLoading && (
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            disabled
                        >
                            <Spinner />
                        </Button>
                    )}
                </form>
            </Box>
        </Container>
    );
};

export default MarketPlaceUpdatePage;
