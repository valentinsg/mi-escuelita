// #region Importaciones
import React from 'react';
import { Star, BookOpen, Trophy, ChevronRight, Clock } from 'lucide-react';
import { mockChild } from '../data/mockData';
import GuardianMessage from './GuardianMessage';
// #endregion

const ChildDashboard: React.FC = () => {
  // #region Datos del niño
  const { name, avatar, currentGrade, overallProgress, subjects, achievements, totalPlayTime } = mockChild;
  // #endregion

  // #region Utilidades
  const formatPlayTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  // #endregion

  // #region Renderizado
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header con avatar, grado y saludo */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-6xl">{avatar}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">¡Hola, {name}!</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`w-8 h-8 bg-gradient-to-r ${currentGrade.color} rounded-full flex items-center justify-center text-lg`}>
                  {currentGrade.icon}
                </div>
                <span className="text-purple-600 font-semibold">{currentGrade.name}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{currentGrade.description}</p>
            </div>
          </div>
          
          {/* Progreso general */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Tu progreso general</span>
              <span className="text-sm font-bold text-blue-600">{overallProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${currentGrade.color} h-3 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <Clock className="text-blue-600 mx-auto mb-1" size={16} />
              <div className="text-sm font-bold text-blue-600">{formatPlayTime(totalPlayTime)}</div>
              <div className="text-xs text-gray-600">Jugado</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <Trophy className="text-green-600 mx-auto mb-1" size={16} />
              <div className="text-sm font-bold text-green-600">{achievements.length}</div>
              <div className="text-xs text-gray-600">Logros</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <Star className="text-purple-600 mx-auto mb-1" size={16} />
              <div className="text-sm font-bold text-purple-600">
                {subjects.filter(s => s.isActive).length}
              </div>
              <div className="text-xs text-gray-600">Materias</div>
            </div>
          </div>
        </div>

        {/* Mensaje del guardián */}
        <GuardianMessage 
          character={currentGrade.guardian}
          context="encouragement"
          compact={true}
        />

        {/* Materias activas */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Tus Materias</h2>
          </div>
          
          {subjects.map((subject) => {
            const completedLevels = subject.levels.filter(level => level.isCompleted).length;
            const totalLevels = subject.levels.length;
            
            return (
              <div 
                key={subject.id}
                className={`bg-white rounded-2xl p-4 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                  subject.isActive ? 'cursor-pointer' : 'opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${subject.color} rounded-2xl flex items-center justify-center text-2xl text-white`}>
                      {subject.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                      <p className="text-sm text-gray-500">
                        {completedLevels}/{totalLevels} niveles completados
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{subject.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-700">{subject.totalProgress}%</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${subject.totalProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    {subject.isActive && <ChevronRight className="text-gray-400" size={20} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón de actividad del día */}
        <div className={`bg-gradient-to-r ${currentGrade.color} rounded-2xl p-6 text-white shadow-lg cursor-pointer hover:scale-105 transition-transform`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">¡Desafío del Día!</h3>
              <p className="text-sm opacity-90">Completa 3 patrones seguidos</p>
              <div className="flex items-center space-x-1 mt-2">
                <Star className="text-yellow-300" size={16} />
                <span className="text-sm font-medium">+50 puntos</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-4xl">{currentGrade.icon}</div>
              <ChevronRight size={24} />
            </div>
          </div>
        </div>

        {/* Logros recientes */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="font-semibold text-gray-800 mb-3">Logros Recientes</h3>
          <div className="flex space-x-3">
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className="bg-yellow-100 rounded-xl p-3 flex-1 text-center">
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium text-gray-700">{achievement.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  // #endregion
};

export default ChildDashboard;