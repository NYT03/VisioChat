import { useState } from "react";
import { useNavigate } from "react-router-dom";
const imagePaths = {
  userEduGetALink:
    "./src/assets/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg",
  userEduSafety:
    "./src/assets/user_edu_safety_light_e04a2bbb449524ef7e49ea36d5f25b65.svg",
  userEduScheduling:
    "./src/assets/user_edu_scheduling_light_b352efa017e4f8f1ffda43e847820322.svg",
};
const imagetext={
  image1:"Collorate with other people",
  image2:"Safe and secure",
  image3:"Schedual meeting for later"
}
function Home() {
  const navigate = useNavigate();
  const [currentSvg, setCurrentSvg] = useState(imagePaths.userEduGetALink);
  const [text,settext]=useState(imagetext.image1);
  function inc() {
    setCurrentSvg(
      currentSvg === imagePaths.userEduGetALink
        ? imagePaths.userEduSafety
        : currentSvg === imagePaths.userEduSafety
        ? imagePaths.userEduScheduling
        : imagePaths.userEduGetALink
    );
    settext(
      text === imagetext.image1
        ? imagetext.image2
        : text === imagetext.image2
        ? imagetext.image3
        : imagetext.image1
    );
  }

  function dec() {
    setCurrentSvg(
      currentSvg === imagePaths.userEduGetALink
        ? imagePaths.userEduScheduling
        : currentSvg === imagePaths.userEduSafety
        ? imagePaths.userEduGetALink
        : imagePaths.userEduSafety
    );
    settext(
      text === imagetext.image1
        ? imagetext.image3
        : text === imagetext.image2
        ? imagetext.image1
        : imagetext.image2
    );
  }
  function newMeeting() {
    fetch('http://localhost:3000/newmeeting')
      .then(response => response.json())
      .then(response => {console.log(response); navigate(`http://localhost:5173/newmeeting/${response.meetingId}`); })
      .catch(error => console.error('Error:', error));
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
          <b>Google</b>
          <span>Meet</span>
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
              <span className="material-symbols-rounded flex justify-normal items-center ml-2 mr-2">keyboard</span>
              <input className="w-56 h-10 text-lg  p-1 fill-none bg-transparent outline-none rounded-lg text-white" id="meetingCode" />
              </div>
              <button className=" text-2xl bg-slate-100 text-black p-1  pl-4 pr-4 rounded-sm hover:text-white hover:bg-gray-600">Join</button>
            </div>
          </div>
          <div className="ml-16 flex flex-row justify-center items-center mt-24 gap-4">
            <button
              className="hover:bg-gray-100 rounded-3xl min-w-10 min-h-10 flex justify-center items-center hover:text-black"
              onClick={dec}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <div className="flex flex-col justify-center items-center gap-10">
              <img src={currentSvg} className=" justify-center ease-in-out delay-1000" />
              <p className=" text-2xl">{text}</p>
              </div>
            <button
              className="hover:bg-gray-100 rounded-3xl min-w-10 min-h-10 flex justify-center items-center hover:text-black"
              onClick={inc}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;