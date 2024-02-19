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
         <h2 className="text-3xl font-semibold mb-4" style={{display:"flex", justifyContent:"center"}}>Event Details</h2>
          <Row className="p-2">
            <Col sm={12} md={8} style={{display:"flex"}}>
              <Row>
                <Col md={12} className="py-2 " style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                  <h4 className="text-lg font-semibold">Sports Day</h4>
                  <p>
                    Sports days are commonly organized events where students participate in various athletic competitions and activities. These events promote physical fitness, teamwork, and sportsmanship among students. They often include traditional track and field events, as well as fun relay races, tug-of-war contests, and other games.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={4}>
              {/* Course image */}
              <img
                src="event-1.avif"
                alt="Course Example"
                className="mx-auto rounded-lg shadow-md w-100 rounded"
              />
            </Col>
            <Col sm={12} md={4}>
              {/* Course image */}
              <img
                src="event-3.png"
                alt="Course Example"
                className="mx-auto rounded-lg shadow-md w-100 rounded"
              />
            </Col>
            <Col sm={12} md={8} style={{display:"flex"}}>
              <Row>
                <Col md={12} className="py-2" style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                  <h4 className="text-lg font-semibold">Cultural Festivals</h4>
                  <p>
                  Cultural festivals celebrate the diversity of students' backgrounds and promote cultural exchange within the school community. These events showcase performances, exhibits, and activities related to different cultures, including music, dance, art, food, and traditional attire.
                  </p>
                </Col>
                {/* Other course details */}
              </Row>
            </Col>
            <Col sm={12} md={8} style={{display:"flex"}}>
              <Row>
                <Col md={12} className="py-2 " style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                  <h4 className="text-lg font-semibold">Arts Showcases</h4>
                  <p>
                  Arts showcases highlight students' artistic talents and creative expressions through exhibitions, performances, and presentations in various art forms, including visual arts, music, theater, and literature. These events encourage artistic exploration and appreciation within the school community.                  </p>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={4}>
              {/* Course image */}
              <img
                src="event-5.jpg"
                alt="Course Example"
                className="mx-auto rounded-lg shadow-md w-100 rounded"
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
