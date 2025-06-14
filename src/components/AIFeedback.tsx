import React, { useState } from 'react';
import { MessageCircle, ArrowRight, RotateCcw, Star, Trophy, Target, Zap } from 'lucide-react';
import { mockFeedback, getContextualPhrase, mockChild } from '../data/mockData';
import GuardianMessage from './GuardianMessage';

const AIFeedback: React.FC = () => {
  const [currentCharacter, setCurrentCharacter] = useState<'cow' | 'fox' | 'owl'>('cow');
  
  const characters = {
    cow: { 
      emoji: '🐄', 
      name: 'Vaca Curiosa', 
      color: 'from-green-400 to-blue-400',
      personality: 'Curiosa y exploradora'
    },
    fox: { 
      emoji: '🦊', 
      name: 'Zorro Sabio', 
      color: 'from-orange-400 to-red-400',
      personality: 'Astuto y estratégico'
    },
    owl: { 
      emoji: '🦉', 
      name: 'Búho Profesor', 
      color: 'from-purple-400 to-indigo-400',
      personality: 'Sabio y paciente'
    }
  };

  const currentChar = characters[currentCharacter];
  const { currentGrade } = mockChild;

  // Generar mensaje contextual basado en el progreso
  const generateContextualMessage = () => {
    const contexts = ['completion', 'encouragement', 'milestone'];
    const randomContext = contexts[Math.floor(Math.random() * contexts.length)];
    return getContextualPhrase(randomContext, currentCharacter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header con personaje activo */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="text-center">
            <div className={`w-24 h-24 bg-gradient-to-r ${currentChar.color} rounded-full flex items-center justify-center text-5xl mx-auto mb-4 shadow-lg`}>
              {currentChar.emoji}
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{currentChar.name}</h1>
            <p className="text-gray-600">{currentChar.personality}</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <div className={`w-6 h-6 bg-gradient-to-r ${currentGrade.color} rounded-full flex items-center justify-center text-sm`}>
                {currentGrade.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">Guía de {currentGrade.name}</span>
            </div>
          </div>
        </div>

        {/* Mensaje principal contextual */}
        <GuardianMessage 
          character={{
            name: currentChar.name,
            emoji: currentChar.emoji,
            phrases: [generateContextualMessage()]
          }}
          context="completion"
          compact={false}
        />

        {/* Logro desbloqueado */}
        {mockFeedback.achievement && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 text-white shadow-lg">
            <div className="text-center">
              <Trophy className="mx-auto mb-3" size={48} />
              <h2 className="text-xl font-bold mb-2">¡Nuevo Logro!</h2>
              <div className="bg-white bg-opacity-20 rounded-2xl p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-lg">{mockFeedback.achievement}</h3>
                <p className="text-sm opacity-90 mt-1">¡Sigue así y desbloquearás más logros!</p>
              </div>
            </div>
          </div>
        )}

        {/* Progreso hacia el siguiente grado */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="text-purple-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Progreso de Grado</h2>
          </div>
          
          <div className={`bg-gradient-to-r ${currentGrade.color} rounded-2xl p-4 text-white mb-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Hacia El Zorro Sabio</span>
              <span className="text-sm opacity-90">75%</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full w-3/4 transition-all duration-500"></div>
            </div>
            <p className="text-sm opacity-90 mt-2">¡Solo necesitas 25% más para avanzar!</p>
          </div>
        </div>

        {/* Recomendación personalizada */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="text-yellow-500" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Recomendación Personalizada</h2>
          </div>
          
          <div className="bg-blue-50 rounded-2xl p-4 mb-4">
            <p className="text-gray-800 leading-relaxed">{mockFeedback.recommendation}</p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-500 text-white rounded-2xl py-4 px-4 font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <span>¡Sí, vamos!</span>
              <ArrowRight size={20} />
            </button>
            <button className="flex-1 bg-gray-500 text-white rounded-2xl py-4 px-4 font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
              <RotateCcw size={20} />
              <span>Repetir</span>
            </button>
          </div>
        </div>

        {/* Estadísticas de la sesión */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Tu sesión de hoy</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">✅</div>
              <div className="text-lg font-bold text-green-600">8</div>
              <div className="text-xs text-gray-600">Correctas</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-lg font-bold text-blue-600">25m</div>
              <div className="text-xs text-gray-600">Tiempo</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-lg font-bold text-purple-600">95%</div>
              <div className="text-xs text-gray-600">Precisión</div>
            </div>
          </div>

          <div className={`bg-gradient-to-r ${currentGrade.color} rounded-2xl p-4 text-white text-center`}>
            <h3 className="font-bold text-lg mb-2">¡Excelente trabajo!</h3>
            <p className="text-sm opacity-90">Estás progresando muy bien en Lógica Visual</p>
          </div>
        </div>

        {/* Cambiar personaje guía */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cambiar Guía</h2>
          <p className="text-sm text-gray-600 mb-4">Cada guía tiene su propia personalidad y estilo de enseñanza</p>
          
          <div className="space-y-3">
            {Object.entries(characters).map(([key, char]) => (
              <button
                key={key}
                onClick={() => setCurrentCharacter(key as 'cow' | 'fox' | 'owl')}
                className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200 ${
                  currentCharacter === key
                    ? `bg-gradient-to-r ${char.color} text-white shadow-lg`
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  currentCharacter === key ? 'bg-white bg-opacity-20' : 'bg-white'
                }`}>
                  {char.emoji}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold">{char.name}</h3>
                  <p className={`text-sm ${currentCharacter === key ? 'opacity-90' : 'text-gray-600'}`}>
                    {char.personality}
                  </p>
                </div>
                {currentCharacter === key && (
                  <div className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                    <span className="text-sm font-medium">Activo</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Próximos desafíos */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl p-6 text-white shadow-lg">
          <h2 className="text-lg font-bold mb-2">🚀 Próximos Desafíos</h2>
          <p className="text-sm opacity-90 mb-4">
            Basado en tu progreso, estos desafíos serán perfectos para ti
          </p>
          <div className="space-y-2">
            <div className="bg-white bg-opacity-20 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Secuencias Complejas</span>
                <span className="text-sm opacity-75">Lógica Visual</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Palabras Mágicas</span>
                <span className="text-sm opacity-75">Escritura</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeedback;