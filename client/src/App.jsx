import './App.css';
import Home from './screens/Home.jsx';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Meeting from './screens/Meeting.jsx';
import MeetingEnd from './screens/MeetingEnd.jsx';
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/newmeeting/:id' element={<Meeting/>}/>
      <Route path='/endmeeting' element={<MeetingEnd/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
