import React from 'react';
import TaskInput from '../Tasks/TaskInput';
import TaskList from '../Tasks/TaskList';
import WeatherWidget from '../Weather/WeatherWidget';
import { ChevronDown } from 'lucide-react';

interface MainContentProps {
  onTaskSelect: (task: any) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onTaskSelect }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold">
          Tasks
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
        <WeatherWidget />
      </div>
      <TaskInput />
      <TaskList onTaskSelect={onTaskSelect} />
    </div>
  );
};

export default MainContent;
