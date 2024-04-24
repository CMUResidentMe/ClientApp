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
import {useNavigate, useParams} from "react-router-dom";
import {GET_GOODS_BY_ID} from "../graphql/queries.js";

// Define a validation schema using Yup for form validation, specifying requirements for various fields.
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be greater than zero'),
    category: Yup.string().required('Category is required'),
    contact: Yup.string().required('Contact information is required'),
});

// MarketPlaceUpdatePage is a React functional component designed for updating existing product listings.
const MarketPlaceUpdatePage = () => {
    // useNavigate hook from React Router for programmatically navigating between views.
    const navigate = useNavigate();

    // useMutation hook from Apollo Client for the update operation.
    const [update, { data: updateResult, loading: updateLoading, error: updateError }] = useMutation(UPDATE_SECOND_HANDLE_GOODS);

    // Retrieving the product ID from URL parameters.
    const {goodsId} = useParams();

    // useQuery hook to fetch product details by ID to populate the form for updating.
    const {loading, error, data} = useQuery(GET_GOODS_BY_ID, {
        variables: {id: goodsId}
    });

    // useFormik hook to manage form state and handle form submission.
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
                message.success('Update success'); // Display a success message upon successful update.
                navigate(-1); // Navigate back to the previous page.
            })
        },
    });

    // useEffect to pre-fill the form with existing product data when available.
    useEffect(() => {
        if (data && data.getGoodsById) {
            formik.setValues(data.getGoodsById);
        }
    }, [data]);

    // Function to handle field blurs to manage form validation.
    const handleBlur = (e) => {
        formik.handleBlur(e);
    };

    // Function to convert a file to a base64 encoded string.
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result); // Resolve with the base64 string of the file.
            };
            fileReader.onerror = (error) => {
                reject(error); // Reject the promise if there is an error during file reading.
            };
        });
    };

    // Function to handle file selection and convert the selected file to base64.
    const handlePickerImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return; // Do nothing if no file is selected.
        }
        const base64 = await convertBase64(file); // Convert the file to base64.
        formik.setFieldValue('image', base64); // Update the form's image field with the base64 string.
    };

    return (
        <div className={'container mt-5'} style={{ marginLeft: '80px', marginTop: '180px' }}>
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h6" component="h6" gutterBottom>
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
                    <Button component={'label'} variant="contained" startIcon={<InsertPhotoIcon />} style={{ backgroundColor: '#A67B5B', color: '#ffffff', '&:hover': {backgroundColor: '#94684f'}}}>
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
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={!formik.isValid}
                            style={{ backgroundColor: '#A67B5B', color: '#ffffff', '&:hover': {backgroundColor: '#94684f'}}}
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
        </div>
    );
};

export default MarketPlaceUpdatePage;
