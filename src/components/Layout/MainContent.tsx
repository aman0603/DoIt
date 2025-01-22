import React, { useState } from 'react';
import TaskInput from '../Tasks/TaskInput';
import TaskList from '../Tasks/TaskList';
import WeatherWidget from '../Weather/WeatherWidget';
import { ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

interface MainContentProps {
  onTaskSelect: (task: any) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onTaskSelect }) => {
  const { filter } = useSelector((state: RootState) => state.tasks);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const getTitle = () => {
    switch (filter) {
      case 'today':
        return 'Today';
      case 'important':
        return 'Important';
      case 'planned':
        return 'Planned';
      case 'assigned':
        return 'Assigned to me';
      default:
        return 'All Tasks';
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between mb-6 ">
        <div className="relative ">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-xl font-semibold hover:bg-gray-800 p-2 rounded-lg" 
          >
            {getTitle()}
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </button>
          
          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-[#2A2B2D] rounded-lg shadow-lg py-1 z-10">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300"
                onClick={() => setShowDropdown(false)}
              >
                All Tasks
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300"
                onClick={() => setShowDropdown(false)}
              >
                Today
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300"
                onClick={() => setShowDropdown(false)}
              >
                Important
              </button>
            </div>
          )}
        </div>
        <WeatherWidget />
      </div>
      <TaskInput />
      <TaskList onTaskSelect={onTaskSelect} />
    </div>
  );
};

export default MainContent;