import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Routes , Route} from 'react-router-dom';
import NavBar from './components/Navbar';
import { Navigate } from 'react-router-dom';

import HomePage from './pages/Home';

import DragDropFiles from './pages/DragDrop';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import UpdateProfile from './pages/updateUserProfile';


import SlideNavbar from './components/newnavbar';

import ProfilePage from './pages/Profile';

import HistoryPage from './pages/History';
import FeedbackPage from './pages/Feedback';
import { checkToken } from '.';

function App() {
  const isLoggedIn = checkToken('token');
  if (isLoggedIn) {
    console.log('logged in');
    return (
      <div>
      <NavBar/>
      <Routes>
        <Route path ="/" element ={<HomePage/>} />
        <Route path ="/predict" element={<DragDropFiles/>} />
        <Route path ="/register" element={<RegisterPage/>} />
        <Route path ="/login" element={<LoginPage/>} />
        <Route path ="/updateProfile" element={<UpdateProfile/>} />
        <Route path='/slideNavbar' element={<SlideNavbar/>}/>
        <Route path='/profilePage' element={<ProfilePage/>}></Route>
        <Route path='/historyPage' element={<HistoryPage/>}></Route>
        <Route path='/feedbackPage' element={<FeedbackPage/>}></Route>
      </Routes>
      </div>
    );
  }

  return (
    <Routes>
      <Route path ="*" element={<Navigate to="/" />} />
      <Route path ="/" element ={<HomePage/>} />
      <Route path ="/register" element={<RegisterPage/>} />
      <Route path ="/login" element={<LoginPage/>} />
      <Route path ="/slideNavbar" element={<SlideNavbar/>} />
    </Routes>
  );
  }
  
export default App;
