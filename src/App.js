import { Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/DashBoard';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/DashBoard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
