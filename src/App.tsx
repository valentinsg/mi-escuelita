import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Grades from './pages/Grades';
import Grade from './pages/Grade';
import Subject from './pages/Subject';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grados" element={<Grades />} />
      <Route path="/grado/:id" element={<Grade />} />
      <Route path="/materia/:id" element={<Subject />} />
    </Routes>
  </BrowserRouter>
);

export default App;
