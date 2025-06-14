// #region Importaciones
import React, { useState } from 'react';
import { HelpCircle, CheckCircle, ArrowRight, Volume2, ArrowLeft } from 'lucide-react';
import { mockActivities } from '../data/mockData';
import { Activity } from '../types';
import GuardianMessage from './GuardianMessage';
// #endregion

// #region Tipado de props
interface ActivityViewProps {
  activity?: Activity;
  onBack?: () => void;
  onComplete?: () => void;
}
// #endregion

const ActivityView: React.FC<ActivityViewProps> = ({
  activity = mockActivities.pattern,
  onBack,
  onComplete
}) => {
  // #region Estado local
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [needsHelp, setNeedsHelp] = useState(false);
  // #endregion

  // #region Datos específicos por tipo de actividad
  const activityData = {
    pattern: {
      patterns: [
        { id: 1, colors: ['🔴', '🔵', '🔴', '🔵', '?'], answer: '🔴' },
        { id: 2, colors: ['🟡', '🟢', '🟡', '🟢', '?'], answer: '🟡' },
        { id: 3, colors: ['🔵', '🔵', '🔴', '🔵', '🔵', '?'], answer: '🔴' }
      ],
      options: ['🔴', '🔵', '🟡', '🟢']
    },
    word: {
      word: 'GATO',
      letters: ['G', 'A', 'T', 'O'],
      scrambled: ['O', 'G', 'T', 'A'],
      image: '🐱'
    },
    math: {
      problem: '3 + 2 = ?',
      objects: ['🍎', '🍎', '🍎', '🍊', '🍊'],
      options: [4, 5, 6, 7],
      answer: 5
    },
    drag: {
      items: [
        { id: 1, name: 'Ratón', emoji: '🐭', size: 1 },
        { id: 2, name: 'Gato', emoji: '🐱', size: 2 },
        { id: 3, name: 'Perro', emoji: '🐕', size: 3 },
        { id: 4, name: 'Elefante', emoji: '🐘', size: 4 }
      ]
    }
  };
  // #endregion

  // Patrón actual seleccionado
  const currentPattern = activityData.pattern.patterns[0];

  // #region Manejadores
  const handleOptionSelect = (option: string) => {
    if (option === currentPattern.answer) {
      setCompleted(true);
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        onComplete?.();
      }, 2000);
    }
  };

  const handleNeedHelp = () => {
    setNeedsHelp(true);
    setTimeout(() => setNeedsHelp(false), 3000);
  };
  // #endregion

  const renderActivityContent = () => {
    switch (activity.type) {
      case 'pattern':
        return (
          <div className="space-y-6">
            {/* Área del patrón */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {currentPattern.colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-4 transition-all duration-300 ${
                    color === '?' 
                      ? 'border-dashed border-gray-300 bg-gray-50' 
                      : 'border-gray-200 bg-white shadow-md'
                  }`}
                >
                  {color === '?' ? (
                    <div className="text-gray-400 text-4xl">?</div>
                  ) : (
                    color
                  )}
                </div>
              ))}
            </div>

            {/* Opciones de respuesta */}
            <div className="grid grid-cols-2 gap-4">
              {activityData.pattern.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full h-20 rounded-2xl text-4xl border-4 transition-all duration-200 hover:scale-105 ${
                    completed && option === currentPattern.answer
                      ? 'border-green-400 bg-green-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                  disabled={completed}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'word':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-8xl mb-4">{activityData.word.image}</div>
              <div className="flex justify-center space-x-2 mb-6">
                {activityData.word.letters.map((letter, index) => (
                  <div key={index} className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <span className="text-xl font-bold text-gray-400">_</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-2">
                {activityData.word.scrambled.map((letter, index) => (
                  <button key={index} className="w-12 h-12 bg-blue-500 text-white rounded-lg font-bold text-xl hover:bg-blue-600 transition-colors">
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'math':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-2xl font-bold mb-4">{activityData.math.problem}</div>
              <div className="flex justify-center space-x-2 mb-6">
                {activityData.math.objects.map((obj, index) => (
                  <div key={index} className="text-4xl">{obj}</div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {activityData.math.options.map((option, index) => (
                  <button key={index} className="w-full h-16 bg-purple-500 text-white rounded-2xl text-2xl font-bold hover:bg-purple-600 transition-colors">
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-gray-600">Tipo de actividad en desarrollo</p>
          </div>
        );
    }
  };
  // #endregion

  // #region Renderizado principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header de la actividad */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="text-gray-600" size={20} />
                </button>
              )}
              <div className="bg-green-100 rounded-full p-3">
                <div className="text-2xl">🧩</div>
              </div>
            </div>
            <button className="bg-blue-100 rounded-full p-2 hover:bg-blue-200 transition-colors">
              <Volume2 className="text-blue-600" size={20} />
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{activity.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">{activity.instruction}</p>
          
          {/* Narrativa contextual */}
          {activity.narrative && (
            <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-400">
              <p className="text-blue-800 text-sm leading-relaxed">{activity.narrative}</p>
            </div>
          )}
        </div>

        {/* Contenido de la actividad */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          {renderActivityContent()}
        </div>

        {/* Mensaje de ayuda */}
        {needsHelp && (
          <GuardianMessage 
            character={{
              name: 'Vaca Curiosa',
              emoji: '🐄',
              phrases: ['¡No te preocupes! Observa bien el patrón. ¿Qué color viene después de azul?']
            }}
            context="struggle"
            compact={false}
          />
        )}

        {/* Feedback de éxito */}
        {showFeedback && (
          <div className="bg-green-500 rounded-2xl p-6 text-white shadow-lg animate-pulse">
            <div className="flex items-center space-x-3">
              <CheckCircle size={32} />
              <div>
                <h3 className="text-xl font-bold">¡Excelente!</h3>
                <p className="text-green-100">¡Completaste el patrón correctamente!</p>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex space-x-4">
          <button 
            onClick={handleNeedHelp}
            className="flex-1 bg-orange-500 text-white rounded-2xl py-4 px-6 font-semibold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
          >
            <HelpCircle size={24} />
            <span>Necesito ayuda</span>
          </button>
          
          <button 
            className={`flex-1 rounded-2xl py-4 px-6 font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
              completed 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!completed}
            onClick={onComplete}
          >
            <span>¡Listo!</span>
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Progreso de la sesión */}
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Actividad 1 de 5</span>
            <span className="text-sm font-bold text-blue-600">20%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full w-1/5 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
  // #endregion
};

export default ActivityView;