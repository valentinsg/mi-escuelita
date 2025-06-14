// #region Importaciones
// Importamos React y los hooks necesarios
import React, { useState } from 'react';

// Componentes de la aplicación
import Navigation from './components/Navigation';
import ChildDashboard from './components/ChildDashboard';
import ActivityView from './components/ActivityView';
import ParentDashboard from './components/ParentDashboard';
import AIFeedback from './components/AIFeedback';
import SubjectLevels from './components/SubjectLevels';

// Tipos utilizados en esta pantalla principal
import { Subject, Level } from './types';
// #endregion

function App() {
  // #region Estado local
  // Pantalla actual mostrada en la aplicación
  const [currentScreen, setCurrentScreen] = useState('child');

  // Materia y nivel seleccionados por el usuario
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  // #endregion

  // #region Manejadores de navegación
  // Cuando se elige una materia
  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentScreen('subject-levels');
  };

  // Cuando se inicia un nivel concreto
  const handleLevelStart = (level: Level) => {
    setSelectedLevel(level);
    setCurrentScreen('activity');
  };

  // Volver al listado de materias
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setCurrentScreen('child');
  };

  // Volver al listado de niveles
  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setCurrentScreen('subject-levels');
  };

  // Al completar una actividad
  const handleActivityComplete = () => {
    setCurrentScreen('feedback');
  };
  // #endregion

  // #region Renderizado condicional
  const renderScreen = () => {
    switch (currentScreen) {
      case 'child':
        return <ChildDashboard onSubjectSelect={handleSubjectSelect} />;
      case 'subject-levels':
        return selectedSubject ? (
          <SubjectLevels 
            subject={selectedSubject}
            onBack={handleBackToSubjects}
            onStartLevel={handleLevelStart}
          />
        ) : <ChildDashboard onSubjectSelect={handleSubjectSelect} />;
      case 'activity':
        return (
          <ActivityView 
            activity={selectedLevel?.activities[0]}
            onBack={handleBackToLevels}
            onComplete={handleActivityComplete}
          />
        );
      case 'parent':
        return <ParentDashboard />;
      case 'feedback':
        return <AIFeedback />;
      default:
        return <ChildDashboard onSubjectSelect={handleSubjectSelect} />;
    }
  };
  // #endregion

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="pb-20">
        {renderScreen()}
      </div>
      <Navigation
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
      />
    </div>
  );
}

export default App;