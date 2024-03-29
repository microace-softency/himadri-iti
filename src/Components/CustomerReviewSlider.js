import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import CustomerRevewCard from './CustomerRevewCard';

const CustomerReviewSlider = () => {
  const customerReviewData = [
    {
      id: '1',
      name: 'Alice Johnson',
      rating: 4.2,
      comment: 'I had a great experience with the hotel. The staff was friendly and the facilities were top-notch comfortable.',
    },
    {
      id: '2',
      name: 'Bob Smith',
      rating: 3.8,
      comment: 'Good value for money. The rooms were clean and comfortable. I would recommend this hotel.',
    },
    {
      id: '3',
      name: 'Eva Martinez',
      rating: 4.5,
      comment: 'Beautiful ambiance and excellent service. I enjoyed every moment of my stay. I would recommend this hotel',
    },
    {
      id: '4',
      name: 'Michael Davis',
      rating: 4.0,
      comment: 'The hotel exceeded my expectations. The amenities were fantastic, and the staff was attentive.',
    },
    {
      id: '5',
      name: 'Sophia Miller',
      rating: 3.2,
      comment: 'A decent stay overall. The location is convenient, and the rooms are adequately furnished.',
    },
    {
      id: '6',
      name: 'Sophia Miller',
      rating: 3.2,
      comment: 'A decent stay overall. The location is convenient, and the rooms are adequately furnished.',
    },
    {
      id: '5',
      name: 'Sophia Miller',
      rating: 3.2,
      comment: 'A decent stay overall. The location is convenient, and the rooms are adequately furnished.',
    },
    {
      id: '6',
      name: 'Sophia Miller',
      rating: 3.2,
      comment: 'A decent stay overall. The location is convenient, and the rooms are adequately furnished.',
    }
  ];

 
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {customerReviewData.map((review, idx) => (
        <Carousel.Item key={idx}>
          <CustomerRevewCard
            name={review.name}
            rating={review.rating}
            comment={review.comment}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomerReviewSlider;
