import Nav from "../components/Nav";
import ShowProfile from "../components/ShowProfile";
import { IoIosArrowForward } from "react-icons/io";
export default function Profile({ onLogout }) {
  const name = JSON.parse(localStorage.getItem("user"))
  const email = JSON.parse(localStorage.getItem("user"))
  return (
    <div>
      {/* <Nav name = "Profile"/> */}
      <ShowProfile name={name.name} email={email.email} />

<div className="profile-option-cont"> 
  <p>Transaction History</p>
<IoIosArrowForward color="black" size={18} />
</div>
<div className="profile-option-cont"> 
  <p>Change Password</p>
<IoIosArrowForward color="black" size={18} />
</div>
<div className="profile-option-cont"> 
  <p>Terms And Conditions</p>
<IoIosArrowForward color="black" size={18} />
</div>
<div className="profile-option-cont"> 
  <p>Contact Us</p>
<IoIosArrowForward color="black" size={18} />
</div>
<div className="profile-option-cont" onClick={onLogout}> 
  <p>LogOut</p>
<IoIosArrowForward color="black" size={18} />
</div>

    </div>
  );
}




{/* <button onClick={onLogout}>Log Out</button> */}