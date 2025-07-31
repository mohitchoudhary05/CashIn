import React from 'react';
import '../styles/ShowProfile.css';
import { FaUserTie } from "react-icons/fa6";

function ShowProfile({name, email }) {
  return (
    <div className='Profile-Container'>
      <div className='profile-content'>
        <div className='profile-image'>
          <FaUserTie size={24} color='blue'/>
        </div>
        <div className='profile-details'>
          <h2>{name || "Your Name"}</h2>
          <p>{email || "your.email@example.com"}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowProfile;
