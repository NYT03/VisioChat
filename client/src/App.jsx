import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CurrentUserContext from './../context/UserContext';
import './App.css';
import Home from "./screens/Home.jsx";
import Meeting from './screens/Meeting.jsx';
import MeetingEnd from './screens/MeetingEnd.jsx';
import Login from "./screens/Login.jsx";

function App() {
  const {currentUser,setCurrentUser} = useContext(CurrentUserContext);
  return(
    <BrowserRouter>
    {
      currentUser?(<Routes>
        <CurrentUserContext.Provider value={currentUser}>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/newmeeting/:id' element={<Meeting/>}/>
          <Route path='/endmeeting' element={<MeetingEnd/>}/>
          </CurrentUserContext.Provider>
       </Routes>
       ):
       (<Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
       </Routes>
       )
    }
   </BrowserRouter>
  )
}

export default App
