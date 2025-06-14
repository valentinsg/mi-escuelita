import React from 'react';
import { ArrowLeft, Play, CheckCircle, Lock, Star } from 'lucide-react';
import { Subject, Level } from '../types';

interface SubjectLevelsProps {
  subject: Subject;
  onBack: () => void;
  onStartLevel: (level: Level) => void;
}

const SubjectLevels: React.FC<SubjectLevelsProps> = ({ subject, onBack, onStartLevel }) => {
  const getLevelStatus = (level: Level) => {
    if (level.isCompleted) return 'completed';
    if (level.isUnlocked) return 'available';
    return 'locked';
  };

  const getLevelIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'available':
        return <Play className="text-blue-600" size={24} />;
      case 'locked':
        return <Lock className="text-gray-400" size={24} />;
      default:
        return <Play className="text-blue-600" size={24} />;
    }
  };

  const getLevelStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'available':
        return 'bg-white border-blue-200 hover:bg-blue-50 cursor-pointer hover:scale-105';
      case 'locked':
        return 'bg-gray-50 border-gray-200 opacity-60';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header con navegación */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={onBack}
              className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="text-gray-600" size={20} />
            </button>
            <div className={`w-12 h-12 ${subject.color} rounded-2xl flex items-center justify-center text-2xl text-white`}>
              {subject.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{subject.name}</h1>
              <p className="text-gray-600 text-sm">{subject.description}</p>
            </div>
          </div>
          
          {/* Progreso general de la materia */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progreso total</span>
              <span className="text-sm font-bold text-blue-600">{subject.totalProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${subject.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${subject.totalProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Estadísticas de niveles */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-green-600">
                {subject.levels.filter(l => l.isCompleted).length}
              </div>
              <div className="text-xs text-gray-600">Completados</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-blue-600">
                {subject.levels.filter(l => l.isUnlocked && !l.isCompleted).length}
              </div>
              <div className="text-xs text-gray-600">Disponibles</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-gray-600">
                {subject.levels.filter(l => !l.isUnlocked).length}
              </div>
              <div className="text-xs text-gray-600">Bloqueados</div>
            </div>
          </div>
        </div>

        {/* Lista de niveles */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 px-2">Niveles</h2>
          
          {subject.levels.map((level, index) => {
            const status = getLevelStatus(level);
            const completedActivities = level.activities.filter(a => a.completed).length;
            
            return (
              <div 
                key={level.id}
                className={`border-2 rounded-2xl p-4 shadow-md transition-all duration-200 ${getLevelStyles(status)}`}
                onClick={() => status === 'available' && onStartLevel(level)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-full p-2 shadow-sm">
                      {getLevelIcon(status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Nivel {index + 1}: {level.name}
                      </h3>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  </div>
                  
                  {status === 'completed' && (
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" size={16} />
                      <span className="text-sm font-bold text-green-600">100%</span>
                    </div>
                  )}
                </div>

                {/* Progreso del nivel */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">
                      {completedActivities}/{level.activities.length} actividades
                    </span>
                    <span className="text-xs font-medium text-gray-700">{level.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${level.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Botón de acción */}
                {status === 'available' && (
                  <button className={`w-full ${subject.color} text-white rounded-xl py-2 px-4 font-semibold text-sm hover:opacity-90 transition-opacity`}>
                    {level.progress > 0 ? 'Continuar' : 'Comenzar'}
                  </button>
                )}
                
                {status === 'completed' && (
                  <button className="w-full bg-green-500 text-white rounded-xl py-2 px-4 font-semibold text-sm hover:bg-green-600 transition-colors">
                    Repetir Nivel
                  </button>
                )}
                
                {status === 'locked' && (
                  <div className="w-full bg-gray-300 text-gray-500 rounded-xl py-2 px-4 font-semibold text-sm text-center">
                    Completa el nivel anterior
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Próximo desbloqueo */}
        {subject.levels.some(l => !l.isUnlocked) && (
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 text-white">
            <h3 className="font-bold mb-2">🎯 Próximo Desbloqueo</h3>
            <p className="text-sm opacity-90">
              Completa el nivel actual para desbloquear nuevos desafíos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectLevels;