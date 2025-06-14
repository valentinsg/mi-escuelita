import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { grades } from '../data/mockData';

const Grade: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const grade = grades.find(g => g.id === id);

  if (!grade) {
    return (
      <div className="p-4">
        <p>Grado no encontrado</p>
        <Link to="/grados" className="text-blue-600">Volver</Link>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Link to="/grados" className="text-blue-600">&larr; Volver</Link>
      <h1 className="text-2xl font-bold flex items-center space-x-2">
        <span>{grade.icon}</span>
        <span>{grade.name}</span>
      </h1>
      <p className="text-gray-700">{grade.description}</p>
    </div>
  );
};

export default Grade;
