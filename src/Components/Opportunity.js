// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// function ResponsiveExample() {
//   return (
//     <Container>
//       {/* Stack the columns on mobile by making one full-width and the other half-width */}
//       <Row style={{  padding:"5px"}}>
//         <Col xs={12} md={4} style={{border:"2px solid black"}}>
//           xs=12 md=8
//         </Col>
//         <Col xs={12} md={4} style={{border:"2px solid black"}}>
//           xs=12 md=4
//         </Col>
//         <Col xs={12} md={4} style={{border:"2px solid black"}}>
//           xs=6 md=4
//         </Col>
//       </Row>

//       {/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
//       <Row style={{ padding:"5px"}}>
//         <Col xs={12} md={4} style={{border:"2px solid black"}}>
//           xs=12 md=4
//         </Col>
//         <Col xs={12} md={4} style={{border:"2px solid black"}}>
//           xs=12 md=4
//         </Col>
//         <Col xs={12} md={4} style={{border:"2px solid black"}}>
//           xs=12 md=4
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ResponsiveExample;


import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css'
import { Col, Row } from 'react-bootstrap';

function BasicExample() {
  return (
    <Row style={{display:"flex", flexDirection:"row", }}>
    <Col xs={12} md={4} >
    <Card className="sparkle u-hover--sparkle">
      <Card.Img style={{height:"32vh"}} variant="top" src="iti.png" />
      <Card.Body>
        <Card.Title>ITI</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Button variant="danger">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
    <Col sx={12} md={4} >
    <Card className="sparkle u-hover--sparkle">
      <Card.Img variant="top" src="nurse.jpg" />
      <Card.Body>
        <Card.Title>NURSING</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Button variant="danger">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
    <Col sx={12} md={4} >
    <Card className="sparkle u-hover--sparkle">
      <Card.Img variant="top" src="computer.avif" />
      <Card.Body>
        <Card.Title>COPA</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Button variant="danger">Go somewhere</Button>
      </Card.Body>
    </Card>
    </Col>
    </Row>
  );
}

export default BasicExample;