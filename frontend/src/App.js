import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} exact />
        <Route path="/welcome" element={<Welcome />} exact />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;