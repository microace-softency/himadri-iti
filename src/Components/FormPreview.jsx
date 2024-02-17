import { useEffect, useState } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";

function FormPreview({ formData }) {
  const [photoSrc, setPhotoSrc] = useState('');
  const [studentsSingnatureSrc, setStudentsSingnatureSrc] = useState('');
  const [ParentSignatureSrc, setParentSignatureSrc] = useState('');

  useEffect(() => {
    if (formData.profilePhoto) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setPhotoSrc(event.target.result);
      };
      reader.readAsDataURL(formData.profilePhoto);
    }
    if (formData.studentSignature) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setStudentsSingnatureSrc(event.target.result);
      };
      reader.readAsDataURL(formData.studentSignature);
    }
    if (formData.parentsSignature) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setParentSignatureSrc(event.target.result);
      };
      reader.readAsDataURL(formData.parentsSignature);
    }
  },);


  return (
    <div className="form-preview-format">
      <h4 className="bg-warning px-2">Personal Information</h4>
      <Row>
        <Col sm={10}>
          <Row>
            <Col sm={1}>
              <label htmlFor="name">Name:</label>
            </Col>
            <Col sm={11}>
              <input
                disabled
                type="text"
                id="name"
                name="name"
                className="w-100 my-1"
                value={formData.name}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <label htmlFor="address">Address:</label>
            </Col>
            <Col sm={11}>
              <input
                disabled
                type="text"
                id="address"
                name="address"
                className="w-100 my-1"
                value={formData.address}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <label htmlFor="postOffice">Post Office:</label>
            </Col>
            <Col sm={4}>
              <input
                disabled
                type="text"
                id="postOffice"
                name="postOffice"
                className="w-100 my-1"
                value={formData.postOffice}
                required
              />
            </Col>
            <Col sm={1}>
              <label htmlFor="policeStation">P.S. :</label>
            </Col>
            <Col sm={5}>
              <input
                disabled
                type="text"
                id="policeStation"
                name="policeStation"
                className="w-100 my-1"
                value={formData.policeStation}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <label htmlFor="district">District:</label>
            </Col>
            <Col sm={5}>
              <input
                disabled
                type="text"
                id="district"
                name="district"
                value={formData.district}
                className="w-100 my-1"
                required
              />
            </Col>
            <Col sm={1}>
              <label htmlFor="pin">PIN:</label>
            </Col>
            <Col sm={5}>
              <input
                disabled
                type="text"
                id="pin"
                name="pin"
                value={formData.pin}
                className="w-100 my-1"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col sm={1}>
              <label htmlFor="dob">DOB:</label>
            </Col>
            <Col sm={2}>
              <input
                disabled
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                className="w-100 my-1"
                required
              />
            </Col>
            <Col sm={1}>
              <label htmlFor="Gender">Gender:</label>
            </Col>
            <Col sm={3}>
              <label htmlFor="male">
                <input
                  disabled
                  type="checkbox"
                  id="male"
                  name="gender"
                  value="male"
                  className="mx-1"
                  checked={formData.gender === "male"}
                />{" "}
                Male
              </label>
              <label htmlFor="female">
                <input
                  disabled
                  type="checkbox"
                  id="female"
                  name="gender"
                  value="female"
                  className="mx-1"
                  checked={formData.gender === "female"}
                />{" "}
                Female
              </label>
            </Col>
            <Col sm={1}>
              <label htmlFor="cast">Cast:</label>
            </Col>
            <Col sm={4}>
              <label htmlFor="GN">
                <input
                  disabled
                  type="checkbox"
                  id="gn"
                  name="cast"
                  value="GN"
                  className="mx-1"
                  checked={formData.cast === "GN"}
                />{" "}
                GN
              </label>
              <label htmlFor="OBC">
                <input
                  disabled
                  type="checkbox"
                  id="obc"
                  name="cast"
                  value="OBC"
                  className="mx-1"
                  checked={formData.cast === "OBC"}
                />{" "}
                OBC
              </label>
              <label htmlFor="SC">
                <input
                  disabled
                  type="checkbox"
                  id="SC"
                  name="cast"
                  value="SC"
                  className="mx-1"
                  checked={formData.cast === "SC"}
                />{" "}
                SC
              </label>
              <label htmlFor="ST">
                <input
                  disabled
                  type="checkbox"
                  id="ST"
                  name="cast"
                  value="ST"
                  className="mx-1"
                  checked={formData.cast === "ST"}
                />{" "}
                ST
              </label>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <label htmlFor="Religion">Religion:</label>
            </Col>
            <Col sm={3}>
              <input
                disabled
                type="text"
                id="religion"
                name="religion"
                value={formData.religion}
                className="w-100 my-1"
                required
              />
            </Col>
            <Col sm={3}>
              <label htmlFor="MotherTongue">Mother Tongue:</label>
            </Col>
            <Col sm={4}>
              <input
                disabled
                type="text"
                id="motherTongue"
                name="motherTongue"
                value={formData.motherTongue}
                className="mx-1 w-100"
              />
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <label htmlFor="Religion">Phone No:</label>
            </Col>
            <Col sm={4}>
              <input
                disabled
                type="number"
                id="phone"
                name="phone"
                value={formData.phone}
                className="w-100 my-1"
                required
              />
            </Col>
            <Col sm={2}>
              <label htmlFor="MotherTongue">Email Id:</label>
            </Col>
            <Col sm={4}>
              <input
                disabled
                type="text"
                id="email"
                name="email"
                value={formData.email}
                className="mx-1 w-100"
              />
            </Col>
          </Row>
        </Col>
        <Col sm={2}>
          <div className="photo-box d-flex align-items-center">
            <img className="w-100" src={photoSrc} alt="" />
          </div>
        </Col>
      </Row>
      <h4 className="bg-warning px-2 mt-4">Guardian / Parent Details</h4>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">Father's Name</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="fathername"
            name="fathername"
            className="w-100 my-1"
            value={formData.fatherName}
            required
          />
        </Col>
        <Col sm={2}>
          <label htmlFor="policeStation">Occupation</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="fatheroccupation"
            name="fatheroccupation"
            className="w-100 my-1"
            value={formData.fatherOccupation}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">phone No</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="fatherphone"
            name="fatherphone"
            className="w-100 my-1"
            value={formData.fatherPhone}
            required
          />
        </Col>
        <Col sm={2}>
          <label htmlFor="policeStation">Email ID</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="fatheremail"
            name="fatheremail"
            className="w-100 my-1"
            value={formData.fatherEmail}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">mother's Name</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="mothername"
            name="mothername"
            className="w-100 my-1"
            value={formData.motherName}
            required
          />
        </Col>
        <Col sm={2}>
          <label htmlFor="policeStation">Occupation</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="motheroccupation"
            name="motheroccupation"
            className="w-100 my-1"
            value={formData.motherOccupation}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">phone No</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="motherphone"
            name="motherphone"
            className="w-100 my-1"
            value={formData.motherPhone}
            required
          />
        </Col>
        <Col sm={2}>
          <label htmlFor="policeStation">Email ID</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="motheremail"
            name="motheremail"
            className="w-100 my-1"
            value={formData.motherEmail}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">gurdian's Name</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="gurdianname"
            name="gurdianname"
            className="w-100 my-1"
            value={formData.gurdianName}
            required
          />
        </Col>
        <Col sm={2}>
          <label htmlFor="policeStation">Occupation</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="gurdianoccupation"
            name="gurdianoccupation"
            className="w-100 my-1"
            value={formData.gurdianOccupation}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">phone No</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="gurdianphone"
            name="gurdianphone"
            className="w-100 my-1"
            value={formData.gurdianPhone}
            required
          />
        </Col>
        <Col sm={2}>
          <label htmlFor="policeStation">Email ID</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="gurdianemail"
            name="gurdianemail"
            className="w-100 my-1"
            value={formData.gurdianEmail}
            required
          />
        </Col>
      </Row>
      <h4 className="bg-warning px-2 mt-4">Education Qualification</h4>
      <div className="table-wrap">
        <table className="w-100">
          <thead>
            <tr>
              <th>Exam</th>
              <th>Board/University</th>
              <th>Year</th>
              <th>Stream</th>
              <th>Institution</th>
              <th>Marks %</th>
              <th>Division</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(formData.educationQualificationDetails).map(
              (level) => (
                <tr key={level}>
                  <td>{level}</td>
                  {Object.keys(
                    formData.educationQualificationDetails[level]
                  ).map((field) => (
                    <td key={field}>
                      <input
                        disabled
                        type="text"
                        name={field}
                        value={
                          formData.educationQualificationDetails[level][field]
                        }
                        required
                      />
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <Row sm={12}>
        <Col sm={3}>
          <label>Extra Curricular Activities & Interest</label>
        </Col>
        <Col sm={9}>
          <input
            disabled
            type="text"
            className="w-100"
            name="extraCurricularActivity"
            value={formData.extraCurricularActivity}
            required
          />
        </Col>
      </Row>
      <h4 className="bg-warning px-2 mt-4">Professional Experience (if any)</h4>
      <Row>
        <Col sm={2}>
          <label htmlFor="name">Company Name:</label>
        </Col>
        <Col sm={10}>
          <input
            disabled
            type="text"
            id="companyName"
            name="companyName"
            className="w-100 my-1"
            value={formData.companyName}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="address">Adress:</label>
        </Col>
        <Col sm={10}>
          <input
            disabled
            type="text"
            id="companyAdress"
            name="companyAdress"
            className="w-100 my-1"
            value={formData.companyAdress}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">Phone No:</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="companyPhone"
            name="companyPhone"
            className="w-100 my-1"
            value={formData.companyPhone}
            required
          />
        </Col>
        <Col sm={1}>
          <label htmlFor="policeStation">Email ID:</label>
        </Col>
        <Col sm={5}>
          <input
            disabled
            type="text"
            id="companyEmail"
            name="companyEmail"
            className="w-100 my-1"
            value={formData.companyEmail}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="district">Designation:</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="companyDesignation"
            name="companyDesignation"
            value={formData.companyDesignation}
            className="w-100 my-1"
            required
          />
        </Col>
        <Col sm={1}>
          <label htmlFor="pin">Duration:</label>
        </Col>
        <Col sm={5}>
          <input
            disabled
            type="text"
            id="companyDuration"
            name="companyDuration"
            value={formData.companyDuration}
            className="w-100 my-1"
            required
          />
        </Col>
      </Row>
      <h4 className="bg-warning px-2 mt-4">
        How did you come to know about our Institution ?
      </h4>
      <Row>
        <Col sm={2}>
          <label htmlFor="newspaper">
            <input
              disabled
              type="checkbox"
              id="newspaper"
              name="newspaper"
              className="mx-1"
              checked={formData.instituteKnownFrom.newspaper}
            />{" "}
            Newspaper
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="friends">
            <input
              disabled
              type="checkbox"
              id="friends"
              name="friends"
              className="mx-1"
              checked={formData.instituteKnownFrom.friends}
            />{" "}
            Friends
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="facebook">
            <input
              disabled
              type="checkbox"
              id="facebook"
              name="facebook"
              className="mx-1"
              checked={formData.instituteKnownFrom.facebook}
            />{" "}
            Facebook
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="instagram">
            <input
              disabled
              type="checkbox"
              id="instagram"
              name="instagram"
              className="mx-1"
              checked={formData.instituteKnownFrom.instagram}
            />{" "}
            Instagram
          </label>
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="notification">
            <input
              disabled
              type="checkbox"
              id="notification"
              name="notification"
              className="mx-1"
              checked={formData.instituteKnownFrom.notification}
            />{" "}
            Notification
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="coachingCentre">
            <input
              disabled
              type="checkbox"
              id="coachingCentre"
              name="coachingCentre"
              className="mx-1"
              checked={formData.instituteKnownFrom.coachingCentre}
            />{" "}
            Coaching Centre
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="poster">
            <input
              disabled
              type="checkbox"
              id="poster"
              name="poster"
              className="mx-1"
              checked={formData.instituteKnownFrom.poster}
            />{" "}
            Poster
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="googleSearch">
            <input
              disabled
              type="checkbox"
              id="googleSearch"
              name="googleSearch"
              className="mx-1"
              checked={formData.instituteKnownFrom.googleSearch}
            />{" "}
            Google Search
          </label>
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="mail">
            <input
              disabled
              type="checkbox"
              id="mail"
              name="mail"
              className="mx-1"
              checked={formData.instituteKnownFrom.mail}
            />{" "}
            Mail
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="sms">
            <input
              disabled
              type="checkbox"
              id="sms"
              name="sms"
              className="mx-1"
              checked={formData.instituteKnownFrom.sms}
            />{" "}
            SMS
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="callLetter">
            <input
              disabled
              type="checkbox"
              id="callLetter"
              name="callLetter"
              className="mx-1"
              checked={formData.instituteKnownFrom.callLetter}
            />{" "}
            Call Letter
          </label>
        </Col>
        <Col sm={2}>
          <label htmlFor="hoarding">
            <input
              disabled
              type="checkbox"
              id="hoarding"
              name="hoarding"
              className="mx-1"
              checked={formData.instituteKnownFrom.hoarding}
            />{" "}
            Hoarding
          </label>
        </Col>
      </Row>
      <h4 className="bg-warning px-2 mt-4">Terms And Conditions :</h4>
      <ul>
        <li>
          Admission will be made only after completion of written test, group
          discussion and interview
        </li>
        <li>
          Payment of fees should be made on or before the prescribed dates
          notified by the authority failing which admission will be forfeited
        </li>
        <li>
          Amount once paid towards admission/program fees is neither refundable
          nor transferable under any circumstances
        </li>
        <li>
          All candidates are required and expected to follow the code of
          conduct, rules and regulations of the Institution in force from time
          to time
        </li>
        <li>
          Any act of academic dishonesty, misconduct, indiscipline, violence or
          damage caused to people/property of XEENA by any students will be
          considered/treated as an offence against the Institute and such
          student will be expelled from XEENA
        </li>
        <li>
          The candidate must fulfill all academic requirements notified by the
          Institution authorities from time to time{" "}
        </li>
        <li>
          Misleading information or misrepresented facts will disqualify the
          applicant from admission into XEENA
        </li>
        <li>
          {" "}
          XEENA reserves the right to amend the rules at any given point of
          time.
        </li>
        <li>
          {" "}
          In case of discontinuation of course in between under any
          circumstances, the student will have to pay all the semester fees.
        </li>
        <li>
          XEENA has the sole discretion to alter or change the venue of test
          centre, dates of written test, group discussion and personal interview
          and patter of the admission process without any prior notice or
          approval
        </li>
        <li>
          Junsdiction for all disputes (if any) relating to the XEENA is
          Kalyani, Nadia, West Bengal, India
        </li>
      </ul>
      <h4 className="bg-warning px-2 mt-4">Declaration :</h4>
      {/* <Row className="my-2">
        <Col sm={6} className="position-relative">
          <label htmlFor="admitCard">
            Admit Card:
            <input
                disabled
              type="file"
              id="admitCard"
              className="image-choose"
              name="admitCard"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
        <Col className="position-relative">
          <label htmlFor="marksheet">
            Marksheet:
            <input
                disabled
              type="file"
              id="marksheet"
              className="image-choose"
              name="marksheet"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
      </Row>
      <Row className="my-2">
        <Col sm={6} className="position-relative">
          <label htmlFor="certificate">
            Certificate :
            <input
                disabled
              type="file"
              id="certificate"
              className="image-choose"
              name="certificate"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
        <Col className="position-relative">
          <label htmlFor="adharCard">
            adharCard:
            <input
                disabled
              type="file"
              id="adharCard"
              className="image-choose"
              name="adharCard"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
      </Row>
      <Row className="my-2">
        <Col sm={6} className="position-relative">
          <label htmlFor="slc">
            SLC:
            <input
                disabled
              type="file"
              id="slc"
              className="image-choose"
              name="slc"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
        <Col className="position-relative">
          <label htmlFor="photo">
            Photo:
            <input
                disabled
              type="file"
              className="image-choose"
              id="photo"
              name="photo"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
      </Row>
      <Row className="my-2">
        <Col sm={6} className="position-relative">
          <label htmlFor="castcertificate">
            Cast Certificate :
            <input
                disabled
              type="file"
              id="castcertificate"
              className="image-choose"
              name="castcertificate"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
        <Col className="position-relative">
          <label htmlFor="guardiansAdharCard">
            Guardians adhar Card:
            <input
                disabled
              type="file"
              id="guardiansAdharCard"
              className="image-choose"
              name="guardiansAdharCard"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </Col>
      </Row> */}
      <Row sm={6} className="mt-4">
        <Col className="w-100">
          <p className="fw-bold">
            Declaration : I hereby declare that, aii the statements furnished by
            me, in the Application From, is true to the best of my knowladge. I
            had gone through all the Rules, Regulations & Teaching Methodology
            of the Institute and affirming and to abide by all of them.
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <label htmlFor="postOffice">Place :</label>
        </Col>
        <Col sm={4}>
          <input
            disabled
            type="text"
            id="declarationPlace"
            name="declarationPlace"
            className="w-100 my-1"
            value={formData.declarationPlace}
            required
          />
        </Col>
        <Col sm={1}>
          <label htmlFor="dob">Date :</label>
        </Col>
        <Col sm={2}>
          <input
            disabled
            type="date"
            id="declarationDate"
            name="declarationDate"
            value={formData.declarationDate}
            className="w-100 my-1"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6} className="position-relative">
          <label htmlFor="district">Students Signature:</label>
          <img className="w-50 ms-2" src={studentsSingnatureSrc} alt="" />
        </Col>
        <Col sm={6} md={3} className="position-relative">
          <label htmlFor="pin">Parents Signature :</label>
          <img className="w-50 ms-2" src={ParentSignatureSrc} alt="" />
        </Col>
      </Row>
    </div>
  );
}

export default FormPreview;
