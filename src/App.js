import logo from './logo.svg';
import './App.css';
import Cards from './componenets/cards/Cards.js';
import { Signup } from './auth/signup.js';
import Offrescard from './componenets/cards/Ofrrescard.js';
import Cardsprestatiare from './componenets/cards/Cardsprestatiare.js';
import ContactUs from './componenets/cards/ContactUs.js';


function App() {
  return (
    <div className="App">
       
          <Signup/>
          <br/><br/><br/>
<Cards/>
<br/><br/><br/>
<Offrescard/>
<Cardsprestatiare/>
<ContactUs/>



    </div>
  );
}

export default App;
