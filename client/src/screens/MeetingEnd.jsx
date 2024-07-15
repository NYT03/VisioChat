import { useState } from 'react';
import { Link } from "react-router-dom";
function MeetingEnd() {
    const [time,setlefttime]=useState(30);
  return (
    <div className='bg-slate-800 text-white min-h-screen'>
        <nav className="flex justify-start">
        <img
          src="../src/assets/google-meet.svg"
          className="scale-75"
          alt="logo"
        />
        <p className="flex jus item-center justify-center mt-7 text-3xl break-words space-x-3">
          <Link to={"/"}><b>Google</b>
          <span>Meet</span></Link>
        </p>
      </nav>
    </div>
  )
}

export default MeetingEnd;