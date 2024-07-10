const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const path = require('path');
const generateMeetingId = require('./mongoDb');


app.use(express.static(path.join(__dirname,"")))
app.use(cors());

app.get('/newmeeting', async (req, res) => {
    try {
      const meetingId = await generateMeetingId();
      res.json({ "meetingId":meetingId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// process.on('SIGINT', async () => {
//     console.log("Shutting down app...");
//     app.off(() => {
//       console.log("Server closed");
//       process.exit(0);
//     });
//   });
  
//   process.on('SIGTERM', async () => {
//     console.log("Shutting down app...");
//     app.off(() => {
//       console.log("Server closed");
//       process.exit(0);
//     });
//   });
  