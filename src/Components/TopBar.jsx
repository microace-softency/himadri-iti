import React from "react";
import { Col, Row } from "react-bootstrap";
import Logo, { LogoSecondary } from "./Logo";

function TopBar() {
    function navigateToHome() {
    }

    return (
        <div className="bg-light w-100" id="home">
            <div className="container">
                <div className="py-2">
                    <div className="d-none d-sm-block">
                        <Row className="mb-2">
                            <Col sm={6} md={2} >
                                <div className="mt-2 w-100 d-flex flex-column h-100">
                                    <div><Logo style={{ height: '60px' }} /></div>
                                    <p className="small-info mt-2">AN ISO 9001: 2015 Certified Institute</p>
                                </div>
                            </Col>
                            <Col md={8} >
                                <div className="ps-4 d-sm-none d-lg-block">
                                    <h2 className="text-title m-none text-center">HIMADRI TECHNICALM TRAINING INSTITUTE</h2>
                                </div>
                            </Col>
                            <Col sm={6} md={2}>
                                <LogoSecondary style={{ height: '90px', width: '90px' }} />
                            </Col>
                        </Row>
                    </div>
                    <div className="d-block d-sm-none">
                        <div className="mb-2 d-flex justify-content-between">
                            <div className="">
                                <div className="mt-2 w-100 d-flex flex-column h-100">
                                    <div><Logo style={{ height: '50px' }} /></div>
                                    <p className="small-info mt-2">AN ISO 9001: 2015 Certified Institute</p>
                                </div>
                            </div>
                            <div>
                                <LogoSecondary style={{ height: '80px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TopBar;