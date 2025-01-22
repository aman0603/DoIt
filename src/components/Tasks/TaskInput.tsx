import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, setReminder, setDueDate } from '../../store/slices/tasksSlice';
import { Bell, RotateCcw, Calendar } from 'lucide-react';

const TaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const taskId = Date.now().toString();
      dispatch(addTask({
        id: taskId,
        title: title.trim(),
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        isImportant: false,
        steps: [],
      }));
      setTitle('');
    }
  };

  const handleSetReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const taskId = Date.now().toString();
      dispatch(addTask({
        id: taskId,
        title: title.trim(),
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        isImportant: false,
        steps: [],
      }));
      dispatch(setReminder({
        taskId,
        reminderDate: ''
      }));
      setTitle('');
    }
  };

  const handleSetDueDate = (date: string) => {
    if (title.trim()) {
      const taskId = Date.now().toString();
      dispatch(addTask({
        id: taskId,
        title: title.trim(),
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        isImportant: false,
        steps: [],
      }));
      dispatch(setDueDate({ taskId, dueDate: date }));
      setTitle('');
      setShowDatePicker(false);
    }
  };

  return (
    <div className="bg-[#2F3630]  p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add A Task"
          className="w-full bg-transparent text-white placeholder-white outline-none"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              type="button" 
              onClick={handleSetReminder}
              className="text-gray-400 hover:text-gray-300"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-300">
              <RotateCcw className="h-5 w-5" />
            </button>
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="text-gray-400 hover:text-gray-300"
              >
                <Calendar className="h-5 w-5" />
              </button>
              
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-1 bg-gray-700 rounded-lg p-2 z-10">
                  <input 
                    type="datetime-local"
                    className="bg-gray-600 text-white rounded p-2"
                    onChange={(e) => handleSetDueDate(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-1 bg-[#347136] text-white rounded-md hover:bg-[#45A049]"
          >
            ADD TASK
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;