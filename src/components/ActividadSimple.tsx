import React from 'react';

interface ActividadSimpleProps {
  texto: string;
  opciones: string[];
  onSelect?: (opcion: string) => void;
}

const ActividadSimple: React.FC<ActividadSimpleProps> = ({ texto, opciones, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg space-y-4">
      <p className="text-lg font-medium text-gray-800">{texto}</p>
      <div className="grid gap-3">
        {opciones.map((opcion, index) => (
          <button
            key={index}
            onClick={() => onSelect?.(opcion)}
            className="w-full bg-blue-500 text-white rounded-xl py-2 px-4 hover:bg-blue-600 transition-colors"
          >
            {opcion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActividadSimple;
