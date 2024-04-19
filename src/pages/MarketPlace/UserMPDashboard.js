import RequestedItems from "./RequestedItems.js";
import ListedItems from "./ListedItems.js";
import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import MarketplaceFooter from "./MarketplaceFooter.js";

const UserMPDashboard = () => {

  const [profileView, setProfileView] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    setProfileView(event.target.value);
  }
   const testing = (profileView) =>{
      if(profileView === "requested") {
        return   <RequestedItems profileView={profileView}/>
      } 

      if (profileView === "listed"){
        return <ListedItems profileView={profileView}/>
      } 

        console.log("no matching condition");
      }   
  return (
    <div className="container">
    <Row>
        <Card className="text-center bg-secondary text-white my-5 py-4">
          <Card.Title>Welcome to your Dashboard</Card.Title> 
        </Card>
      </Row> 

      <Row className="px-4 my-2">
        <Col sm={3}>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleClick} value="requested" size="lg"style={{backgroundColor:'#253F41'}}>
              Requested items
            </Button>
            <Button variant="secondary" onClick={handleClick} value="listed" size="lg" style={{backgroundColor:'#253F41'}}>
              Listed items
            </Button>            
          </div>
        </Col>
        <Col sm={8}>

        {profileView && testing(profileView)}
        </Col>
      </Row>
       {testing}
        <MarketplaceFooter/>
    </div>
  );
};

export default UserMPDashboard;