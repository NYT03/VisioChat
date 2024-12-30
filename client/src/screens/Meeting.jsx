import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import "../css/Meeting.css";
import {
  askPermission,
  endCall,
  getDevices,
  getStreamUtil,
} from "../Functions/Meeting";

function Meeting() {
  const [date, setdate] = useState(new Date());
  const [micPermission, setMicPermission] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [stream, setStream] = useState("");
  const [videoDeviceList, setVideoDeviceList] = useState([]);
  const [AudioDeviceList, setAudioDeviceList] = useState([]);
  const [selectedVideoDeviceId, setSelectedVideoDeviceId] = useState("");
  const [selectedAudioDeviceId, setSelectedAudioDeviceId] = useState("");
  const navigate = useNavigate();
  const [isMicSelectVisible, setIsMicSelectVisible] = useState(false);
  const [isCameraSelectVisible, setIsCameraSelectVisible] = useState(false);

  const toggleMicSelectVisibility = () =>
    setIsMicSelectVisible(!isMicSelectVisible);
  const toggleCameraSelectVisibility = () =>
    setIsCameraSelectVisible(!isCameraSelectVisible);

  useEffect(() => {
    const intervalId = setInterval(() => setdate(new Date()), 59000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getDevices({
      setVideoDeviceList,
      setAudioDeviceList,
      setSelectedVideoDeviceId,
      setSelectedAudioDeviceId,
    });
  }, []);

  const getStream = useCallback(async () => {
    await getStreamUtil({
      cameraPermission,
      micPermission,
      selectedVideoDeviceId,
      selectedAudioDeviceId,
      setStream,
    });
  }, [
    selectedVideoDeviceId,
    selectedAudioDeviceId,
    cameraPermission,
    micPermission,
  ]);

  useCallback(() => {
    getStream();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  },[getStream,stream]);

  const handlePermission = async (type) => {
    await askPermission({
      type,
      micPermission,
      setMicPermission,
      cameraPermission,
      setCameraPermission,
    });
  };
  const handleEndCall =useCallback(async () => {
    await endCall({
      navigate, 
      setCameraPermission, 
      setMicPermission,
      stream 
    });
  },[navigate, setCameraPermission, setMicPermission, stream]);

  const showtime = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <main className="flex flex-col h-screen">
      <div className="flex-grow h-[100%]">
        <div className="flex justify-center  h-[90%] m-8 mb-0 bg-slate-700 rounded-md">
          {cameraPermission ? (
            <ReactPlayer
              className="profile rounded-md"
              // autoPlay
              playing
              playsInline
              muted={!micPermission}
              url={stream}
            />
          ) : (
            <img
              srcSet="/src/assets/images/profile.png"
              className="profile"
              alt="React Logo"
            />
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between items-center min-h-18 bg-black text-white p-4 sticky bottom-0">
        <p>{showtime}</p>
        <div className="grid grid-flow-col col-auto items-center gap-4 buttom">
          <div
            className="bg-slate-500 rounded-full gap-3 w-auto mic relative"
            id="mic"
          >
            {isMicSelectVisible && (
              <div className="absolute bg-slate-500 rounded-md p-2 w-auto min-w-12 bottom-full text-auto text-nowrap mb-2 z-50">
                <div className="flex flex-col gap-2">
                  {AudioDeviceList.map((device) => (
                    <button
                      key={device.deviceId}
                      className={`text-left p-2 hover:bg-slate-600 rounded ${
                        selectedAudioDeviceId === device.deviceId
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedAudioDeviceId(device.deviceId);
                        toggleMicSelectVisibility();
                      }}
                    >
                      {device.label || "Microphone"}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => {
                if (isCameraSelectVisible) {
                  toggleCameraSelectVisibility();
                }
                toggleMicSelectVisibility();
              }}
            >
              <span className="material-symbols-rounded ml-1">
                keyboard_arrow_up
              </span>
            </button>
            <button
              onClick={() => {
                handlePermission("mic");
              }}
            >
              <span className="material-symbols-rounded rounded-full bg-slate-700 p-2 mt-0 mb-0 ml-2">
                mic
              </span>
            </button>
          </div>
          <div
            className="bg-slate-500 rounded-full gap-3  w-auto  video relative"
            id="camera"
          >
            <button
              onClick={() => {
                if (isMicSelectVisible) {
                  toggleMicSelectVisibility();
                }
                toggleCameraSelectVisibility();
              }}
            >
              <span className="material-symbols-rounded ml-1">
                keyboard_arrow_up
              </span>
            </button>
            {isCameraSelectVisible && (
              <div className="absolute bg-slate-500 rounded-md p-2 w-auto min-w-12 bottom-full text-auto text-nowrap mb-2 z-50">
                <div className="flex flex-col gap-2">
                  {videoDeviceList.map((device) => (
                    <button
                      key={device.deviceId}
                      className={`text-left p-2 hover:bg-slate-600 rounded ${
                        selectedVideoDeviceId === device.deviceId
                          ? "bg-slate-600 text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedVideoDeviceId(device.deviceId);
                        toggleCameraSelectVisibility();
                      }}
                    >
                      {device.label || "Camera"}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() => {
                handlePermission("camera");
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
              onClick={handleEndCall}
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
