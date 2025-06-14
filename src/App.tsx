import { useState } from 'react';
import Navigation from './components/Navigation';
import ChildDashboard from './components/ChildDashboard';
import ActivityView from './components/ActivityView';
import ParentDashboard from './components/ParentDashboard';
import AIFeedback from './components/AIFeedback';
import SubjectLevels from './components/SubjectLevels';
import { Subject, Level } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState('child');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentScreen('subject-levels');
  };

  const handleLevelStart = (level: Level) => {
    setSelectedLevel(level);
    setCurrentScreen('activity');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setCurrentScreen('child');
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setCurrentScreen('subject-levels');
  };

  const handleActivityComplete = () => {
    setCurrentScreen('feedback');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'child':
        return <ChildDashboard onSubjectSelect={handleSubjectSelect}  />;
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
        return <ParentDashboard onSubjectSelect={handleSubjectSelect} />;
      case 'feedback':
        return <AIFeedback />;
      default:
        return <ChildDashboard onSubjectSelect={handleSubjectSelect} />;
    }
  };

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