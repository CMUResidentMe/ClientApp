import React, { useState } from "react";
import { Container, Row, Form, Button } from 'react-bootstrap';
import Auth from '../../utils/auth.js';
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_All_CATEGORIES } from  '../../utils/queries.js';
import { LIST_AN_ITEM } from  '../../utils/mutations.js';
import MarketplaceFooter from './MarketplaceFooter.js'; 

const ListItemForm = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});    

    const { data } = useQuery(QUERY_All_CATEGORIES);
    const categories = data?.getAllListingCategories || [];
    
    console.log(categories);


    const [ listAProduct ] = useMutation(LIST_AN_ITEM)
   
    

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null

        })   
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form);

        const token = Auth.loggedIn() ? Auth.getToken() : null;
            
        if(Object.keys(form).length !== 0 && token)
        {

            const name = form.name;
            const category = form._id;
            const image = form.image;
            const description = form.description
            console.log(name, category, image, description);
            
            try {
          
               } catch (err) {
                console.error(err);

               }
               setForm({name: '', description: '', image:'', category: '', duration: ''});

        }
        if (!token) {
        return false;}
    }
        
    
    
    return (       
       
        <div>
        <h1>List an Item</h1>
            <Container className="fluid"> 
            <Form>
                
                <Form.Group>
                <Form.Label>Enter a title for your listing:</Form.Label>
                <Form.Control name="title" type="text" 
                            placeholder="Enter title "
                            value= {form.name}
                            onChange={e=>setField('name', e.target.value)}
                            
                             />
                </Form.Group>
                
                <Form.Group>
                <Form.Label>Enter a description:</Form.Label>
                <Form.Control name="description" as="textarea" 
                            placeholder="Add description "
                            value={form.description}
                            onChange={e=>setField('description', e.target.value)} />   
                            
                </Form.Group>

                <Form.Group >
                <Form.Label>Enter image link:</Form.Label>
                <Form.Control name="image" type="text" 
                            placeholder="Enter your image link "
                            value={form.image}                          
                            onChange={e=>setField('image', e.target.value)}  />
                </Form.Group>

                
                <Form.Group controlId>
                    <Form.Label>Select a category for your listing</Form.Label>
                    <Form.Select 
                        value={form.category}                    
                         placeholder="Select category"
                         onChange={e => {setField('_id', e.target.value)}}>
                        <option>Select Category</option>
                        {categories.map((option, index) => (
                        <option key={index} value={option._id}>{option.name}</option>))}                    
                        
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId>
                    <Form.Label>Select the places where you would like to trade this product:</Form.Label>
                    <Form.Select 
                        value={form.place}                    
                         placeholder="Listing place"
                         onChange={e=> {setField('place', e.target.value)}}>
                           <option>Select place</option>
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
                <Button variant="outline-success" className="mt-3"  onClick={handleSubmit} type="submit">
                Click to list your Item
                </Button>
                </Form.Group>
            </Form>
        <Row>
        </Row> 
        <MarketplaceFooter />   
    </Container>
</div>
)};
      
  
  
export default ListItemForm;
