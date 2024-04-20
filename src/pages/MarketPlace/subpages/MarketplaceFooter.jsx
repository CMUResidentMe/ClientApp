import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <footer className="w-100 mt-auto text-dark p-4">
      <nav style={{ backgroundColor: '#CD853F', padding: '10px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            as={Link}
            to="/addListItem"
            style={{
              backgroundColor: '#CD853F',
              color: 'white',
              width: '150px',
              textAlign: 'center',
              lineHeight: '40px',
              textDecoration: 'none',
              border: 'none',
              display: 'inline-block',
              fontFamily: 'Verdana, sans-serif',
              transition: 'background-color 0.3s, transform 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B38B5E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#CD853F'}
            onMouseDown={e => e.currentTarget.style.backgroundColor = '#996633'}
            onMouseUp={e => e.currentTarget.style.backgroundColor = '#B38B5E'}
          >
            List an Item
          </Button>
          <Button
            as={Link}
            to="/UserMPDashboard"
            style={{
              backgroundColor: '#CD853F',
              color: 'white',
              width: '150px',
              textAlign: 'center',
              lineHeight: '40px',
              textDecoration: 'none',
              border: 'none',
              display: 'inline-block',
              fontFamily: 'Verdana, sans-serif',
              transition: 'background-color 0.3s, transform 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B38B5E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#CD853F'}
            onMouseDown={e => e.currentTarget.style.backgroundColor = '#996633'}
            onMouseUp={e => e.currentTarget.style.backgroundColor = '#B38B5E'}
          >
            Dashboard
          </Button>
          <Button
            as={Link}
            to="/marketplace"
            style={{
              backgroundColor: '#CD853F',
              color: 'white',
              width: '150px',
              textAlign: 'center',
              lineHeight: '40px',
              textDecoration: 'none',
              border: 'none',
              display: 'inline-block',
              fontFamily: 'Verdana, sans-serif',
              transition: 'background-color 0.3s, transform 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#B38B5E'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#CD853F'}
            onMouseDown={e => e.currentTarget.style.backgroundColor = '#996633'}
            onMouseUp={e => e.currentTarget.style.backgroundColor = '#B38B5E'}
          >
            MarketPlace
          </Button>
        </div>
      </nav>
        <div className="container text-center mb-5">
          <h7>&copy; {new Date().getFullYear()} - ResidentMe</h7>
        </div>
      </footer>
    );
  };
  
  export default Footer;