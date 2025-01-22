import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setReminder } from '../../store/slices/tasksSlice';

interface TaskReminderProps {
  taskId: string;
}

const TaskReminder: React.FC<TaskReminderProps> = ({ taskId }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const handleSetReminder = (date: string) => {
    dispatch(setReminder({ taskId, reminderDate: date }));
    setShowDatePicker(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 w-full p-3 rounded-lg"
      >
        <Bell className="h-5 w-5" />
        <span>Set Reminder</span>
      </button>
      
      {showDatePicker && (
        <div className="absolute top-full left-0 mt-1 w-full bg-gray-700 rounded-lg p-4 z-10">
          <input 
            type="datetime-local"
            className="w-full bg-gray-600 text-white rounded p-2"
            onChange={(e) => handleSetReminder(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskReminder;