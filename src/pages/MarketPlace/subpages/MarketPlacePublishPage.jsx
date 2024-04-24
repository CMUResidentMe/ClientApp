import React from 'react';
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
import {useMutation} from "@apollo/client";
import {PUBLISH_SECOND_HANDLE_GOODS} from "../graphql/mutations.js";
import {Spinner} from "react-bootstrap";
import {message} from "antd";
import {useNavigate} from "react-router-dom";
// Define a validation schema using Yup for form validation to ensure that all fields meet the required conditions.
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be greater than zero'),
    category: Yup.string().required('Category is required'),
    contact: Yup.string().required('Contact information is required'),
});

// MarketPlacePublishPage is a React functional component for handling the publishing of goods on a marketplace.
const MarketPlacePublishPage = () => {
    // useMutation hook for executing the PUBLISH_SECOND_HANDLE_GOODS mutation.
    const [publish, { data, loading, error }] = useMutation(PUBLISH_SECOND_HANDLE_GOODS);

    // useNavigate hook for programmatically navigating between routes.
    const navigate = useNavigate();

    // useFormik hook to manage form state and handle form submission.
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            image: '',
            category: '',
            tradePlace: ' ',
            contact: '',
            status: 'selling',
        },
        validationSchema,
        onSubmit: (values) => {
            publish({
                variables: values
            }).then(r => {
                message.success('Publish success');  // Show success message on successful publish.
                formik.resetForm();  // Reset the form after successful submission.
                navigate('/marketplace/playground')  // Redirect to the playground page.
            });
        },
    });

    // Handle field blur events to trigger validation and manage field touch state.
    const handleBlur = (e) => {
        formik.handleBlur(e);
        const { name } = e.target;
        if (formik.touched[name] && formik.errors[name]) {
            // Potential error handling or UI feedback could be implemented here.
        }
    };

    // Function to convert a file to a base64 encoded string.
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);  // Resolve the promise with the base64 string on successful read.
            };
            fileReader.onerror = (error) => {
                reject(error);  // Reject the promise if an error occurs during file read.
            };
        });
    };

    // Handle image selection, converting the selected file to base64 and updating the form field.
    const handlePickerImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;  // If no file is selected, do nothing.
        }
        const base64 = await convertBase64(file);  // Convert the file to base64.
        formik.setFieldValue('image', base64);  // Update the form's image field with the base64 string.
    };


    return (
        <div className={'container mt-5'} style={{ marginLeft: '80px', marginTop: '180px' }} >
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
                    <Button component={'label'} variant="contained" startIcon={<InsertPhotoIcon />} style={{ backgroundColor: '#A67B5B', color: '#ffffff', '&:hover': {backgroundColor: '#94684f'}}} >
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
                    {!loading && (
                        <Button
                            style={{ backgroundColor: '#A67B5B', color: '#ffffff', '&:hover': {backgroundColor: '#94684f'}}}
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={!formik.isValid}
                        >
                            Submit
                        </Button>
                    )}
                    {loading && (
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

export default MarketPlacePublishPage;
