import React from "react";
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { LISTED_PRODUCTS } from '../../utils/queries.js';
import OneListedProduct from "./OneListedProduct.js";
import PurchaseRequest from "./PurchaseRequest.js";
import { Container } from 'react-bootstrap';

const ListedProduct =  () => {
    // queries are run here
    // 1. get an id to run a query to get an item ?
    const { id } = useParams(); // this comes from another component
    console.log(id);
    const { loading, data } = useQuery(LISTED_PRODUCTS, { variables: {  id }, });
    const item = data?.getListedProductById||{};
       
  return (
          <Container>
          {loading ? (
            <div>Loading data..</div>
          ) : (
            <OneListedProduct
              item = { item }
              title ="One listed product"
            />      
           )}
            <PurchaseRequest
              product = { id }
              title ="One listed product"
            />
          </Container>
         
        );
      }

export default  ListedProduct;
    
