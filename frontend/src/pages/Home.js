import React from 'react';
import { Box, Container, Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import StoreIcon from '@mui/icons-material/Store';
import BuildIcon from '@mui/icons-material/Build';
import EventIcon from '@mui/icons-material/Event';
import './Home.css';

function FeatureCard({ title, description, icon: Icon }) {
  return (
    <Card>
      <CardActionArea>
        <CardContent sx={{ textAlign: 'center' }}>
          <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Welcome to ResidentMe
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" paragraph>
        Your community engagement platform.
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1 },
        }}>
        {/* Feature Cards */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={ForumIcon}
              title="Communication Board"
              description="Effortlessly share and access information relevant to your apartment."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={StoreIcon}
              title="Marketplace"
              description="A convenient place to sell and buy second hand goods right in your community."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={BuildIcon}
              title="Work Orders"
              description="Submit and track maintenance issues with ease, no calls necessary."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard
              icon={EventIcon}
              title="Event Booking"
              description="Browse and book events or rooms for your next meeting or gathering."
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
