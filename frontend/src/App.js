import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/welcome" element={<Welcome />} exact />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;