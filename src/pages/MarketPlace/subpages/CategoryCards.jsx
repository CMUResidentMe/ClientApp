import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

import React from "react";
import './CategoryCards.css';

const CategoryCards = (props) => {
  let categories = props.categories;
  if (!categories.length) {
    return <h3>No Categories Yet</h3>;
  }
    return (
      <Container fluid>
      <Row className="justify-content-md-center">
        {categories && 
          categories.map((category) => (
        <Col>
       
        <Card id="categoryCard" style={{ width: '13rem'}} key={category._id}>
        
          <Card.Img id="categoryImg" variant="top" src={category.image} />
          <Card.Body>
            <Link to={`/categories/${category._id}`}>
            <Button className="button" variant="outline-success"  >{category.name}</Button>
            </Link>
          </Card.Body>
      </Card>
     
      </Col>
      ))}
      </Row>
      </Container>
    );
  };
  
export default CategoryCards;