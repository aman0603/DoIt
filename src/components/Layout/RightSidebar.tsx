import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { X, Plus, Bell, Calendar, RotateCcw, Trash2 } from 'lucide-react';
import { addStep, setDueDate, setReminder, setRepeat, removeTask, updateTaskNotes } from '../../store/slices/tasksSlice';
import { Task } from '../../types';

interface RightSidebarProps {
  selectedTask: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ selectedTask, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [newStep, setNewStep] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderDate, setReminderDate] = useState('');
  const [dueDate, setDueDateState] = useState(selectedTask?.dueDate || '');
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [notes, setNotes] = useState(selectedTask?.notes || '');

  useEffect(() => {
    if (selectedTask) {
      setNotes(selectedTask.notes || '');
      setDueDateState(selectedTask.dueDate || '');
    }
  }, [selectedTask]);

  if (!isOpen || !selectedTask) return null;

  const handleAddStep = () => {
    if (newStep.trim()) {
      dispatch(addStep({ taskId: selectedTask.id, step: newStep }));
      setNewStep('');
    }
  };

  const handleSetReminder = () => {
    dispatch(setReminder({
      taskId: selectedTask.id,
      reminderDate: reminderDate || '' // Use the state to capture reminder date
    }));
  };

  const handleSetDueDate = (date: string) => {
    setDueDateState(date); // Update local state
    dispatch(setDueDate({ taskId: selectedTask.id, dueDate: date }));
    setShowDatePicker(false);
  };

  const handleSetRepeat = () => {
    dispatch(setRepeat({ taskId: selectedTask.id }));
  };

  const handleDeleteTask = () => {
    dispatch(removeTask(selectedTask.id));
    onClose();
  };

  const handleNotesChange = () => {
    dispatch(updateTaskNotes({ taskId: selectedTask.id, notes }));
  };

  return (
    <div className="w-80 bg-[#242424] border-l border-gray-800 h-screen fixed right-0 top-0 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <span className="text-gray-300">Created Today</span>
        <button 
          onClick={handleDeleteTask}
          className="text-gray-400 hover:text-white"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-lg text-white mb-4">{selectedTask.title}</div>

        {/* Add Step */}
        <div className="space-y-2">
          <input
            type="text"
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            placeholder="Add a step"
            className="w-full bg-gray-700 text-white rounded-lg p-3"
            onKeyPress={(e) => e.key === 'Enter' && handleAddStep()}
          />
          <button 
            onClick={handleAddStep}
            className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 w-full p-3 rounded-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add Step</span>
          </button>
        </div>

        {/* Set Reminder */}
        <div className="space-y-2">
          <input 
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="w-full bg-gray-600 text-white rounded p-2"
          />
          <button 
            onClick={handleSetReminder}
            className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 w-full p-3 rounded-lg"
          >
            <Bell className="h-5 w-5" />
            <span>Set Reminder</span>
          </button>
        </div>

        {/* Set Due Date */}
        <div className="relative">
          <button 
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 w-full p-3 rounded-lg"
          >
            <Calendar className="h-5 w-5" />
            <span>Add Due Date</span>
          </button>
          
          {showDatePicker && (
            <div className="absolute top-full left-0 mt-1 w-full bg-gray-700 rounded-lg p-4">
              <input 
                type="datetime-local"
                className="w-full bg-gray-600 text-white rounded p-2"
                value={dueDate}
                onChange={(e) => handleSetDueDate(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Set Repeat */}
        <button 
          onClick={handleSetRepeat}
          className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 w-full p-3 rounded-lg"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Repeat</span>
        </button>

        {/* Add Notes */}
        <div className="space-y-2">
          <button 
            onClick={() => setShowAddNotes(!showAddNotes)}
            className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 w-full p-3 rounded-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add Notes</span>
          </button>

          {showAddNotes && (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 resize-none"
              placeholder="Add your notes here..."
              onBlur={handleNotesChange} // Save notes when losing focus
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
