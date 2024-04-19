import React, { useState } from "react";
import { Container, Button, Card, Form }from 'react-bootstrap';
import Auth from '../../utils/auth.js';
import { useMutation } from "@apollo/client";


//item id needs to be passed as  a prop currently hard coded for testing
// user-id from backend - context
// item id passed as a prop
//graphgl call to create new request

//const listItemId = "6390bb527ad86c7a267b10bd"

const PurchaseRequest = (props) => {
    const listingProduct = props.product; //"639475d16b0dbc4a7fb4face" 
    const [form, setForm] = useState({});
    
    //console.log(props.product);

    // const [ requestAProduct, { error } ] = useMutation(REQUEST_AN_ITEM)   
    const [ requestAProduct, { error } ] = useMutation()
    

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
         
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form);

        const token = Auth.loggedIn() ? Auth.getToken() : null;
            
        if(Object.keys(form).length !== 0 && token)
        {
            console.log("Items in the form")        
            console.log("user logged in")        
            console.log(form);
            //find category id

            const place = form.place;
            
            console.log(place)
            console.log(listingProduct);

            try {
                const { data } = await requestAProduct({
                  variables: {
                    listingProduct,
                    place,
                                      
                  },
                });
                
          
               } catch (err) {
                console.error(err);

               }
               //reset form fields
               setForm({place: ''});

        }
        //console.log(token);
        if (!token) {
        return false;}
    }
    
    return (
      
        <div>
            
            <Card className="text-center bg-secondary text-white my-5 py-4">           
            <h6>Do you want to purchase this item</h6>            
            </Card>       
     
                <Container className="fluid"> 
                
                <Form>                     
                    
                    <Form.Group controlId>
                        <Form.Label>Select the places where you would like to trade this product</Form.Label>
                        <Form.Select 
                            value={form.place}                    
                            placeholder="Listing place"
                            onChange={e=> {setField('place', e.target.value)}}>
                            <option >Select place</option>
                                <option value="Apartment Lobby">Apartment Lobby</option>
                                <option value="Apartment Meeting Room 1">Apartment Meeting Room 1</option>
                                <option value="Apartment Meeting Room 2">Apartment Meeting Room 2</option>
                                <option value="Apartment Cinema">Apartment Cinema</option>
                                <option value="Apartment Garden">Apartment Garden</option>
                                <option value="Rooftop Patio">Rooftop Patio</option>
                                <option value="Pool Area">Pool Area</option>
                                <option value="Mail Room">Mail Room</option>
                                <option value="Guest Suite">Guest Suite</option>
                                <option value="Parking Garage">Parking Garage</option>
                        </Form.Select>
                    </Form.Group>                

                    <Form.Group>
                        <Button variant="primary" className="mt-3" onClick={handleSubmit} type="submit">
                        Request to Purchase
                        </Button>
                    </Form.Group>
                </Form>                
                </Container>
        </div>
    );
  };
  
  export default PurchaseRequest;