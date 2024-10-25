// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import LoginPage from './components/LoginPage'; 
// import SignupPage from './components/SignupPage'; 
// import AttendanceApp from './AttendanceApp/AttendanceApp'; 
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
   
//           <Route path="/login" element={<LoginPage />} />

//           <Route path="/signup" element={<SignupPage />} />
          


//           <Route path="/attendance" element={<AttendanceApp />} />
          
         
//           <Route path="/" element={<LoginPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './components/LoginPage'; 
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPassword'; 
import AttendanceApp from './AttendanceApp/AttendanceApp'; // Import AttendanceApp
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import VerifyEmail from './components/VerifyEmail';
import { useDispatch } from 'react-redux';
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = JSON.parse(localStorage.getItem("token"))
  //     dispatch(getUserDetails(token, navigate))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  return (
   
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/attendance" element={<AttendanceApp />} /> {/* Attendance App route */}
          <Route
          path="verify-email"
          element={
            
              <VerifyEmail />
            
          }
        />
        <Route
          path="forgot-password"
          element={
           
              <ForgotPassword />
           
          }
        />
         <Route
          path="update-password/:id"
          element={
            
              <UpdatePassword />
        
          }
        />
          <Route path="/" element={<LoginPage />} /> {/*Default route*/}
        </Routes>
      </div>
  
  );
}

export default App;

