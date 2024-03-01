import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import { Rating } from '@mui/material';

const CustomerRevewCard = ({ name, rating, comment }) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '100%',
        boxShadow: 'lg',
        height:'50%',
        boxShadow:'10px 10px 47px 17px rgba(0,0,0,0.53)'
      }}
    >
      <CardContent sx={{ alignItems: 'center', textAlign: 'center' , height:"30vh", boxShadow:'inset 10px 10px 47px 17px rgba(0,0,0,0.53)'}}>
        <Avatar src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
        <Typography level="title-lg">{name}</Typography>
        <Rating name="half-rating" defaultValue={rating} precision={0.5} />
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          {comment}
        </Typography>
      </CardContent>
      </Card>  
  );
};

export default CustomerRevewCard;