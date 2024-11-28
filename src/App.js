import logo from './logo.svg';
import './App.css';
import Cards from './componenets/cards/Cards.js';
import { Signup } from './auth/signup.js';
import Offrescard from './componenets/cards/Ofrrescard.js';
import Cardsprestatiare from './componenets/cards/Cardsprestatiare.js';


function App() {
  return (
    <div className="App">
<Cards/>
<br/><br/><br/>
<Offrescard/>
<Cardsprestatiare/>


    </div>
  );
}

export default App;
