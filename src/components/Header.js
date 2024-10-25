// import React from 'react';
// import './Header.css'; 

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo">
    
//         <img src="/WhatsApp Image 2024-10-14 at 00.33.18_165e48a8.jpg" alt="Institute of Engineering and Technology" />
//       </div>
//       <div className="title">
//         <h1>Institute of Engineering and Technology</h1>
//         <p>देवी अहिल्या विश्वविद्यालय</p>
//       </div>
      
//     </header>
//   );
// };

// export default Header;


import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/WhatsApp Image 2024-10-14 at 00.33.18_165e48a8.jpg" alt="Institute of Engineering and Technology" />
      </div>
      <div className="title">
        <h1>Institute of Engineering and Technology</h1>
        <p>देवी अहिल्या विश्वविद्यालय</p>
      </div>
      <nav>
        <Link to="/attendance" className="home-link">Home</Link> {/* Add Home Link */}
      </nav>
    </header>
  );
};

export default Header;
