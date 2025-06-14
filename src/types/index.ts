export interface Child {
  id: string;
  name: string;
  avatar: string;
  currentGrade: Grade;
  overallProgress: number;
  subjects: Subject[];
  totalPlayTime: number;
  achievements: Achievement[];
}

export interface Grade {
  id: string;
  name: string;
  icon: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
  guardian: {
    name: string;
    emoji: string;
    phrases: string[];
  };
  description: string;
  requiredProgress: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  levels: Level[];
  totalProgress: number;
  isActive: boolean;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  activities: Activity[];
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  requiredScore: number;
}

export interface Activity {
  id: string;
  title: string;
  instruction: string;
  narrative?: string;
  type: 'pattern' | 'word' | 'math' | 'logic' | 'drag' | 'write' | 'order';
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  score?: number;
  timeSpent?: number;
  attempts?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'progress' | 'streak' | 'mastery' | 'exploration';
}

export interface AIFeedback {
  message: string;
  recommendation?: string;
  character: 'cow' | 'fox' | 'owl';
  achievement?: string;
  context: 'completion' | 'struggle' | 'milestone' | 'encouragement';
}

export interface ParentRecommendation {
  id: string;
  type: 'suggestion' | 'warning' | 'achievement' | 'milestone';
  message: string;
  priority: 'high' | 'medium' | 'low';
  actionable?: boolean;
  relatedSubject?: string;
}

export interface SessionData {
  currentActivity?: Activity;
  startTime: Date;
  timeSpent: number;
  activitiesCompleted: number;
  currentStreak: number;
}