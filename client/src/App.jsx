import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Socket from "./context/Socket.jsx";
import { useUserContext } from "./context/UserContext.jsx";
import Home from "./screens/Home.jsx";
import Meeting from "./screens/Meeting.jsx";
import MeetingEnd from "./screens/MeetingEnd.jsx";
function App() {
  const {user} = useUserContext();
  const {currentUser, setCurrentUser}=user; 
  return (
    <BrowserRouter>
      <Socket>
        {
          (currentUser.email!==null)?(
            <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/newmeeting/:id" element={<Meeting />} />
            <Route path="/endmeeting" element={<MeetingEnd />} />
          </Routes>
           ):
           <div>
            <h1 className="text-white">
            comming soon
            </h1>
           </div>
          //  (<Routes>
          //   <Route exact path='/' element={<Login/>}/>
          //   <Route exact path='/signup' element={<Signup/>}/>
          //  </Routes>
          //  )
          }
      </Socket>
    </BrowserRouter>
  );
}

export default App;
