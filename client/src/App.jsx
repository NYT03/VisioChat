import './App.css';
import Home from './screens/Home.jsx';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Meeting from './screens/Meeting.jsx';
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/newmeeting' element={<Meeting/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
