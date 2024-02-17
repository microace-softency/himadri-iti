import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ReCAPTCHA from "react-google-recaptcha";
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { addDoc, collection } from "@firebase/firestore";

import { db } from "../firebase";

function AppFooter() {
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    captcha: false
  });
  const value = collection(db, "Queries");
  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setFormData({
        ...formData,
        captcha: true
      })
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isCaptchaVerified) {
      try {
        await addDoc(value, formData);
        console.log('queries===>', formData);
        setFormData({
          name: "",
          email: "",
          message: "",
          captcha: false
        })
        setCaptchaVerified(false)
        toast('Thank you for contacting us. We will reply soon.');
      } catch (error) {
        console.log(error);
        toast('sorry, try again later')
      }
    } else {
      toast('please enter the Captcha correctly');
    }
  };

  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5>Follow us on</h5>
            <div className="follow-links py-2 color-red">
              <a href="">
                <BsFacebook />
              </a>
              <a href="">
                <BsTwitter />
              </a>
              <a href="">
                <BsInstagram />
              </a>
            </div>
          </Col>

          <Col md={4} sm={6}>
            <h5>Visit us </h5>
            <p className="text-p1">
              Plot No D-19/12,<br />
              Kalyani, Nadia-741235
            </p>
          </Col>
          <Col md={5} sm={12}>
            <h5>Contact Us</h5>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={4} md={12} lg={4}>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={8} md={12} lg={8}>
                  <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="message">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Your message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mt-4">
                  {/* <ReCAPTCHA
                    sitekey={process.env.REACT_APP_GCAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  /> */}
                  <button type="submit" className="mt-3 w-100 button-p1">
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <hr />
        <div className="d-flex justify-content-center">
          <a href="#home" className="text-p1 text-decoration-none">© Himadri.co.in</a>
        </div>
      </Container>
    </footer>
  );
}

export default AppFooter;
