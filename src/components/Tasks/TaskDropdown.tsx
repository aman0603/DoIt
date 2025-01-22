import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/tasksSlice';
import { RootState } from '../../types';

interface TaskDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

const TaskDropdown: React.FC<TaskDropdownProps> = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.tasks);
  
  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'today', label: 'Today' },
    { id: 'important', label: 'Important' },
    { id: 'planned', label: 'Planned' },
    { id: 'assigned', label: 'Assigned to me' }
  ];

  const getTitle = () => {
    const currentFilter = filters.find(f => f.id === filter);
    return currentFilter?.label || 'All Tasks';
  };

  const handleFilterSelect = (filterId: string) => {
    dispatch(setFilter(filterId as any));
    onToggle();
  };

  return (
    <div className="relative">
      <button 
        onClick={onToggle}
        className="flex items-center gap-2 text-xl font-semibold hover:bg-gray-800 p-2 rounded-lg"
      >
        {getTitle()}
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-[#2A2B2D] rounded-lg shadow-lg py-1 z-10">
          {filters.map(filter => (
            <button 
              key={filter.id}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 text-gray-300"
              onClick={() => handleFilterSelect(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDropdown;