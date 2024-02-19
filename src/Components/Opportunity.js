import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../App.css";
import { Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function BasicExample() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalBodyContent, setModalBodyContent] = useState("");

  const handleShowModal = (card) => {
    setSelectedCard(card);
    setShowModal(true);
    setModalBodyContent(getModalBodyContent(card));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCard(null);
    setModalBodyContent("");
  };

  const getModalBodyContent = (card) => {
    switch (card) {
      case "iti":
        return "An ITI (Industrial Training Institute) course is a vocational training program designed to equip individuals with the practical skills and knowledge needed for various trades and industries. These courses typically offer training in fields such as electrician, plumber, welder, mechanic, computer operator, and more. ITI courses focus on hands-on training, often conducted in workshops equipped with industry-standard machinery and tools. The curriculum combines theoretical learning with practical exercises to ensure students gain a comprehensive understanding of their chosen trade. Upon completion of an ITI course, graduates are typically well-prepared to enter the workforce directly or pursue further education in their field. These courses play a crucial role in addressing the skill gap in various industries and contribute to the overall development of a skilled workforce.";
      case "nursing":
        return " A nursing course is a structured educational program designed to prepare individuals for a career in nursing, which encompasses the provision of healthcare services to individuals, families, and communities. Nursing courses are offered at various academic levels, including diploma, associate's degree, bachelor's degree, master's degree, and doctoral degree levels, catering to individuals with different educational backgrounds and career aspirations.The curriculum of a nursing course typically includes a combination of theoretical coursework, laboratory sessions, and clinical rotations. Theoretical coursework covers topics such as anatomy, physiology, pharmacology, pathophysiology, nursing theory, and ethics. Laboratory sessions provide hands-on practice in skills such as patient assessment, medication administration, wound care, and vital signs monitoring. Clinical rotations allow students to apply their knowledge and skills in real healthcare settings under the supervision of experienced nursing faculty and preceptors.";
      case "copa":
        return "Computer courses cover a diverse array of topics, including computer programming, software development, web development, computer networking, database management, cybersecurity, and information systems management. The curriculum typically includes a combination of theoretical coursework, practical exercises, and hands-on projects to ensure students develop both conceptual understanding and practical proficiency in relevant technologies and methodologies.Depending on the specific focus of the course, students may learn programming languages such as Java, Python, C++, or JavaScript; software development methodologies such as Agile or Waterfall; web development technologies such as HTML, CSS, and JavaScript frameworks; networking concepts such as TCP/IP, LAN, WAN, and VPN; database management systems such as SQL and NoSQL; cybersecurity principles such as encryption, authentication, and intrusion detection; and information systems management topics such as project management, IT governance, and IT service management.";
      default:
        return "";
    }
  };

  return (
    <div>
      <Row
        style={{ display: "flex", flexDirection: "row", marginBottom: "8%" }}
      >
        <Col xs={12} md={4}>
          <Card
            className="sparkle u-hover--sparkle"
            onClick={() => handleShowModal("iti")}
          >
            <Card.Img style={{ height: "32vh" }} variant="top" src="iti.png" />
            <Card.Body>
              <Card.Title>ITI</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sx={12} md={4}>
          <Card
            className="sparkle u-hover--sparkle"
            onClick={() => handleShowModal("nursing")}
          >
            <Card.Img variant="top" src="nurse.jpg" />
            <Card.Body>
              <Card.Title>NURSING</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sx={12} md={4}>
          <Card
            className="sparkle u-hover--sparkle"
            onClick={() => handleShowModal("copa")}
          >
            <Card.Img variant="top" src="computer.avif" />
            <Card.Body>
              <Card.Title>COPA</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content...
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCard && selectedCard.toUpperCase()} Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBodyContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BasicExample;
