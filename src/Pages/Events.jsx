import React, { useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { db } from '../firebase';
import {
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import AppCarousel from "../Components/Carousel";

function Events() {

  const [eventData, setEventData] = useState([]); 


  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "Event")
      );
      const querySnapshot = await getDocs(q);

      const event = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setEventData(event);

      console.log(setEventData(event));
    };

    fetchData();
  }, []);
  const carouselData = [
    {
      id: '1',
      title: 'First Carousel',
      des: 'carousel 1 description',
      src: './carousel/slide-1.jpeg'
    },
    {
      id: '2',
      title: 'Second Carousel',
      des: 'carousel 2 description',
      src: './carousel/slide-2.jpg'
    },
    {
      id: '3',
      title: 'Third Carousel',
      des: 'carousel 3 description',
      src: './carousel/slide-3.jpg'
    },
    {
      id: '4',
      title: 'Fourth Carousel',
      des: 'carousel 4 description',
      src: './carousel/slide-4.jpg'
    }
  ]
  return (
    <div>
      {/* <section id="">
            <Container>
                <Row className="p-2">
                    <Col sm={12} md={12}>
                        <AppCarousel props={carouselData} />
                    </Col>
                </Row>
            </Container>
        </section> */}
      {/* {eventData.map((event) => ( */}

      <section   id="course-details" className="py-16">
        <Container>
          <Row className="p-2">
            <Col sm={12} md={8}>
              <Row>
                <h2 className="text-3xl font-semibold mb-4">Event Details</h2>
                <Col md={6} className="py-2">
                  <h4 className="text-lg font-semibold">Event 1</h4>
                  <p>
                  Event Description
                  </p>
                </Col>
                {/* Other course details */}
              </Row>
            </Col>
            <Col sm={12} md={4}>
              {/* Course image */}
              <img
                src="logoIcon.png"
                alt="Course Example"
                className="mx-auto rounded-lg shadow-md w-100"
              />
            </Col>
            <Col sm={12} md={4}>
              {/* Course image */}
              <img
                src="logoIcon.png"
                alt="Course Example"
                className="mx-auto rounded-lg shadow-md w-100"
              />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ))} */}
    </div>
  );
}

export default Events;
