import React from "react";
import AppCarousel from "../Components/Carousel";
import { Col, Container, Row } from "react-bootstrap";
import NewsFeed from "../Components/NewsFeed";
import EventComponent from "../Components/Events";
import Opportunity from "../Components/Opportunity";
import CustomerReviewSlider from "../Components/CustomerReviewSlider";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
    const carouselData = [
        {
            id: '1',
            // title: 'First Carousel',
            // des: 'carousel 1 description',
            src: './carousel/slider-i.jpg'
        },
        {
            id: '2',
            // title: '2nd Carousel',
            // des: 'carousel 2 description',
            src: './carousel/slider-ii.jpg'
        },
        {
            id: '3',
            // title: '3rd Carousel',
            // des: 'carousel 3 description',
            src: './carousel/slider-iii.jpg'
        },
        {
            id: '4',
            // title: '4th Carousel',
            // des: 'carousel 4 description',
            src: './carousel/slider-iv.jpg'
        },
    ]

    const aboutData = [
        {
            id: '4',
            // title: '4th Carousel',
            // des: 'carousel 4 description',
            src: './carousel/slider-iv.jpg'
        },
    ]

    return (

        <Row> 
            <section id="">
                <Container style={{maxWidth:"none", marginBottom:"15px"}}>
                    <Row className="md:p-2 xs:-m-2">
                        <Col sm={12} md={12} style={{paddingRight:"none !important", paddingLeft:"none !important"}}>
                            <AppCarousel props={carouselData} />
                        </Col>
                    </Row>
                </Container>
            <br></br>
            <br></br>
            <br></br>

            </section>
            <section id="about">
                <Container>
                    <Row className="p-2">
                        <Col sm={12} md={12 }>
                            <Row style={{alignItems:"center"}}>
                                <Col md={6}  className="py-2 " style={{alignItems:"center", justifyContent:"center"}}>
                                    <img className="about-box" style={{height:"333px", width:"95%", borderRadius:"15px"}} src="./carousel/slider-iv.jpg"/>
                                    {/* <AppCarousel props={aboutData}/> */}
                                </Col>
                                <Col md={6} className="py-2">
                                <h5>About us</h5>
                                <h3 style={{color:"red"}}>Who we are</h3>
                                    <p>HIMADRI TECHNICALM TRAINING INSTITUTE has been set up to promote the technological
                                        and professional institution of high standards and to encourage skill development
                                        training activities so that the students, conferred to the degree can not only the
                                        professional challenges but also all the challenges life has to offer confidently.
                                        In this era of economic liberalizations, globalizations and technological super
                                        advancement our effort is to put quality education in the light of tomorrow’s vision
                                        of spreading education throughout the society.
                                    </p>
                                    <button style={{background:"#9d0303", border:"none", borderRadius:"5px", boxShadow:"5px solid black", color:"white"}} onClick={()=>navigate('/about')}>Learn More</button>
                                </Col>
                                {/* <Col md={12} className="py-2">
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
                                </Col> */}
                            </Row>
                        </Col>
                        {/* <Col sm={12} md={4}>
                            <NewsFeed />
                        </Col> */}
                        <Col style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                        <br></br>
                        <br></br>
                        <br></br>

                            <h2>OUR LEARNING OPPORTUNITY</h2>
                            <br/>
                                <Opportunity/>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* <section id="forms">
                <Container>
                    <Row className="p-2">
                        <Col sm={6} lg={4}>
                            <div className="form-sec">
                                <h4 className="bg-p2 p-2 text-white">Notice Board</h4>
                                <div className="">
                                    <div className="p-2">
                                        <a href="#scd" className="text-decoration-none ps-2">Admission Form</a>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6} lg={4}>
                            <div className="form-sec">
                                <h4 className="bg-p2 p-2 text-white">Important Links</h4>
                                <div className="">
                                    <div className="p-2">
                                        <a href="#scd" className="text-decoration-none ps-2">Admission Form</a>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section> */}
            <section id="events">
                <Container>
                    <Row className="p-2">
                        <Col md={12}>
                            <EventComponent />
                        </Col>
                    </Row>
                    <Row className="p-2">
                        <Col md={12}>
                        <h2  style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>WHAT STUDENTS SAY ABOUT US</h2>
                        <br/>
                         <CustomerReviewSlider/>
                        </Col>
                    </Row>
                    <br/>

                </Container>
            </section>
        </Row>
    )
}
export default Home;