import './App.css';
import AdmissionForm from './Pages/AdmissionForm';
import Home from './Pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Public from './layout/Public';
import Courses from './Pages/Courses';
import Events from './Pages/Events';
import SubmissionSuccess from './Pages/SubmissionSuccess';
import AboutUs from './Pages/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Public><Home /></Public>} />
        <Route path='/courses' element={<Public><Courses /></Public>} />
        <Route path='/about' element={<Public><AboutUs /></Public>} />
        <Route path='/events' element={<Public><Events /></Public>} />
        <Route path='/admissionForm' element={<AdmissionForm />} />
        <Route path='/admissionForm/submissionSuccess' element={<Public><SubmissionSuccess /></Public>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
