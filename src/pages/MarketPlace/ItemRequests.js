import React from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_ITEM_REQUESTS } from '../../utils/queries.js';
import ItemRequestList from "./ItemRequestList.js"; 

const ItemRequests =  () => {
    
    const { id } = useParams(); 
    //const listingProduct = '6395e53f0adbc689bdc7f4a3';
    console.log(id);
    const listingProduct = id;
    const { loading, data } = useQuery(GET_ITEM_REQUESTS, { variables: {  listingProduct }, });
    console.log(data);
    const requestData = data?.getRequestsForProductIListed||{};
    if (!requestData.length) {
      return <h3>There are no requests for this item yet</h3>;
    }
       
  return (
          <Container>
          <Row>
          <Col md={{ span: 8, offset: 2 }}>
          { loading ? (
            <div>Loading data..</div>
          ) : (                
           
            <ItemRequestList
              requests = { requestData }
              title ="Item requests"
            /> )} 
            </Col>          
           </Row> 
          </Container>
          
        );
      }
export default  ItemRequests;
    