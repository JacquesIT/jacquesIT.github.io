import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import BiddingItem from '../components/home_components/bidding_item';
import NavigationBar from '../components/home_components/navigationbar';


const ItemDisplayer = () => {
  const [bikes, setBikes] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate('/selected?id=' + id);
  };

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch('http://localhost:3001/bike');
        const data = await response.json();

        if (response.ok) {
          setBikes(data);
        } else {
          alert('Failed to fetch bikes');
        }
      } catch (error) {
        alert('Error fetching bikes', error);
      }
    };

    fetchBikes();
  }, []);

  return (
    <Grid container spacing={2} style={{ padding: '16px' }}>
      {bikes.map((bike, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <button onClick={() => handleClick(bike.id)}>
            <BiddingItem original_price={bike.original_price} bikeId={bike.id} />
          </button>
        </Grid>
      ))}
    </Grid>
  );
};


const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <ItemDisplayer />
    </div>
  );
};


export default HomePage;