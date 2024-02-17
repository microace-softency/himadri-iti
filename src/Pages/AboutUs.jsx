import React from 'react';
import { Container, Row, Col } from "react-bootstrap";


function AboutUs () {
return(
    <div>
            <section id="">
                <Container>
                    <Row className="p-2">
                        <Col sm={12} md={12}>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id="about">
                <Container>
                    <Row className="p-2">
                        <Col sm={12} md={8}>
                            <Row>
                                <h2>About us</h2>
                                <Col md={10} className="py-2">
                                    <h4>Who we are</h4>
                                    <p>HIMADRI TECHNICALM TRAINING INSTITUTEhas been set up to promote the technological
                                        and professional institution of high standards and to encourage skill development
                                        training activities so that the students, conferred to the degree can not only the
                                        professional challenges but also all the challenges life has to offer confidently.
                                        In this era of economic liberalizations, globalizations and technological super
                                        advancement our effort is to put quality education in the light of tomorrow’s vision
                                        of spreading education throughout the society.
                                    </p>
                                </Col>
                                <Col md={6} className="py-5">
                                    <h4>WHY HIMADRI?</h4>
                                    <ul>
                                        <li>Five days in a week training shift wise.</li>
                                        <li>Laboratory & Class-room Based training.</li>
                                        <li>Computer classes & Library session.</li>
                                        <li>Audio Visual Classes. WIFI Campus.</li>
                                        <li>Clinical Practice at Govt. Hospital.</li>
                                        <li>Hostel & Canteen Facilities.</li>
                                        <li>Assured Placement.</li>
                                    </ul>
                                </Col>
                                <Col md={12} className="py-2">
                                    <h4>Our Goal</h4>
                                    <ol>
                                        <li>
                                            <span className="fw-bold"> Reach: </span>
                                            Recruit and retain a diverse group of students from pre-school to university & post graduate level.
                                        </li>
                                        <li>
                                            <span className="fw-bold"> Values: </span>
                                            Continuously evaluate and increase the quality and relevance of academic content and performance standards in the core subjects for pre-school, grades 1 through 12 and university education. Enhance the quality of student life by providing professional development opportunities and promoting a sense of community among students.
                                        </li>
                                        <li>
                                            <span className="fw-bold"> Achievement: </span>
                                            Ensure that all students are performing at a standard level or higher. Ensure that the assignments are done correctly in the first instance. Ensure that all students are empower as per market demands.
                                        </li>
                                        <li>
                                            <span className="fw-bold"> Evaluation: </span>
                                            Ensure that all students receive the same standards-based evaluation, grades 1 through 12 and university education, also to ensure that a small number of exceptional needs for students must be addressed using appropriate alternative means to determine achievement and progress for all.Evaluation: Ensure that all students receive the same standards-based evaluation, grades 1 through 12 and university education, also to ensure that a small number of exceptional needs for students must be addressed using appropriate alternative means to determine achievement and progress for all.
                                        </li>
                                    </ol>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
           </div>
)
}

export default AboutUs;