import React from 'react';
import { mockGrados } from '../data/mockGrados';

const GradoList: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockGrados.map((grado) => (
        <div
          key={grado.id}
          className="bg-white rounded-2xl p-4 shadow-md flex items-center space-x-4"
        >
          <div
            className={`w-12 h-12 bg-gradient-to-r ${grado.color} rounded-xl flex items-center justify-center text-2xl text-white`}
          >
            {grado.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{grado.name}</h3>
            <p className="text-sm text-gray-500">{grado.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GradoList;
