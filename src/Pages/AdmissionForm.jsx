import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FormPreview from "../Components/FormPreview";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  db,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebase";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import Logo, { LogoSecondary } from "../Components/Logo";

// import { useForm } from "react-hook-form";


const AdmissionForm = () => {

  // const { register, handleSubmit, formState: { errors } } = useForm();

  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPrintable, setIsPrintable] = useState(false)

  const [submitId, setSubmitId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postOffice: "",
    policeStation: "",
    district: "",
    pin: "",
    dob: "",
    gender: "",
    cast: "",
    religion: "",
    motherTongue: "",
    profilePhoto: null,
    phone: "",
    email: "",
    //gurdian info
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    fatherEmail: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    motherEmail: "",
    guardianName: "",
    guardianOccupation: "",
    guardianPhone: "",
    guardianEmail: "",
    // Add more fields here for education qualification
    educationQualificationDetails: {
      tenth: {
        board: "",
        year: "",
        stream: "",
        institution: "",
        marks: "",
        division: "",
      },
      twelfth: {
        board: "",
        year: "",
        stream: "",
        institution: "",
        marks: "",
        division: "",
      },
      graduation: {
        board: "",
        year: "",
        stream: "",
        institution: "",
        marks: "",
        division: "",
      },
      postGraduation: {
        board: "",
        year: "",
        stream: "",
        institution: "",
        marks: "",
        division: "",
      },
      professionalCourse: {
        board: "",
        year: "",
        stream: "",
        institution: "",
        marks: "",
        division: "",
      },
    },
    extraCurricularActivity: "",

    //professional Experiences
    companyName: "",
    companyAdress: "",
    companyPhone: "",
    companyEmail: "",
    companyDesignation: "",
    companyDuration: "",

    //how did get to know about institute
    instituteKnownFrom: {
      newspaper: false,
      friends: false,
      facebook: false,
      instagram: false,
      notification: false,
      coachingCentre: false,
      poster: false,
      googleSearch: false,
      mail: false,
      sms: false,
      hoarding: false,
      callLetter: false,
      other: "",
    },
    //uploded Documents
    admitCard: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    graduationMarksheet: null,
    postGraduateMarksheet: null,
    professionalCourseMarksheet: null,
    certificate: null,
    slc: null,
    adharCard: null,
    photo: null,
    casteCertificate: null,
    guardianAdharCard: null,
    studentSignature: null,
    parentSignature: null,

    //Declaration
    declarationPlace: "",
    declarationDate: "",
  });
  const handleChangeEduData = (e, fieldPath) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      educationQualificationDetails: {
        ...prevData.educationQualificationDetails,
        [fieldPath]: {
          ...prevData.educationQualificationDetails[fieldPath],
          [name]: value,
        },
      },
    }));
  };
  const handleFileChange = async (event) => {
    const { name, files } = event.target;
    if (files) {
      const file = event.target.files[0];
      let maxSizeInBytes =
        (name === "studentSignature"
          ? 30
          : name === "parentSignature"
            ? 30
            : 200) * 1024; // 500 KB in Bytes
      console.log(maxSizeInBytes / 1024);
      if (file.size > maxSizeInBytes) {
        // alert(
        //   `Selected file exceeds the maximum allowed size of ${
        //     maxSizeInBytes / 1024
        //   } KB.`
        // );
        toast(
          `Selected file exceeds the maximum allowed size of ${maxSizeInBytes / 1024
          } KB.`
        );
        event.target.value = null;
        //  Clear the input to prevent submitting the oversized file
        return;
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: files[0],
        }));
      }
    }
  };
  const handleCheckboxChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        instituteKnownFrom: {
          ...prevFormData.instituteKnownFrom,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData) => {
      if (type === "checkbox") {
        return {
          ...prevFormData,
          [name]: value,
        };
      } else if (type === "file") {
        return {
          ...prevFormData,
          [name]: e.target.files[0],
        };
      } else {
        return {
          ...prevFormData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCaptchaVerified) {
      setPreviewMode(true);
    } else {
      toast('please enter the Captcha correctly');
    }
  };
  //upload the files in google storage and get the url
  const convertImageIntoUrl = async (formData) => {
    const updatedFormData = { ...formData };

    // Helper function to upload a file and get its download URL
    const uploadFileAndGetUrl = async (file) => {
      if (file) {
        const storageRef = ref(storage, `publicFiles/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;

        return getDownloadURL(uploadTask.snapshot.ref);
      }
      return null;
    };

    // Iterate through each field in the formData and check for files to upload
    for (const key in updatedFormData) {
      if (Object.prototype.hasOwnProperty.call(updatedFormData, key)) {
        if (updatedFormData[key] instanceof File) {
          const downloadURL = await uploadFileAndGetUrl(updatedFormData[key]);
          updatedFormData[key] = downloadURL;
        }
      }
    }

    return updatedFormData;
  };
  const handleCaptchaChange = (value) => {
    console.log('dip', value)
    if (value) {
      setCaptchaVerified(true);
    }
  };
  //form data saved in firebase as applications

  const value = collection(db, "Applications");

  const handleSaveToDb = async () => {
    try {
      setIsLoading(true)
      const modifiedFormData = await convertImageIntoUrl(formData);

      // const phoneNumber = modifiedFormData.phone; // Assuming the phone number is stored in the formData

      // Check if a document with the same phone number exists
      // const phoneQuery = query(value, where("phone", "==", phoneNumber));
      // const matchingDocs = await getDocs(phoneQuery);

      // if (!matchingDocs.empty) {
      //   // A document with the same phone number already exists
      //   console.log("A document with the same phone number already exists.");
      //   toast("A document with the same phone number already exists.");
      //   setIsLoading(false)
      //   return;
      // }
      // No document with the same phone number exists, proceed with adding the new document
      modifiedFormData.createdAt = serverTimestamp();
      const result = await addDoc(value, modifiedFormData);
      setSubmitId(result.id)
      // Now you can use modifiedFormData to send to your database or perform other operations
      localStorage.setItem("formData", JSON.stringify(modifiedFormData));
      setIsLoading(false)
      setIsPrintable(true)
      // navigate("submissionSuccess");
    } catch (error) {
      console.error("An error occurred:", error);
      toast("An error occured")
      setIsLoading(false)
    }
  };

  return (
    <>
      {isLoading && <div className="loader-div">
        <span className="loader"></span>
      </div>}
      <div className={isLoading ? "container blur" : "container"}>
        <div className="form-container">
          <p className="text-center m-0 fw-bold">
            {previewMode
              ? "Please check your Form details"
              : "Admission Form (DMLT)"}
          </p>
          <div className="heading">
            <div className="bg-p2 text-white text-center">
              <h1>HIMADRI TECHNICALM TRAINING INSTITUTE</h1>
            </div>
            <div className="d-flex justify-content-between">
              <Logo style={{ height: "60px" }} />
              <LogoSecondary style={{ height: "70px" }} />
            </div>
            <div className="">
              <h3 className="text-center">Collaborated with</h3>
              <h3 className="text-center">
                MINISTRY OF MICRO, SMALL & MEDIUM ENTERPRISES
              </h3>
              <div className="d-flex justify-content-between">
                {submitId && <p className="fw-bold">Application Id: {submitId}</p>}
                <p className="fw-bold">Ph-88202 70777/9088104895</p>
              </div>
            </div>
          </div>

          {previewMode ? (
            <FormPreview formData={formData} />
          ) : (
            <form onSubmit={handleSubmit}>
              <h4 className="bg-warning px-2">Personal Information</h4>
              <Row>
                <Col sm={10}>
                  <Row>
                    <Col sm={1}>
                      <label htmlFor="name">Name </label>
                    </Col>
                    <Col sm={11}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-100 my-1"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={1}>
                      <label htmlFor="address">Address </label>
                    </Col>
                    <Col sm={11}>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="w-100 my-1"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={2}>
                      <label htmlFor="postOffice">Post Office </label>
                    </Col>
                    <Col sm={4}>
                      <input
                        type="text"
                        id="postOffice"
                        name="postOffice"
                        className="w-100 my-1"
                        value={formData.postOffice}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={1}>
                      <label htmlFor="policeStation">P S </label>
                    </Col>
                    <Col sm={5}>
                      <input
                        type="text"
                        id="policeStation"
                        name="policeStation"
                        className="w-100 my-1"
                        value={formData.policeStation}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={1}>
                      <label htmlFor="district">District </label>
                    </Col>
                    <Col sm={5}>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        className="w-100 my-1"
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={1}>
                      <label htmlFor="pin">PIN </label>
                    </Col>
                    <Col sm={5}>
                      <input
                        type="number"
                        id="pin"
                        name="pin"
                        value={formData.pin}
                        className="w-100 my-1"
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={1}>
                      <label htmlFor="dob">DOB </label>
                    </Col>
                    <Col sm={2}>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        className="w-100 my-1"
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={1}>
                      <label htmlFor="Gender">Gender </label>
                    </Col>
                    <Col sm={3}>
                      <label htmlFor="male">
                        <input
                          type="checkbox"
                          id="male"
                          name="gender"
                          value="male"
                          className="mx-1"
                          checked={formData.gender === "male"}
                          onChange={handleChange}
                        />{" "}
                        Male
                      </label>
                      <label htmlFor="female">
                        <input
                          type="checkbox"
                          id="female"
                          name="gender"
                          value="female"
                          className="mx-1"
                          checked={formData.gender === "female"}
                          onChange={handleChange}
                        />{" "}
                        Female
                      </label>
                    </Col>
                    <Col sm={1}>
                      <label htmlFor="cast">Cast </label>
                    </Col>
                    <Col sm={4}>
                      <label htmlFor="GN">
                        <input
                          type="checkbox"
                          id="gn"
                          name="cast"
                          value="GN"
                          className="mx-1"
                          checked={formData.cast === "GN"}
                          onChange={handleChange}
                        />{" "}
                        GN
                      </label>
                      <label htmlFor="OBC">
                        <input
                          type="checkbox"
                          id="obc"
                          name="cast"
                          value="OBC"
                          className="mx-1"
                          checked={formData.cast === "OBC"}
                          onChange={handleChange}
                        />{" "}
                        OBC
                      </label>
                      <label htmlFor="SC">
                        <input
                          type="checkbox"
                          id="SC"
                          name="cast"
                          value="SC"
                          className="mx-1"
                          checked={formData.cast === "SC"}
                          onChange={handleChange}
                        />{" "}
                        SC
                      </label>
                      <label htmlFor="ST">
                        <input
                          type="checkbox"
                          id="ST"
                          name="cast"
                          value="ST"
                          className="mx-1"
                          checked={formData.cast === "ST"}
                          onChange={handleChange}
                        />{" "}
                        ST
                      </label>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={2}>
                      <label htmlFor="Religion">Religion </label>
                    </Col>
                    <Col sm={3}>
                      <input
                        type="text"
                        id="religion"
                        name="religion"
                        value={formData.religion}
                        className="w-100 my-1"
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={3}>
                      <label htmlFor="MotherTongue">Mother Tongue </label>
                    </Col>
                    <Col sm={4}>
                      <input
                        type="text"
                        id="motherTongue"
                        name="motherTongue"
                        value={formData.motherTongue}
                        className="mx-1 w-100"
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={2}>
                      <label htmlFor="Religion">Phone No </label>
                    </Col>
                    <Col sm={4}>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        className="w-100 my-1"
                        onChange={handleChange}
                        required
                      />
                    </Col>
                    <Col sm={2}>
                      <label htmlFor="MotherTongue">Email Id </label>
                    </Col>
                    <Col sm={4}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        className="mx-1 w-100"
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm={2}>
                  <div className="photo-box d-flex align-items-center">
                    <div>
                      <label htmlFor="photo">Profile Photo</label>
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <h4 className="bg-warning px-2 mt-4">
                Guardian / Parent Details
              </h4>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">Father's Name</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    className="w-100 my-1"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <label htmlFor="policeStation">Occupation</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="fatherOccupation"
                    name="fatherOccupation"
                    className="w-100 my-1"
                    value={formData.fatherOccupation}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">phone No</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="tel"
                    id="fatherPhone"
                    name="fatherPhone"
                    className="w-100 my-1"
                    value={formData.fatherPhone}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={2}>
                  <label htmlFor="policeStation">Email ID</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="email"
                    id="fatherEmail"
                    name="fatherEmail"
                    className="w-100 my-1"
                    value={formData.fatherEmail}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">mother's Name</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="motherName"
                    name="motherName"
                    className="w-100 my-1"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <label htmlFor="policeStation">Occupation</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="motherOccupation"
                    name="motherOccupation"
                    className="w-100 my-1"
                    value={formData.motherOccupation}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">phone No</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="tel"
                    id="motherPhone"
                    name="motherPhone"
                    className="w-100 my-1"
                    value={formData.motherPhone}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <label htmlFor="policeStation">Email ID</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="email"
                    id="motherEmail"
                    name="motherEmail"
                    className="w-100 my-1"
                    value={formData.motherEmail}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">gurdian's Name</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="guardianName"
                    name="guardianName"
                    className="w-100 my-1"
                    value={formData.guardianName}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={2}>
                  <label htmlFor="policeStation">Occupation</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="guardianOccupation"
                    name="guardianOccupation"
                    className="w-100 my-1"
                    value={formData.guardianOccupation}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">phone No</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="tel"
                    id="guardianPhone"
                    name="guardianPhone"
                    className="w-100 my-1"
                    value={formData.guardianPhone}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={2}>
                  <label htmlFor="policeStation">Email ID</label>
                </Col>
                <Col sm={4}>
                  <input
                    type="email"
                    id="guardianEmail"
                    name="guardianEmail"
                    className="w-100 my-1"
                    value={formData.guardianEmail}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <h4 className="bg-warning px-2 mt-4">
                Education Qualification
                <small className="ms-">(if not have then write NA)</small>
              </h4>
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
                                type="text"
                                name={field}
                                value={
                                  formData.educationQualificationDetails[level][
                                  field
                                  ]
                                }
                                onChange={(e) => handleChangeEduData(e, level)}
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
                    type="text"
                    className="w-100"
                    name="extraCurricularActivity"
                    value={formData.extraCurricularActivity}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <h4 className="bg-warning px-2 mt-4">
                Professional Experience (if any)
              </h4>
              <Row>
                <Col sm={2}>
                  <label htmlFor="name">Company Name </label>
                </Col>
                <Col sm={10}>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="w-100 my-1"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="address">Adress </label>
                </Col>
                <Col sm={10}>
                  <input
                    type="text"
                    id="companyAdress"
                    name="companyAdress"
                    className="w-100 my-1"
                    value={formData.companyAdress}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">Phone No </label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="companyPhone"
                    name="companyPhone"
                    className="w-100 my-1"
                    value={formData.companyPhone}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={1}>
                  <label htmlFor="policeStation">Email ID </label>
                </Col>
                <Col sm={5}>
                  <input
                    type="text"
                    id="companyEmail"
                    name="companyEmail"
                    className="w-100 my-1"
                    value={formData.companyEmail}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="district">Designation </label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="companyDesignation"
                    name="companyDesignation"
                    value={formData.companyDesignation}
                    className="w-100 my-1"
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={1}>
                  <label htmlFor="pin">Duration </label>
                </Col>
                <Col sm={5}>
                  <input
                    type="text"
                    id="companyDuration"
                    name="companyDuration"
                    value={formData.companyDuration}
                    className="w-100 my-1"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <h4 className="bg-warning px-2 mt-4">
                How did you come to know about our Institution ?
              </h4>
              <Row>
                <Col sm={3} md={2}>
                  <label htmlFor="newspaper">
                    <input
                      type="checkbox"
                      id="newspaper"
                      name="newspaper"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.newspaper}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Newspaper
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="friends">
                    <input
                      type="checkbox"
                      id="friends"
                      name="friends"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.friends}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Friends
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="facebook">
                    <input
                      type="checkbox"
                      id="facebook"
                      name="facebook"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.facebook}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Facebook
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="instagram">
                    <input
                      type="checkbox"
                      id="instagram"
                      name="instagram"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.instagram}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Instagram
                  </label>
                </Col>
              </Row>
              <Row>
                <Col sm={3} md={2}>
                  <label htmlFor="notification">
                    <input
                      type="checkbox"
                      id="notification"
                      name="notification"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.notification}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Notification
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="coachingCentre">
                    <input
                      type="checkbox"
                      id="coachingCentre"
                      name="coachingCentre"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.coachingCentre}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Coaching Centre
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="poster">
                    <input
                      type="checkbox"
                      id="poster"
                      name="poster"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.poster}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Poster
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="googleSearch">
                    <input
                      type="checkbox"
                      id="googleSearch"
                      name="googleSearch"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.googleSearch}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Google Search
                  </label>
                </Col>
              </Row>
              <Row>
                <Col sm={3} md={2}>
                  <label htmlFor="mail">
                    <input
                      type="checkbox"
                      id="mail"
                      name="mail"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.mail}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Mail
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="sms">
                    <input
                      type="checkbox"
                      id="sms"
                      name="sms"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.sms}
                      onChange={handleCheckboxChange}
                    />{" "}
                    SMS
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="callLetter">
                    <input
                      type="checkbox"
                      id="callLetter"
                      name="callLetter"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.callLetter}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Call Letter
                  </label>
                </Col>
                <Col sm={3} md={2}>
                  <label htmlFor="hoarding">
                    <input
                      type="checkbox"
                      id="hoarding"
                      name="hoarding"
                      className="mx-1"
                      checked={formData.instituteKnownFrom.hoarding}
                      onChange={handleCheckboxChange}
                    />{" "}
                    Hoarding
                  </label>
                </Col>
              </Row>
              <h4 className="bg-warning px-2 mt-4">Terms And Conditions </h4>
              <ul>
                <li>
                  Admission will be made only after completion of written test,
                  group discussion and interview
                </li>
                <li>
                  Payment of fees should be made on or before the prescribed
                  dates notified by the authority failing which admission will
                  be forfeited
                </li>
                <li>
                  Amount once paid towards admission/program fees is neither
                  refundable nor transferable under any circumstances
                </li>
                <li>
                  All candidates are required and expected to follow the code of
                  conduct, rules and regulations of the Institution in force
                  from time to time
                </li>
                <li>
                  Any act of academic dishonesty, misconduct, indiscipline,
                  violence or damage caused to people/property of HIMADRI by any
                  students will be considered/treated as an offence against the
                  Institute and such student will be expelled from HIMADRI
                </li>
                <li>
                  The candidate must fulfill all academic requirements notified
                  by the Institution authorities from time to time{" "}
                </li>
                <li>
                  Misleading information or misrepresented facts will disqualify
                  the applicant from admission into HIMADRI
                </li>
                <li>
                  {" "}
                  HIMADRI reserves the right to amend the rules at any given point
                  of time.
                </li>
                <li>
                  {" "}
                  In case of discontinuation of course in between under any
                  circumstances, the student will have to pay all the semester
                  fees.
                </li>
                <li>
                  HIMADRI has the sole discretion to alter or change the venue of
                  test centre, dates of written test, group discussion and
                  personal interview and patter of the admission process without
                  any prior notice or approval
                </li>
                <li>
                  Junsdiction for all disputes (if any) relating to the HIMADRI is
                  Kalyani, Nadia, West Bengal, India
                </li>
              </ul>
              <h4 className="bg-warning px-2 mt-4">Declaration </h4>
              <Row className="my-2">
                <Col sm={6} className="position-relative">
                  <label htmlFor="admitCard">
                    Admit Card:
                    <input
                      type="file"
                      id="admitCard"
                      className="image-choose"
                      name="admitCard"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
                <Col className="position-relative">
                  <label htmlFor="10thMarksheet">
                    10th Marksheet:
                    <input
                      type="file"
                      id="tenthMarksheet"
                      className="image-choose"
                      name="tenthMarksheet"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
              </Row>
              <Row className="my-2">
                <Col sm={6} className="position-relative">
                  <label htmlFor="twelfthMarksheet">
                    Twelfth Marksheet :
                    <input
                      type="file"
                      id="twelfthMarksheet"
                      className="image-choose"
                      name="twelfthMarksheet"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
                <Col className="position-relative">
                  <label htmlFor="graduationMarksheet">
                    Graduation Marksheet:
                    <input
                      type="file"
                      id="graduationMarksheet"
                      className="image-choose"
                      name="graduationMarksheet"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
              </Row>
              <Row className="my-2">
                <Col sm={6} className="position-relative">
                  <label htmlFor="postGraduateMarksheet">
                    Post graduate Marksheet:
                    <input
                      type="file"
                      id="postGraduateMarksheet"
                      className="image-choose"
                      name="postGraduateMarksheet"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
                <Col className="position-relative">
                  <label htmlFor="professionalCourseMarksheet">
                    Professional Course:
                    <input
                      type="file"
                      id="professionalCourseMarksheet"
                      className="image-choose"
                      name="professionalCourseMarksheet"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
              </Row>
              <Row className="my-2">
                <Col className="position-relative">
                  <label htmlFor="adharCard">
                    Aadhaar Card:
                    <input
                      type="file"
                      id="adharCard"
                      className="image-choose"
                      name="adharCard"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </Col>
                <Col sm={6} className="position-relative">
                  <label htmlFor="slc">
                    SLC:
                    <input
                      type="file"
                      id="slc"
                      className="image-choose"
                      name="slc"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
              </Row>
              <Row className="my-2">
                <Col sm={6} className="position-relative">
                  <label htmlFor="castcertificate">
                    Cast Certificate :
                    <input
                      type="file"
                      id="castcertificate"
                      className="image-choose"
                      name="castcertificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </Col>
                <Col className="position-relative">
                  <label htmlFor="guardiansAdharCard">
                    Guardians adhar Card:
                    <input
                      type="file"
                      id="guardiansAdharCard"
                      className="image-choose"
                      name="guardiansAdharCard"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </Col>
              </Row>
              <Row sm={6} className="mt-4">
                <Col className="w-100">
                  <p className="fw-bold">
                    Declaration : I hereby declare that, aii the statements
                    furnished by me, in the Application From, is true to the
                    best of my knowladge. I had gone through all the Rules,
                    Regulations & Teaching Methodology of the Institute and
                    affirming and to abide by all of them.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <label htmlFor="postOffice">Place </label>
                </Col>
                <Col sm={4}>
                  <input
                    type="text"
                    id="declarationPlace"
                    name="declarationPlace"
                    className="w-100 my-1"
                    value={formData.declarationPlace}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col sm={1}>
                  <label htmlFor="dob">Date </label>
                </Col>
                <Col sm={2}>
                  <input
                    type="date"
                    id="declarationDate"
                    name="declarationDate"
                    value={formData.declarationDate}
                    className="w-100 my-1"
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="position-relative">
                  <label htmlFor="district">Students Signature: </label>
                  <br />
                  <input
                    type="file"
                    id="studentSignature"
                    name="studentSignature"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </Col>
                <Col sm={6} md={3}>
                  <label htmlFor="pin">Parents Signature: </label>
                  <br />
                  <input
                    type="file"
                    id="parentSignature"
                    name="parentSignature"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </Col>
              </Row>
              <Row className="my-4">
                {!previewMode && (
                  <Col className="d-flex justify-content-center my-4">
                    {/* <ReCAPTCHA
                      sitekey={process.env.REACT_APP_GCAPTCHA_SITE_KEY}
                      onChange={handleCaptchaChange}
                    /> */}
                  </Col>
                )}
              </Row>
              <Row className="my-4">
                {!previewMode && (
                  <Col className="d-flex justify-content-center my-4">
                    <Button type="submit" variant="primary">
                      Proceed
                    </Button>
                  </Col>
                )}
              </Row>
            </form>
          )}

          {isPrintable && (
            <Button
              onClick={() => {
                window.print();
              }}
              variant="primary"
              className="me-2"
            >
              Print
            </Button>
          )}

          {!isPrintable && previewMode && (
            <Row className="my-4">
              <Col className="d-flex justify-content-between">
                <Button
                  onClick={() => {
                    setPreviewMode(false);
                  }}
                  variant="primary"
                  className="me-2"
                >
                  Edit Details (back to previous page)
                </Button>
                <Button
                  onClick={handleSaveToDb}
                  variant="success"
                  className="me-2"
                >
                  Submit Form (must check before proceed)
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </>
  );
};

export default AdmissionForm;
