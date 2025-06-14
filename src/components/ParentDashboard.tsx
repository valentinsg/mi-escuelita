import { useState } from 'react';
import { Clock, TrendingUp, AlertTriangle, Award, Play, Pause, Settings, BarChart3, Target, Calendar } from 'lucide-react';
import { mockChild, parentRecommendations } from '../data/mockData';
import { ParentRecommendation, Subject } from '../types';

const ParentDashboard: React.FC<{ onSubjectSelect: (subject: Subject) => void }> = ({ onSubjectSelect }) => {
  const { name, subjects, overallProgress, currentGrade, totalPlayTime } = mockChild;
  const [activeSession, setActiveSession] = useState(true);
  const [sessionTime, setSessionTime] = useState(25 * 60 + 30); // 25:30 en segundos

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPlayTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-green-400 bg-green-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-red-500" size={20} />;
      case 'achievement': return <Award className="text-green-500" size={20} />;
      case 'milestone': return <Target className="text-purple-500" size={20} />;
      default: return <TrendingUp className="text-blue-500" size={20} />;
    }
  };

  const toggleSession = () => {
    setActiveSession(!activeSession);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header del padre */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard de {name}</h1>
              <p className="text-gray-600">Monitoreo y control parental</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className={`w-6 h-6 bg-gradient-to-r ${currentGrade.color} rounded-full flex items-center justify-center text-sm`}>
                  {currentGrade.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{currentGrade.name}</span>
              </div>
            </div>
            <button className="bg-purple-100 rounded-full p-3 hover:bg-purple-200 transition-colors">
              <Settings className="text-purple-600" size={24} />
            </button>
          </div>
          
          {/* Resumen rápido */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <div className="text-xs text-gray-600">Progreso</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{formatPlayTime(totalPlayTime)}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {subjects.filter(s => s.isActive).length}
              </div>
              <div className="text-xs text-gray-600">Activas</div>
            </div>
          </div>
        </div>

        {/* Sesión actual */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-gray-800">Sesión Actual</h2>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl font-bold text-blue-600">{formatTime(sessionTime)}</div>
              <button 
                onClick={toggleSession}
                className={`p-2 rounded-lg transition-colors ${
                  activeSession 
                    ? 'bg-red-100 hover:bg-red-200' 
                    : 'bg-green-100 hover:bg-green-200'
                }`}
              >
                {activeSession ? (
                  <Pause className="text-red-600" size={16} />
                ) : (
                  <Play className="text-green-600" size={16} />
                )}
              </button>
            </div>
          </div>
          
          <div className={`bg-gradient-to-r ${currentGrade.color} rounded-2xl p-4 text-white`}>
            <p className="text-sm opacity-90 mb-2">Trabajando en:</p>
            <p className="font-semibold text-lg">Lógica Visual - Patrones Básicos</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm opacity-75">Tiempo recomendado: 30 min</span>
              <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                <span className="text-sm font-medium">5 min restantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estado de materias */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Estado de Materias</h2>
            <BarChart3 className="text-gray-400" size={20} />
          </div>
          
          {subjects.map((subject) => {
            const completedLevels = subject.levels.filter(level => level.isCompleted).length;
            const totalLevels = subject.levels.length;
            
            return (
              <div key={subject.id} className="flex items-center justify-between mb-4 last:mb-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${subject.color} rounded-xl flex items-center justify-center text-lg text-white`}>
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-500">
                      {completedLevels}/{totalLevels} niveles • {subject.totalProgress}% completado
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${subject.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${subject.totalProgress}%` }}
                    ></div>
                  </div>
                  <button 
                    className={`p-2 rounded-lg transition-colors ${
                      subject.isActive 
                        ? 'bg-green-100 hover:bg-green-200' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {subject.isActive ? (
                      <Pause className="text-green-600" size={16} />
                    ) : (
                      <Play className="text-gray-600" size={16} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actividad reciente */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-green-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Actividad Reciente</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                  ✓
                </div>
                <div>
                  <p className="font-medium text-gray-800">Patrón de Colores</p>
                  <p className="text-sm text-gray-500">Hace 5 minutos</p>
                </div>
              </div>
              <span className="text-sm font-bold text-green-600">100%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                  ⏱️
                </div>
                <div>
                  <p className="font-medium text-gray-800">Secuencia Lógica</p>
                  <p className="text-sm text-gray-500">En progreso</p>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-600">60%</span>
            </div>
          </div>
        </div>

        {/* Recomendaciones de IA */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Sugerencias del Sistema</h2>
          
          {parentRecommendations.map((rec) => (
            <div 
              key={rec.id} 
              className={`border-l-4 rounded-r-xl p-4 mb-3 last:mb-0 ${getPriorityColor(rec.priority)}`}
            >
              <div className="flex items-start space-x-3">
                {getPriorityIcon(rec.type)}
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{rec.message}</p>
                  {rec.actionable && (
                    <button className="text-sm text-blue-600 hover:text-blue-800 mt-2 font-medium">
                      Ver detalles →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cambiar ruta educativa (placeholder) */}
        <div className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl p-6 text-white shadow-lg">
          <h2 className="text-lg font-bold mb-2">🎯 Personalizar Ruta</h2>
          <p className="text-sm opacity-90 mb-4">
            Ajusta el plan de estudios según las fortalezas y preferencias de {name}
          </p>
          <button className="bg-white bg-opacity-20 rounded-xl py-2 px-4 font-semibold text-sm hover:bg-opacity-30 transition-colors">
            Configurar Plan
          </button>
        </div>

        {/* Controles rápidos */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Controles Rápidos</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={toggleSession}
              className={`rounded-2xl py-4 px-4 font-semibold transition-colors ${
                activeSession 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {activeSession ? 'Pausar Sesión' : 'Reanudar Sesión'}
            </button>
            <button className="bg-blue-500 text-white rounded-2xl py-4 px-4 font-semibold hover:bg-blue-600 transition-colors">
              Cambiar Materia
            </button>
            <button className="bg-purple-500 text-white rounded-2xl py-4 px-4 font-semibold hover:bg-purple-600 transition-colors">
              Ver Reporte
            </button>
            <button className="bg-gray-500 text-white rounded-2xl py-4 px-4 font-semibold hover:bg-gray-600 transition-colors">
              Configurar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;