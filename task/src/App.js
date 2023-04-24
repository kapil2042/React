import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calculator from './Components/Calculator';
import Home from './Components/Home';
import TodoAPI from './Components/TodoAPI';
import Weather from './Components/Weather';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/Calculator' element={<Calculator />} />
          <Route path='/TodoAPI' element={<TodoAPI />} />
          <Route path='/Weather' element={<Weather />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
