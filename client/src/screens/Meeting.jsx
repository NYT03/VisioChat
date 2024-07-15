import axios from "axios";
import "../css/Meeting.css";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
function Meeting() {
  const [date, setdate] = useState(new Date());
  const navigate=useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setdate(new Date());
    }, 60000);
  
    return () => clearInterval(intervalId);
  },[]);
  function endCall(){
    const queryParams = new URLSearchParams(window.location.search);
    const value = queryParams.get('meetingId'); 
    axios.delete(`http://localhost:3000/newmeeting/${value}`).then(
      navigate('/endmeeting')
    ).catch(
      console.error("Error leaving the meeting")
    )
  }
  const showtime=`${date.getHours()}:${date.getMinutes()}`;
  return (
    <main className="flex justify-center flex-col h-screen">
      <div className="flex justify-center m-8 bg-slate-700 max:h-screen rounded-md">
        <img
          src="\src\\assets\\images\\Screenshot 2024-06-29 180710.png"
          className="profile"
        />
      </div>
      <div className="flex flex-row justify-between align-bottom mt-12 items-center min-h-18 max-h-full bg-black   text-white p-4">
        <p>{showtime}</p>
        <div className="grid grid-flow-col col-auto items-center gap-4 buttom">
          <div
            className="bg-slate-500 rounded-full gap-3 w-auto mic"
            id="mic"
          >
            <button><span className="material-symbols-rounded ml-1">keyboard_arrow_up</span></button>
            <button><span className="material-symbols-rounded rounded-full bg-slate-700 p-2 mt-0 mb-0 ml-2">
              mic
            </span></button>
          </div>
          <div
            className="bg-slate-500 rounded-full gap-3 w-auto video"
            id="camera"
          >
            <button><span className="material-symbols-rounded ml-1">keyboard_arrow_up</span></button>
            <button><span className="material-symbols-rounded rounded-full bg-slate-700 p-2 mt-0 mb-0 ml-2">
              videocam
            </span></button>
          </div>
          <button><span className="material-symbols-rounded" id="buttom">closed_caption</span></button>
          <button><span className="material-symbols-rounded" id="buttom">mood</span></button>
          <button><span className="material-symbols-rounded" id="buttom">screen_share</span></button>
          <button><span className="material-symbols-rounded" id="buttom">back_hand</span></button>
          <button><span className="material-symbols-rounded" id="buttom">more_vert</span></button>
          <button><span className="material-symbols-rounded bg-red-600 rounded-full pr-2 pl-2 pt-1 pb-1 text-center" id="buttom" onClick={endCall}>call_end</span></button>
        </div>
        <div className="grid grid-flow-col col-auto items-center gap-2 buttom">
        <button><span className="material-symbols-rounded" id="buttom">info</span></button>
        <button><span className="material-symbols-rounded" id="buttom">group</span></button>
        <button><span className="material-symbols-rounded" id="buttom">chat</span></button>
        <button><span className="material-symbols-rounded" id="buttom">hand_gesture</span></button>
        </div>
      </div>
    </main>
  );
}

export default Meeting;
