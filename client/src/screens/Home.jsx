import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useSocket } from "../context/Socket";
import { useUserContext } from "../context/UserContext";

function Home() {
  const { socket } = useSocket();
  const { user } = useUserContext();
  const { currentUser, setCurrentUser } = user;
  const meetingcode = useRef(); // Create ref for the input field
  const navigate = useNavigate();

  function newMeeting() {
    axios.get("http://localhost:3000/newmeeting")
      .then((response) => {
        const meetingId = response.data.meetingId;
        if (meetingId) {
          navigate(`/newmeeting/${meetingId}`); // Use template literal for route path
        } else {
          console.error("Meeting ID not found in response data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle network errors or server errors here (optional)
      });
  }


  function joinmeeting() {
    const meetingId = meetingcode.current.value; // Access the input value using ref
    // console.log(meetingId);

    if (!meetingId) {
      console.error("Meeting code is required");
      return;
    }

    
    socket.emit("join-room", { roomId: meetingId, email: currentUser.email });
    axios.get(`http://localhost:3000/newmeeting/meetingId=${meetingId}`)
    .then((res) => {
      console.log(res);
      if (res.data.Status === 1) {
        // socket.emit("join-room", { roomId: meetingId, email: currentUser.email });
          navigate(`/newmeeting/${meetingId}`);
        } else {
          console.error("Invalid Meeting code");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="bg-slate-800 text-white min-h-screen">
      <nav className="flex justify-start">
        <img
          src="../src/assets/VisioChat logo.svg"
          className="m-3 w-16 border rounded-lg "
          alt="logo"
        />
        <p className="flex jus item-center justify-center mt-7 text-3xl break-words space-x-3">
          <Link to={"/"}>
            <b>Visio</b>
            <span>chat</span>
          </Link>
        </p>
      </nav>
      <main>
        <div className="flex flex-row">
          <div className="flex flex-col justify-center items-start text-5xl mt max-h-fit ">
            <p className="flex ml-8 mt-32 flex-wrap w-3/4">
              Video calls and meeting for everyone
            </p>
            <p className="flex ml-8 mt-6 flex-wrap text-xl w-2/3">
              Connect, collaborate, and celebrate from anywhere with Google meet
            </p>
            <div className="flex flex-row justify-center items-center gap-10 mt-6">
              <button
                className="flex ml-8 p-2 rounded-md items-center justify-center flex-wrap text-[1.5vw] w-/3 border-2 bg-blue-800"
                onClick={newMeeting}
              >
                New Meeting
              </button>
              <div className="flex items-center flex-row border focus:outline rounded-md focus:outline-black p-1">
                <span className="material-symbols-rounded flex justify-normal items-center ml-2 mr-2 focus:fill-none">keyboard</span>
                <input
                  ref={meetingcode} // Attach ref here
                  className="w-56 h-10 text-lg p-1 fill-none bg-transparent outline-none rounded-lg text-white meetingmeetingcode"
                  id="meetingmeetingcode"
                  placeholder="Enter Meeting Code"
                />
              </div>
              <button
                className="text-2xl bg-slate-100 text-black p-1 pl-4 pr-4 rounded-sm hover:text-white hover:bg-gray-600"
                onClick={joinmeeting}
              >
                Join
              </button>
            </div>
          </div>
          <Card />
        </div>
      </main>
    </div>
  );
}

export default Home;
