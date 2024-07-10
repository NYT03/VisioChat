async function CreatenewMeeting(req,res){
    try {
        const meetingId = await generateMeetingId();
        res.json({ "meetingId":meetingId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}
const generateMeetingId = async () => {
    connectDB();
    let meetingCode;
    let isCodeAvailable;
    do {
      meetingCode = Math.floor(Math.random() * 100000000);
      isCodeAvailable = await checkCodeAvailability(meetingCode);
      if (!isCodeAvailable) {
        await insertMeetingCode(meetingCode);
      }
    } while (isCodeAvailable);
    await disconnectDB()
    return meetingCode;
  };
  
  const checkCodeAvailability = async (meetingCode) => {
    const db=client.db('Gmeet')
    const codesCollection = db.collection("meetingCodes");
    const existingCode = await codesCollection.findOne({ meetingCode });
    return existingCode !== null; // True if code exists, False otherwise
  };
  
  const insertMeetingCode = async (meetingCode) => {
    const db=client.db('Gmeet')
    const codesCollection = db.collection("meetingCodes");
    await codesCollection.insertOne({ meetingCode });
  };
module.exports={
    CreatenewMeeting,
}