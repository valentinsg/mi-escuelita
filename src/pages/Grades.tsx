import React from 'react';
import { Link } from 'react-router-dom';
import { grades } from '../data/mockData';

const Grades: React.FC = () => (
  <div className="p-4 space-y-4">
    <h1 className="text-2xl font-bold">Grados</h1>
    <ul className="space-y-2">
      {grades.map((grade) => (
        <li key={grade.id} className="border p-3 rounded-xl hover:bg-gray-50">
          <Link to={`/grado/${grade.id}`} className="flex items-center space-x-2">
            <span className="text-xl">{grade.icon}</span>
            <span>{grade.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Grades;
