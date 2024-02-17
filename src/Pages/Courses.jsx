import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { db } from '../firebase';
import {
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import Opportunity from '../Components/Opportunity'

function Courses() {

  const [coursesData, setCoursesData] = useState([]); // Rename to coursesData


  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "Courses")
      );
      const querySnapshot = await getDocs(q);

      const courses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCoursesData(courses);

      console.log('----------->', coursesData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <section id="courses-hero" className="bg-red-500 py-20">
        <Container>
          <Row >
            <Col sm={12} md={12} style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
              <h1 className="text-4xl font-semibold mb-4">
                Explore Our Course Offerings
              </h1>
              <p className="text-lg">
                Choose from a variety of courses designed to empower you in your
                journey of skill development and education.
              </p>
              <h2 className="text-3xl font-semibold mb-4">Course Details</h2>
            </Col>
          </Row>
        </Container>
      </section>
      {/* {coursesData.map((course) => (
        <section key={course.id} id="course-details" className="py-16">
          <Container>
            <Row className="p-2">
              <Col sm={12} md={8}>
                <Row>
                  <Col md={6} className="py-2">
                    <h4 className="text-lg font-semibold">{course.field1}</h4>
                    <p>
                      {course.field2}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={4}>
                <img
                  src={course?.field3?.image}
                  alt={course.field1}
                  className="mx-auto rounded-lg shadow-md w-100"
                />
              </Col>
            </Row>
          </Container>
        </section>
      ))} */}
      <Opportunity/>
    </div>
  );
}

export default Courses;
