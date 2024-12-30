const mongoose  = require('mongoose');
const model=require("../models/Meeting.js")
const { Server } = require("socket.io");
const io = new Server({ cors: true });
const EmailToSocketmap = new Map();
const SocketToEmailmap = new Map();



io.on("connection", (socket) => {
  HandleEncomingSocket(socket)
  console.log("new connection");
});


function HandleEncomingSocket(socket) {
  socket.on("join-room", (data) => {
    const { email, roomId } = data;
    console.log("User", { email }, "joined", { roomId });
    EmailToSocketmap.set(email, socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user joined", { email });
  });
}

async function CreatenewMeeting(req,res){
    try {
        const meetingId = await generateMeetingId();
        console.log(meetingId);
        res.status(200).json({ "meetingId":meetingId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

const generateMeetingId = async () => {
    let meetingCode;
    let isCodeAvailable;
    do {
      meetingCode = Math.floor(Math.random() * 100000000);
      isCodeAvailable = await checkCodeAvailability(meetingCode);
      if (!isCodeAvailable) {
        await insertMeetingCode(meetingCode);
      }
    } while (isCodeAvailable);
    return meetingCode;
  };
  
  const checkCodeAvailability = async (meetingCode) => {
    const existingCode = await model.findOne({meetingCode});
    return existingCode !== null; // True if code exists, False otherwise
  };
  
  const insertMeetingCode = async (meetingCode) => {
    await model.create({ "meetingId":meetingCode });
  };

  const joinMeeting=async (req,res)=>{
    const meetingCode=req.params.meetingId;
    try{
      await model.findOne(meetingCode).then(ressult=>
      {
        if(ressult!==null){
          console.log("Done")
          res.status(200).json({"Status":1})
          return
        }
        else{
          res.status(404).json({ "error": "Invalid Meeting code" })
        }
      })
    }
    catch{
      res.status(500).json({ "error": "Error" })
    }
  }
  const endMeeting=async (req,res)=>{
    try{
      model.deleteOne(req.params.meetingId).then(
        console.log("Done")
      ).then(
        res.status(200).json({"Status":1})
      )
    }
    catch{
      res.status(500).json({ error: err.message })
    }
  }
module.exports={
  CreatenewMeeting,joinMeeting,endMeeting
}
io.listen((3001));
