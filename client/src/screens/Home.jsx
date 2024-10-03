
import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";


function Home() {

  const meetingcode=useRef();
  const navigate = useNavigate();
  function newMeeting() {
    axios.get('http://localhost:3000/newmeeting')
      .then(response => {
        const meetingId = response.data.meetingId;
        if (meetingId) {
          navigate(`/newmeeting/${meetingId}`); // Use template literal for route path
        } else {
          console.error('Meeting ID not found in response data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle network errors or server errors here (optional)
      });
  }
  function joinmeeting(){
    axios.get(`http://localhost:3000/newmeeting/meetingId=${meetingcode}`)
    .then(res=>{
      console.log(res)
      if(res.data.Status===1){
        console.log(meetingcode.current)
        navigate(`/newmeeting/${meetingcode.current}`)
      }
      else{
        console.error("Invalid Meeting code")
      }
    }
    )
  }
  return (
    <div className=" bg-slate-800 text-white min-h-screen">
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
      <main>
        <div className="flex flex-row">
          <div className="flex flex-col justify-center items-start text-5xl mt max-h-fit ">
            <p className="flex ml-8 mt-5 flex-wrap w-3/4">
              Video calls and meeting for everyone
            </p>
            <p className="flex ml-8 mt-6 flex-wrap text-xl w-2/3">
              Connect,colaborate and celebrate from anywhere with Google meet
            </p>
            <div className="flex flex-row justify-center items-center gap-10 mt-6">
              <button className="flex ml-8 p-2 rounded-md items-center justify-center flex-wrap text-xl w-/3 border-2 bg-blue-800" onClick={newMeeting}>
                New Meeting
              </button>
              <div className="flex items-center flex-row border focus:outline rounded-md focus:outline-black p-1">
              <span className="material-symbols-rounded flex justify-normal items-center ml-2 mr-2 focus:fill-none">keyboard</span>
              <input className="w-56 h-10 text-lg  p-1 fill-none bg-transparent outline-none rounded-lg text-white meetingmeetingcode" id="meetingmeetingcode" value={meetingcode.current}/>
              </div>
              <button className=" text-2xl bg-slate-100 text-black p-1  pl-4 pr-4 rounded-sm hover:text-white hover:bg-gray-600" onClick={joinmeeting} >Join</button>
            </div>
          </div>
            <Card/>
        </div>
      </main>
    </div>
  );
}

export default Home;