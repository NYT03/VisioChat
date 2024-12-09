import axios from "axios";
import { useEffect, useRef, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Meeting.css";
function Meeting() {
  const [date, setdate] = useState(new Date());
  const [micPermission, setMicPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const videoRef = useRef(null);
  const webcamRef=useRef(null);
  const navigate = useNavigate();
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setdate(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId); // Default to the first camera
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const requestMicPermission = async () => {
    if(!micPermission){
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
      stream.getTracks().forEach((track) => track.stop()); // Stop the stream immediately
    } catch (err) {
      setMicPermission(false);
      // setMicError('Microphone permission denied or error occurred: ' + err.message);
    }
  }
  else{
    setMicPermission(false);
  }
  };
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );
  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    videoRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    videoRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    videoRef.current.start();
  }, [webcamRef,handleDataAvailable,setCapturing, videoRef]);

  const handleStopCaptureClick = useCallback(() => {
    videoRef.current.stop();
    setCapturing(false);
  }, [videoRef,setCapturing]);

  const requestCameraPermission = async () => {
    if(!cameraPermission){
  try {
    setCameraPermission(true);
    handleStartCaptureClick()
  } catch (err) {
    console.error("Error accessing camera: ", err);
    setCameraPermission(false);
  }}
  else{
    handleStopCaptureClick()
    setCameraPermission(false);
  }
};

  const askpermission = async (type) => {
    if (type === "mic") {
      console.log("mic requested");
      await requestMicPermission();
    } else if (type === "camera") {
      console.log("camera requested");
      await requestCameraPermission();
    } else {
      console.log("notho");
    }
  };
  const showtime = `${date.getHours()}:${date.getMinutes()}`;

  const endCall = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const value = queryParams.get("meetingId");
    axios
      .delete(`http://localhost:3000/newmeeting/${value}`)
      .then(() => navigate("/endmeeting"))
      .catch(() => console.error("Error leaving the meeting"))
      .finally(() => {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
        }
        setCameraPermission(false);
        setMicPermission(false);
      });
      
  };
  return (
    <main className="flex justify-center flex-col h-screen">
      <div className="flex justify-center m-8 bg-slate-700 max:h-screen rounded-md">
        {cameraPermission ? (
          <video ref={videoRef} src={videoRef} autoPlay playsInline className="profile" />
        ) : (
          <img
            srcSet="src/assets/images/profile.png"
            className="profile"
            alt="React Logo"
          />
        )}
      </div>
      <div className="flex flex-row justify-between align-bottom mt-12 items-center min-h-18 max-h-full bg-black   text-white p-4">
        <p>{showtime}</p>
        <div className="grid grid-flow-col col-auto items-center gap-4 buttom">
          <div className="bg-slate-500 rounded-full gap-3 w-auto mic" id="mic">
            <button>
              <span className="material-symbols-rounded ml-1">
                keyboard_arrow_up
              </span>
            </button>
            <button
              onClick={() => {
                askpermission("mic");
              }}
            >
              <span className="material-symbols-rounded rounded-full bg-slate-700 p-2 mt-0 mb-0 ml-2">
                mic
              </span>
            </button>
          </div>
          <div
            className="bg-slate-500 rounded-full gap-3 w-auto video"
            id="camera"
          >
            <button>
              <span className="material-symbols-rounded ml-1">
                keyboard_arrow_up
              </span>
            </button>
            <button
              onClick={() => {
                askpermission("camera");
              }}
            >
              <span className="material-symbols-rounded rounded-full bg-slate-700 p-2 mt-0 mb-0 ml-2">
                videocam
              </span>
            </button>
          </div>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              closed_caption
            </span>
          </button>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              mood
            </span>
          </button>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              screen_share
            </span>
          </button>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              back_hand
            </span>
          </button>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              more_vert
            </span>
          </button>
          <button>
            <span
              className="material-symbols-rounded bg-red-600 rounded-full pr-2 pl-2 pt-1 pb-1 text-center"
              id="buttom"
              onClick={endCall}
            >
              call_end
            </span>
          </button>
        </div>
        <div className="grid grid-flow-col col-auto items-center gap-2 buttom">
          <button>
            <span className="material-symbols-rounded" id="buttom">
              info
            </span>
          </button>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              group
            </span>
          </button>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              chat
            </span>
          </button>
          <button>
            <span className="material-symbols-rounded" id="buttom">
              hand_gesture
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default Meeting;
