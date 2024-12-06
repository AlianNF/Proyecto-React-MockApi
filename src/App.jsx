import './App.css';
import Home from './pages/home';
import GameDetail from './pages/GameDetail';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
 
  return (
   <Router> 
      <Routes> 
       <Route path="/" element={<Home />} />
       <Route path="/game/:id" element={<GameDetail />} />
       
      </Routes>
    </Router>
  )
}

export default App
