import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Contact from './pages/Contact';
import MyApponint from './pages/MyApponint';
import Apponint from './pages/Apponint';
import UserContextProvider  from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login'; 
import About from './pages/About'; 
import MyProfile from './pages/MyProfile';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Reset from './pages/Reset';


export default function App() {

  

  return (
    <div className='mx-4 sm:mx-[5%]'>
      <UserContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointment' element={<MyApponint />} />
        <Route path='/appointment/:teacherId' element={<Apponint />} />    
        <Route path='/reset' element={<Reset />} />    
      </Routes>
      </UserContextProvider>
      <Footer />
    </div>
  );
}
