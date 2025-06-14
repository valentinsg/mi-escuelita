import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockChild } from '../data/mockData';

const Subject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const subject = mockChild.subjects.find(s => s.id === id);

  if (!subject) {
    return (
      <div className="p-4">
        <p>Materia no encontrada</p>
        <Link to="/" className="text-blue-600">Inicio</Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Link to="/" className="text-blue-600">&larr; Inicio</Link>
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <span className="text-xl">{subject.icon}</span>
        <span>{subject.name}</span>
      </h1>
      <p className="text-gray-700">{subject.description}</p>
    </div>
  );
};

export default Subject;
