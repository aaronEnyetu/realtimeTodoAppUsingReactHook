import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Todo from './components/Todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="todo"></Route>
        <Route index element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
