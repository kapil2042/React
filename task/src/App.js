import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Calculator from './Components/Calculator';
import Home from './Components/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/Calculator' element={<Calculator />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
