import { Grade } from '../types';

export const mockGrados: Grade[] = [
  {
    id: 'curious-cow',
    name: 'La Vaca Curiosa',
    icon: '🐄',
    color: 'from-green-400 to-blue-400',
    primaryColor: 'bg-green-500',
    secondaryColor: 'bg-green-100',
    guardian: {
      name: 'Vaca Curiosa',
      emoji: '🐄',
      phrases: [
        '¡Muy bien! Sigues explorando como una verdadera curiosa.',
        '¿Sabías que las vacas pueden aprender su nombre? ¡Tú también estás aprendiendo genial!',
        'Me encanta cómo resuelves los desafíos. ¡Eres súper inteligente!',
        '¡Muu-cho mejor! Estás progresando increíble.'
      ]
    },
    description: 'Explora el mundo con curiosidad y descubre patrones increíbles',
    requiredProgress: 0
  },
  {
    id: 'wise-fox',
    name: 'El Zorro Sabio',
    icon: '🦊',
    color: 'from-orange-400 to-red-400',
    primaryColor: 'bg-orange-500',
    secondaryColor: 'bg-orange-100',
    guardian: {
      name: 'Zorro Sabio',
      emoji: '🦊',
      phrases: [
        'Como un zorro astuto, encuentras las mejores soluciones.',
        '¡Excelente estrategia! Los zorros sabemos reconocer la inteligencia.',
        'Tu astucia para resolver problemas me impresiona cada día.',
        'Sigues creciendo en sabiduría. ¡Estoy orgulloso de ti!'
      ]
    },
    description: 'Usa tu astucia y sabiduría para resolver desafíos complejos',
    requiredProgress: 40
  },
  {
    id: 'professor-owl',
    name: 'El Búho Profesor',
    icon: '🦉',
    color: 'from-purple-400 to-indigo-400',
    primaryColor: 'bg-purple-500',
    secondaryColor: 'bg-purple-100',
    guardian: {
      name: 'Búho Profesor',
      emoji: '🦉',
      phrases: [
        'Tu conocimiento crece como el de un verdadero sabio.',
        '¡Impresionante! Dominas conceptos que muchos encuentran difíciles.',
        'Como profesor, estoy muy orgulloso de tu dedicación.',
        'Tu sabiduría ilumina el camino para otros estudiantes.'
      ]
    },
    description: 'Domina conocimientos avanzados y guía a otros en su aprendizaje',
    requiredProgress: 80
  }
];

