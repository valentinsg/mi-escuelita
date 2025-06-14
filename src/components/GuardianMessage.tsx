// #region Importaciones
import React from 'react';
import { MessageCircle } from 'lucide-react';
// #endregion

// #region Tipos
interface GuardianCharacter {
  name: string;
  emoji: string;
  phrases: string[];
}

interface GuardianMessageProps {
  character: GuardianCharacter;
  context: 'completion' | 'struggle' | 'encouragement' | 'milestone';
  compact?: boolean;
  customMessage?: string;
}
// #endregion

const GuardianMessage: React.FC<GuardianMessageProps> = ({
  character,
  context,
  compact = false,
  customMessage
}) => {
  // #region Funciones de apoyo
  const getRandomPhrase = () => {
    if (customMessage) return customMessage;
    return character.phrases[Math.floor(Math.random() * character.phrases.length)];
  };

  const getContextColor = () => {
    switch (context) {
      case 'completion':
        return 'from-green-400 to-blue-400';
      case 'struggle':
        return 'from-orange-400 to-yellow-400';
      case 'milestone':
        return 'from-purple-400 to-pink-400';
      default:
        return 'from-blue-400 to-purple-400';
    }
  };
  // #endregion

  if (compact) {
    // #region Versión compacta
    return (
      <div className="bg-white rounded-2xl p-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${getContextColor()} rounded-full flex items-center justify-center text-lg`}>
            {character.emoji}
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 rounded-xl p-3">
              <p className="text-gray-800 text-sm leading-relaxed">{getRandomPhrase()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // #endregion

  // #region Versión completa
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="text-center mb-4">
        <div className={`w-20 h-20 bg-gradient-to-r ${getContextColor()} rounded-full flex items-center justify-center text-4xl mx-auto mb-3 shadow-lg`}>
          {character.emoji}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{character.name}</h3>
      </div>
      
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${getContextColor()} rounded-full flex items-center justify-center text-2xl flex-shrink-0`}>
          {character.emoji}
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl p-4 relative">
            <div className="absolute -left-2 top-4 w-4 h-4 bg-gray-100 transform rotate-45"></div>
            <p className="text-gray-800 text-lg leading-relaxed">{getRandomPhrase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
  // #endregion
};

export default GuardianMessage;