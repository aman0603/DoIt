import React from 'react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateTaskNotes } from '../../store/slices/tasksSlice';

interface TaskNotesProps {
  taskId: string;
  notes: string;
  showNotes: boolean;
  onToggleNotes: () => void;
}

const TaskNotes: React.FC<TaskNotesProps> = ({ taskId, notes, showNotes, onToggleNotes }) => {
  const dispatch = useDispatch();

  const handleNotesChange = (value: string) => {
    dispatch(updateTaskNotes({ taskId, notes: value }));
  };

  return (
    <div className="space-y-2">
      <button 
        onClick={onToggleNotes}
        className="flex items-center gap-2 text-gray-300 hover:bg-gray-700 w-full p-3 rounded-lg"
      >
        <Plus className="h-5 w-5" />
        <span>Add Notes</span>
      </button>

      {showNotes && (
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 resize-none"
          placeholder="Add your notes here..."
        />
      )}
    </div>
  );
};

export default TaskNotes;