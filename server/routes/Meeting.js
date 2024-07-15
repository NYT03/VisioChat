const express = require("express");
const Router = express.Router();
const { CreatenewMeeting,joinMeeting,endMeeting}=require('../controller/Meeting.js');

Router.route("/newmeeting").get(CreatenewMeeting);
Router
  .route("/newmeeting/:id")
  .get(joinMeeting)
  .delete(endMeeting);

module.exports = Router
