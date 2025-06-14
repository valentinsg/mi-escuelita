import { FC } from 'react';
import { Home, BookOpen, Users, MessageCircle } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

const Navigation: FC<NavigationProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'child', label: 'Niño', icon: Home, color: 'text-blue-500' },
    { id: 'activity', label: 'Actividad', icon: BookOpen, color: 'text-green-500' },
    { id: 'parent', label: 'Padres', icon: Users, color: 'text-purple-500' },
    { id: 'feedback', label: 'IA', icon: MessageCircle, color: 'text-orange-500' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gray-100 scale-105' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                size={24} 
                className={`${isActive ? item.color : 'text-gray-400'} mb-1`}
              />
              <span className={`text-xs font-medium ${
                isActive ? item.color : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;