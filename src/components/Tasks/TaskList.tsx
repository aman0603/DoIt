import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTask, toggleImportant, selectFilteredTasks } from '../../store/slices/tasksSlice';
import { RootState, Task } from '../../types';
import { Star, X } from 'lucide-react';

interface TaskListProps {
  onTaskSelect: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onTaskSelect }) => {
  const tasks = useSelector((state: RootState) => selectFilteredTasks(state));
  const dispatch = useDispatch();

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {incompleteTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between group hover:bg-[#2A2B2D] p-2 rounded-lg cursor-pointer"
            onClick={() => onTaskSelect(task)}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  dispatch(toggleTask(task.id));
                }}
                className="h-5 w-5 rounded-sm border-gray-600 bg-transparent"
              />
              <span className="text-white">{task.title}</span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleImportant(task.id));
                }}
                className={`text-gray-400 hover:text-white ${task.isImportant ? 'text-yellow-400' : ''}`}
              >
                <Star className="h-5 w-5" fill={task.isImportant ? "currentColor" : "none"} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeTask(task.id));
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-gray-500 text-sm mb-2">Completed</h3>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between group hover:bg-[#2A2B2D] p-2 rounded-lg cursor-pointer"
                onClick={() => onTaskSelect(task)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => {
                      e.stopPropagation();
                      dispatch(toggleTask(task.id));
                    }}
                    className="h-5 w-5 rounded-sm border-gray-600 bg-transparent"
                  />
                  <span className="text-gray-500 line-through">{task.title}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeTask(task.id));
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;