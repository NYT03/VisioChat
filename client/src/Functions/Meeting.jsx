import axios from "axios";
import { queryString } from 'query-string';
export const getStreamUtil = async ({
  cameraPermission,
  micPermission,
  selectedVideoDeviceId,
  selectedAudioDeviceId,
  setStream
}) => {
  try {
    if (!cameraPermission && !micPermission) {
      setStream(null);
      return;
    }

    const constraints = {};
    
    if (cameraPermission) {
      constraints.video = selectedVideoDeviceId 
        ? { deviceId: selectedVideoDeviceId }
        : true;
    }
    
    if (micPermission) {
      constraints.audio = selectedAudioDeviceId 
        ? { deviceId: selectedAudioDeviceId }
        : true;
    }

    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    setStream(mediaStream);
  } catch (err) {
    console.error("Error accessing media devices: ", err);
    if (err.name === "OverconstrainedError") {
      try {
        const fallbackConstraints = {
          video: cameraPermission,
          audio: micPermission
        };
        const fallbackStream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
        setStream(fallbackStream);
      } catch (fallbackErr) {
        console.error("Fallback stream error:", fallbackErr);
      }
    }
  }
};

export const getDevices = async ({ setVideoDeviceList, setAudioDeviceList, setSelectedVideoDeviceId, setSelectedAudioDeviceId }) => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    
    const videoDevices = devices.filter(device => device.kind === "videoinput");
    setVideoDeviceList(videoDevices);
    if (videoDevices.length > 0) {
      setSelectedVideoDeviceId(videoDevices[0].deviceId);
    }
    
    const audioDevices = devices.filter(device => device.kind === "audioinput");
    setAudioDeviceList(audioDevices);
    if (audioDevices.length > 0) {
      setSelectedAudioDeviceId(audioDevices[0].deviceId);
    }
  } catch (error) {
    console.error("Error enumerating devices:", error);
  }
};

export const requestMicPermission = async ({ micPermission, setMicPermission }) => {
  if (!micPermission) {
    try {
      setMicPermission(true);
    } catch (err) {
      console.log("Error accessing mic: ", err);
    }
  } else {
    setMicPermission(false);
  }
};

export const requestCameraPermission = async ({ cameraPermission, setCameraPermission }) => {
  if (!cameraPermission) {
    try {
      setCameraPermission(true);
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  } else {
    setCameraPermission(false);
  }
};

export const askPermission = async ({ type, micPermission, setMicPermission, cameraPermission, setCameraPermission }) => {
  if (type === "mic") {
    console.log("mic requested");
    await requestMicPermission({ micPermission, setMicPermission });
  } else if (type === "camera") {
    console.log("camera requested");
    await requestCameraPermission({ cameraPermission, setCameraPermission });
  } else {
    console.log("notho");
  }
};

export const endCall = async ({ navigate, setCameraPermission, setMicPermission, stream }) => {
  try {
    // Stop all tracks first
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    const queryParams = queryString.parse(window.location.search);
    console.log(queryParams);
    const meetingId = queryParams.meetingId;
    console.log(meetingId);
    
    if (!meetingId) {
      console.error("No meeting ID found");
      return;
    }

    // Delete the meeting from the server
    await axios.delete(`http://localhost:3000/newmeeting/${meetingId}`);
    
    // Reset permissions
    setCameraPermission(false);
    setMicPermission(false);
    
    // Navigate to end meeting page
    navigate("/endmeeting");
  } catch (error) {
    console.error("Error ending the meeting:", error);
    // Still reset permissions and navigate even if server request fails
    setCameraPermission(false);
    setMicPermission(false);
    navigate("/endmeeting");
  }
};
