
import './App.css';
import Navbar from './components/Homepage/navbar';
import Header from './components/Homepage/header';
import Login from './components/authentification/login';
import Hello  from './components/Homepage/hello';
import AboutUs  from './components/Homepage/aboutUs.js';

function App() {
  return (
    
    <div>
    <Header  />
    <Navbar/>
    <Hello/>
    <AboutUs/>
    </div>
    
  );
}

export default App;

