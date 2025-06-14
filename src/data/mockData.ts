// #region Importaciones
import { Child, Subject, Activity, AIFeedback, Grade, Level, Achievement, ParentRecommendation } from '../types';
// #endregion

// #region Sistema de Grados Simbólicos
export const grades: Grade[] = [
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
// #endregion

// #region Template de Niveles por Materia
const createLevels = (subjectId: string): Level[] => {
  const levelTemplates = {
    'visual-logic': [
      {
        name: 'Patrones Básicos',
        description: 'Aprende a identificar secuencias simples de colores y formas',
        activities: 5
      },
      {
        name: 'Secuencias Complejas',
        description: 'Descubre patrones más elaborados con múltiples elementos',
        activities: 7
      },
      {
        name: 'Lógica Espacial',
        description: 'Resuelve desafíos de posición y orientación en el espacio',
        activities: 6
      }
    ],
    'writing': [
      {
        name: 'Letras y Sonidos',
        description: 'Conecta letras con sus sonidos y forma palabras simples',
        activities: 8
      },
      {
        name: 'Palabras Mágicas',
        description: 'Construye palabras más largas y descubre su significado',
        activities: 10
      },
      {
        name: 'Cuentos Creativos',
        description: 'Crea tus propias historias con palabras que conoces',
        activities: 6
      }
    ],
    'numbers': [
      {
        name: 'Números Amigos',
        description: 'Conoce los números del 1 al 10 y aprende a contarlos',
        activities: 6
      },
      {
        name: 'Sumas Divertidas',
        description: 'Suma números pequeños con objetos y juegos',
        activities: 8
      },
      {
        name: 'Restas Mágicas',
        description: 'Aprende a quitar cantidades de forma divertida',
        activities: 7
      }
    ],
    'creativity': [
      {
        name: 'Colores Fantásticos',
        description: 'Explora colores primarios y crea combinaciones increíbles',
        activities: 5
      },
      {
        name: 'Formas Divertidas',
        description: 'Dibuja y combina formas para crear arte único',
        activities: 6
      },
      {
        name: 'Historias Visuales',
        description: 'Cuenta historias usando dibujos y creatividad',
        activities: 8
      }
    ]
  };

  const templates = levelTemplates[subjectId as keyof typeof levelTemplates] || [];

  return templates.map((template, index) => ({
    id: `${subjectId}-level-${index + 1}`,
    name: template.name,
    description: template.description,
    activities: Array.from({ length: template.activities }, (_, i) => ({
      id: `${subjectId}-level-${index + 1}-activity-${i + 1}`,
      title: `Actividad ${i + 1}`,
      instruction: 'Instrucción de ejemplo para esta actividad',
      type: 'pattern' as const,
      difficulty: 'easy' as const,
      completed: Math.random() > 0.7
    })),
    isUnlocked: index === 0 || Math.random() > 0.5,
    isCompleted: Math.random() > 0.8,
    progress: Math.floor(Math.random() * 100),
    requiredScore: 80
  }));
};
// #endregion

// #region Datos simulados de usuario
export const mockChild: Child = {
  id: '1',
  name: 'Sofía',
  avatar: '👧',
  currentGrade: grades[0],
  overallProgress: 65,
  totalPlayTime: 1250, // minutos
  achievements: [
    {
      id: '1',
      name: 'Pensador Lógico',
      description: 'Completaste 10 desafíos de lógica visual seguidos',
      icon: '🎯',
      unlockedAt: new Date('2024-01-15'),
      category: 'mastery'
    },
    {
      id: '2',
      name: 'Escritor Creativo',
      description: 'Creaste tu primera historia completa',
      icon: '📝',
      unlockedAt: new Date('2024-01-10'),
      category: 'milestone'
    },
    {
      id: '3',
      name: 'Matemático',
      description: 'Resolviste 50 problemas de números',
      icon: '🔢',
      unlockedAt: new Date('2024-01-08'),
      category: 'progress'
    }
  ],
  subjects: [
    {
      id: 'visual-logic',
      name: 'Lógica Visual',
      icon: '🧩',
      color: 'bg-blue-500',
      description: 'Desarrolla tu pensamiento lógico con patrones y secuencias',
      levels: createLevels('visual-logic'),
      totalProgress: 80,
      isActive: true
    },
    {
      id: 'writing',
      name: 'Escritura',
      icon: '✏️',
      color: 'bg-green-500',
      description: 'Aprende a escribir y crear historias increíbles',
      levels: createLevels('writing'),
      totalProgress: 45,
      isActive: true
    },
    {
      id: 'numbers',
      name: 'Números',
      icon: '🔢',
      color: 'bg-purple-500',
      description: 'Descubre el mundo mágico de los números y las matemáticas',
      levels: createLevels('numbers'),
      totalProgress: 70,
      isActive: true
    },
    {
      id: 'creativity',
      name: 'Creatividad',
      icon: '🎨',
      color: 'bg-orange-500',
      description: 'Expresa tu creatividad a través del arte y la imaginación',
      levels: createLevels('creativity'),
      totalProgress: 30,
      isActive: false
    }
  ]
};
// #endregion

// Actividades con diferentes tipos y narrativas
// #region Actividades de ejemplo
export const mockActivities: { [key: string]: Activity } = {
  pattern: {
    id: 'pattern-1',
    title: 'Completa el Patrón',
    instruction: '¡Mira estos círculos de colores! ¿Puedes completar el patrón?',
    narrative: 'La Vaca Curiosa está organizando flores en su jardín. ¡Ayúdala a completar el patrón de colores!',
    type: 'pattern',
    difficulty: 'easy',
    completed: false
  },
  word: {
    id: 'word-1',
    title: 'Forma la Palabra',
    instruction: 'Arrastra las letras para formar la palabra que ves en la imagen',
    narrative: 'El Zorro Sabio ha perdido algunas letras de su libro mágico. ¡Ayúdalo a reconstruir las palabras!',
    type: 'word',
    difficulty: 'medium',
    completed: false
  },
  math: {
    id: 'math-1',
    title: 'Cuenta y Suma',
    instruction: 'Cuenta los objetos y encuentra el resultado de la suma',
    narrative: 'El Búho Profesor necesita contar todos los libros de su biblioteca. ¿Puedes ayudarlo?',
    type: 'math',
    difficulty: 'easy',
    completed: false
  },
  drag: {
    id: 'drag-1',
    title: 'Ordena por Tamaño',
    instruction: 'Arrastra los objetos del más pequeño al más grande',
    narrative: 'Los animales del bosque quieren hacer una fila ordenada. ¡Ayúdalos a organizarse!',
    type: 'drag',
    difficulty: 'easy',
    completed: false
  }
};
// #endregion

export const mockFeedback: AIFeedback = {
  message: '¡Excelente trabajo, Sofía! Completaste 3 desafíos de lógica visual seguidos.',
  recommendation: '¿Te gustaría probar algunos ejercicios de escritura ahora? ¡Tienes muy buena concentración hoy!',
  character: 'cow',
  achievement: 'Pensador Lógico',
  context: 'completion'
};

// #region Recomendaciones para padres
export const parentRecommendations: ParentRecommendation[] = [
  {
    id: '1',
    type: 'suggestion',
    message: 'Sofía muestra gran habilidad en lógica visual. Considera agregar más desafíos de patrones.',
    priority: 'medium',
    actionable: true,
    relatedSubject: 'visual-logic'
  },
  {
    id: '2',
    type: 'warning',
    message: 'Ha estado 20 minutos seguidos. Es un buen momento para un descanso.',
    priority: 'high',
    actionable: true
  },
  {
    id: '3',
    type: 'achievement',
    message: 'Nueva insignia desbloqueada: "Exploradora Matemática"',
    priority: 'low',
    actionable: false,
    relatedSubject: 'numbers'
  },
  {
    id: '4',
    type: 'milestone',
    message: 'Sofía está lista para avanzar al siguiente grado: "El Zorro Sabio"',
    priority: 'medium',
    actionable: true
  }
];
// #endregion

// Sistema de frases contextuales para la IA
// #region Frases contextuales para la IA
export const getContextualPhrase = (context: string, character: string = 'cow'): string => {
  const phrases = {
    cow: {
      completion: [
        '¡Muu-cho mejor! Completaste el desafío perfectamente.',
        '¡Increíble! Eres tan curiosa como yo.',
        'Me encanta cómo piensas. ¡Sigues sorprendiéndome!'
      ],
      struggle: [
        'No te preocupes, todos necesitamos tiempo para aprender.',
        '¡Inténtalo de nuevo! Yo creo en ti.',
        'Recuerda: ser curioso significa hacer muchas preguntas.'
      ],
      encouragement: [
        '¡Estás haciendo un trabajo fantástico!',
        'Tu curiosidad te llevará muy lejos.',
        'Cada día aprendes algo nuevo. ¡Eso es genial!'
      ]
    },
    fox: {
      completion: [
        'Como un zorro astuto, encontraste la solución perfecta.',
        '¡Excelente estrategia! Tu sabiduría crece cada día.',
        'Impresionante. Usaste tu inteligencia como un verdadero sabio.'
      ],
      struggle: [
        'Los zorros sabios saben que cada error es una lección.',
        'Piensa como un zorro: observa, analiza y luego actúa.',
        'La sabiduría viene con la práctica. ¡Sigue intentando!'
      ],
      encouragement: [
        'Tu astucia para resolver problemas me impresiona.',
        'Cada desafío te hace más sabio.',
        'Tienes la mente de un verdadero estratega.'
      ]
    },
    owl: {
      completion: [
        'Como profesor, estoy muy orgulloso de tu progreso.',
        '¡Excelente! Dominas este concepto completamente.',
        'Tu dedicación al aprendizaje es admirable.'
      ],
      struggle: [
        'Recuerda: los mejores estudiantes hacen las mejores preguntas.',
        'El conocimiento se construye paso a paso. ¡Sigue adelante!',
        'Cada gran sabio comenzó exactamente donde estás tú ahora.'
      ],
      encouragement: [
        'Tu amor por aprender ilumina mi corazón de profesor.',
        'Estás desarrollando una mente brillante.',
        'Tu progreso constante es inspirador.'
      ]
    }
  };

  const characterPhrases = phrases[character as keyof typeof phrases] || phrases.cow;
  const contextPhrases = characterPhrases[context as keyof typeof characterPhrases] || characterPhrases.encouragement;
  
  return contextPhrases[Math.floor(Math.random() * contextPhrases.length)];
};
// #endregion
