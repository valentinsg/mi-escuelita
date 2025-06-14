import React from 'react';

interface GradoCardProps {
  nombre: string;
  descripcion: string;
  color: string;
  icono: React.ReactNode;
}

const GradoCard: React.FC<GradoCardProps> = ({ nombre, descripcion, color, icono }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md text-center flex flex-col items-center space-y-3">
      <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center text-3xl text-white`}>
        {icono}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{nombre}</h3>
      <p className="text-sm text-gray-600">{descripcion}</p>
      <button className={`w-full bg-gradient-to-r ${color} text-white rounded-xl py-2 px-4 font-semibold hover:opacity-90 transition-opacity`}>
        Entrar
      </button>
    </div>
  );
};

export default GradoCard;
