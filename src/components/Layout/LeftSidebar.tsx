import React from 'react';
import { User } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/slices/tasksSlice';
import { RootState } from '../../types';
import {
  ListTodo,
  Calendar,
  Star,
  BookOpen,
  UserSquare2,
  Plus,
  Menu,
  Info,
} from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import todo from '../../../assets/todo.jpg';
ChartJS.register(ArcElement, Tooltip, Legend);

interface SidebarProps {
  user: User | null;
  isOpen: boolean;
  onToggle: () => void;
}

const LeftSidebar: React.FC<SidebarProps> = ({ user, isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Filtering tasks based on the selected filter
  const filteredTasks = (() => {
    switch (currentFilter) {
      case 'today':
        return tasks.filter((task) => task.dueDate === new Date().toISOString().split('T')[0]);
      case 'important':
        return tasks.filter((task) => task.isImportant);
      // case 'planned':
      //   return tasks.filter((task) => task.isPlanned);
      // case 'assigned':
      //   return tasks.filter((task) => task.assignedTo);
      default:
        return tasks; // All tasks
    }
  })();

  const completedTasks = filteredTasks.filter((task) => task.completed).length;
  const totalTasks = filteredTasks.length;
  const pendingTasks = totalTasks - completedTasks;

  const handleFilterChange = (filter: 'all' | 'today' | 'important' | 'planned' | 'assigned') => {
    dispatch(setFilter(filter));
  };

  const getActiveClass = (filter: string) => {
    return currentFilter === filter ? 'bg-[#2A2B2D]' : '';
  };

  // Donut chart configuration
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#A0EDA3','#3F9142'], // Completed and Pending colors
        hoverBackgroundColor: ['#A0EDA3','#3F9142'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#D1D5DB',
        },
      },
    },
    cutout: '70%',
  };

  // Dynamic heading for the donut chart
  const getChartHeading = () => {
    switch (currentFilter) {
      case 'today':
        return 'Today’s Tasks';
      case 'important':
        return 'Important Tasks';
      case 'planned':
        return 'Planned Tasks';
      case 'assigned':
        return 'Assigned Tasks';
      default:
        return 'All Tasks';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 text-gray-400 hover:text-white"
      >
        <Menu className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="w-64 bg-[#242424] left-0 top-0 flex flex-col">
      <div className="p-4 flex flex-col  gap-3">
        <button onClick={onToggle} className="text-gray-400  hover:text-white ">
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex flex-col items-center">
          <img
            src={todo}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <div className='flex flex-col '>
            <div className="text-sm text-white-300">Hey,</div>
            <div className="font-semibold text-white">{user?.email || 'User'}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-0 ">
        <div className="space-y-1 bg-[#2A2B2D]">
          <button
            onClick={() => handleFilterChange('all')}
            className={`flex w-full items-center gap-3 px-3 py-2 text-white hover:bg-[#35793729] rounded-lg ${getActiveClass(
              'all'
            )}`}
          >
            <ListTodo className="h-4 w-4" />
            All Tasks
          </button>
          <button
            onClick={() => handleFilterChange('today')}
            className={`flex w-full items-center gap-3 px-3 py-2 text-white hover:bg-[#35793729] rounded-lg ${getActiveClass(
              'today'
            )}`}
          >
            <Calendar className="h-4 w-4" />
            Today
          </button>
          <button
            onClick={() => handleFilterChange('important')}
            className={`flex w-full items-center gap-3 px-3 py-2 text-white hover:bg-[#35793729] rounded-lg ${getActiveClass(
              'important'
            )}`}
          >
            <Star className="h-4 w-4" />
            Important
          </button>
          <button
            onClick={() => handleFilterChange('planned')}
            className={`flex w-full items-center gap-3 px-3 py-2 text-white hover:bg-[#35793729] rounded-lg ${getActiveClass(
              'planned'
            )}`}
          >
            <BookOpen className="h-4 w-4" />
            Planned
          </button>
          <button
            onClick={() => handleFilterChange('assigned')}
            className={`flex w-full items-center gap-3 px-3 py-2 text-white hover:bg-[#35793729] rounded-lg ${getActiveClass(
              'assigned'
            )}`}
          >
            <UserSquare2 className="h-4 w-4" />
            Assigned to me
          </button>
        </div>

        <div className=" flex justify-between mt-4 bg-[#2A2B2D] h-20  items-center">
          {/* <div  className="flex justify-between items-center mb-2"> */}
          <button className="flex items-center gap-3 px-3 py-2  rounded-sm w-full">
            <Plus className="h-4 w-4" />
            Add list
          </button>

          {/* </div> */}
        </div>

        <div className="mt-4 bg-[#2A2B2D] rounded-sm p-6 ">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{getChartHeading()}</span>
            <button className="text-gray-400 hover:text-white">
              <Info className="h-4 w-4" />
            </button>
          </div>
          <Doughnut data={data} options={options} />
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
