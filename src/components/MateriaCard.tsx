import React from 'react';

interface MateriaCardProps {
  icon: string;
  name: string;
  completed?: boolean;
}

const MateriaCard: React.FC<MateriaCardProps> = ({ icon, name, completed = false }) => {
  const statusText = completed ? 'Completa' : 'En curso';
  const statusColor = completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-md flex items-center space-x-3">
      <div className="text-2xl">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{name}</h3>
      </div>
      <span className={`text-sm font-medium px-2 py-1 rounded-lg ${statusColor}`}>{statusText}</span>
    </div>
  );
};

export default MateriaCard;
